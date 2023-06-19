import { Image, SafeAreaView, View, Text } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system'
import { Camera, CameraType } from 'expo-camera';
import MainButton from '../components/MainButton';

type UserImage = {
  uri: string
}

const PictureLibraryScreen: React.FC = () => {

  const [photos, setPhotos] = useState<UserImage[]>([])
  const [type, setType] = useState(CameraType.back);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);

  const loadPhotos = async () => {
    const photosDir = `${FileSystem.documentDirectory}/MelaKnow-Photos`;

    try {
      const directoryExists = await FileSystem.getInfoAsync(photosDir);

      if (!directoryExists.exists) {
        await FileSystem.makeDirectoryAsync(photosDir);
      }

      const files = await FileSystem.readDirectoryAsync(photosDir);
      const photoUris = files.map((file) => ({
        uri: `file://${photosDir}/${file}`
      }));
      setPhotos(photoUris); 

    } catch (error) {
      console.log('Error loading user photos:', error);
    }
  }

  const takePicture = async () => {

    const photo = await camera.current?.takePictureAsync()
      .then((photoTaken) => {
        const pictureName = `melaknow_${Date.now()}.jpg`;
        const appFolderPath = FileSystem.documentDirectory + '/MelaKnow-Photos';
        const picturePath = `${appFolderPath}/${pictureName}`;

        setPhotos([...photos, {uri: picturePath}]);
        FileSystem.moveAsync({from: photoTaken.uri, to: picturePath});
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
    <SafeAreaView className='flex-1'> 
      {isCameraOpen && (
        <Camera className='flex-1' type={type}>
          <MainButton buttonText='Take Picture' onPress={takePicture}/>
        </Camera>
      )} 
      {photos.map((photo, index) => (
        <Image key={index} source={photo} />
      ))}

      <MainButton buttonText='New Picture' onPress={() => setIsCameraOpen(!isCameraOpen)} />
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;