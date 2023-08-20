import { Image, SafeAreaView, View, Text, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system'
import { Camera, CameraType } from 'expo-camera';
import MainButton from '../components/MainButton';

const PictureLibraryScreen: React.FC = () => {

  const [photos, setPhotos] = useState<string[]>([]);
  const [type, setType] = useState(CameraType.back);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);
  const windowWidth = Dimensions.get('window').width;

  const loadPhotos = async () => {
    const photosDir = `${FileSystem.documentDirectory}/MelaKnow-Photos`;
    
    FileSystem.getInfoAsync(photosDir)
      .then((fileInfo) => {
        if (!fileInfo) {
          return FileSystem.makeDirectoryAsync(photosDir);
        }

        FileSystem.readDirectoryAsync(photosDir)
        .then((files) => {
          files.map((photoFile) => {

            const photoPath = `${photosDir}/${photoFile}`;
            photos.push(photoPath);
          })})

        .catch((error) => {
          console.log("There was an error mapping the photo files: " + error);
        }) 
      })
  }

  const takePicture = async () => {

    const photo = await camera.current?.takePictureAsync()
      .then((photoTaken) => {
        const pictureName = `melaknow_${Date.now()}.jpg`;
        const appFolderPath = FileSystem.documentDirectory + '/MelaKnow-Photos';
        const picturePath = `${appFolderPath}/${pictureName}`;

        FileSystem.moveAsync({from: photoTaken.uri, to: picturePath});
        setPhotos([...photos, picturePath])
      })
      .catch((error) => {
        console.log("There was an error taking the picture: ", error)
      })
  }

  useEffect(() => {
    loadPhotos();

  }, [])
  

  if (!permission?.granted) {
    return (
      <View className='flex-1 justify-center'>
        <Text className="mx-auto" >We need your permission to show the camera.</Text>
        <MainButton buttonText='Grant Permission' onPress={requestPermission}/>
      </View>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-black'> 
      {isCameraOpen ? (
        <View className='flex-1'>
          <Text className='text-white text-2xl pt-20 pl-3 mb-3 font-bold' onPress={() => setIsCameraOpen(!isCameraOpen)}>X</Text>
          <Camera className='flex-grow h-60 my-auto' ref={camera} type={type}/>
          <View className='mb-40 mt-10'>
            <MainButton buttonText='Take Picture' onPress={takePicture}/>
          </View>
        </View>
      ) : (
        <View className='flex-1'> 
          <ScrollView>
            <View className='flex-grow flex-row flex-wrap'>
              {photos.map((photo, index) => (
                <Image className='' key={index} source={{uri: photo}} style={{ width: windowWidth/3, height: 150 }}/>
              ))}
            </View>
          </ScrollView>
          <View className='m-10'>
            <MainButton buttonText='New Picture' onPress={() => setIsCameraOpen(!isCameraOpen)} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;