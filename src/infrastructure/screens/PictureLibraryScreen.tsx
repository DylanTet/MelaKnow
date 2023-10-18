import { Image, SafeAreaView, View, Text, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system'
import { Camera, CameraType } from 'expo-camera';
import MainButton from '../components/MainButton';
import BottomBar from '../components/BottomBar';
import { useRoute } from '@react-navigation/native';

const PictureLibraryScreen: React.FC = () => {

  const [photos, setPhotos] = useState<string[]>([]);
  const [type, setType] = useState(CameraType.back);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);
  const windowWidth = Dimensions.get('window').width;
  const route = useRoute().name;
  
  const loadPhotos = async () => {
    const photosDir = `${FileSystem.documentDirectory}MelaKnow-Photos`;
    
    await FileSystem.getInfoAsync(photosDir)
    .then((fileInfo) => {
      if (!fileInfo.exists) {
        return FileSystem.makeDirectoryAsync(photosDir);
      }
    })

    await FileSystem.readDirectoryAsync(photosDir)
    .then((files) => {
      const photos: string[] = [];

      files.map((photoFile) => {
        const photoPath = `${photosDir}/${photoFile}`;
        photos.push(photoPath);
      })

      setPhotos(photos);
    })
    .catch((error) => {
      console.log("There was an error mapping the photo files: " + error);
    }) 
  }

  const takePicture = () => {

    camera.current?.takePictureAsync()
      .then((photoTaken) => {
        const pictureName = `melaknow_${Date.now()}.jpg`;
        const appFolderPath = FileSystem.documentDirectory + 'MelaKnow-Photos';
        const picturePath = `${appFolderPath}/${pictureName}`;

        FileSystem.moveAsync({from: photoTaken.uri, to: picturePath})
          .then(() => {
            setPhotos([...photos, picturePath])
          })
          .catch((movingFileError) => console.log("There was an issue moving the file: ", movingFileError))
        })
      .catch((error) => console.log("There was an error taking the picture: ", error))
  }

  useEffect(() => {
    if (photos.length == 0) {
      setTimeout(() => {
        loadPhotos();
      }, 0) 
    }
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
    <SafeAreaView className='flex-1 bg-white'> 
      {isCameraOpen ? (
        <View className='flex-1'>
          <Text className='text-black text-2xl pt-20 pl-3 mb-3 font-bold' onPress={() => setIsCameraOpen(!isCameraOpen)}>X</Text>
          <Camera className='flex-grow my-auto' ref={camera} type={type}/>
          <View className='mb-35 mt-10'>
            <MainButton buttonText='Take Picture' onPress={takePicture}/>
          </View>
        </View>
      ) : (
        <View className='flex-1'> 
          <ScrollView>
            <View className='flex-grow flex-row flex-wrap'>
              {photos.map((photo, index) => (
                <Image key={index} source={{uri: photo}} style={{ width: windowWidth/3, height: 150, borderColor: 'white', borderWidth: 2 }}/>
              ))}
            </View>
          </ScrollView>
          <BottomBar route={route}/>
        </View>
      )}
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;