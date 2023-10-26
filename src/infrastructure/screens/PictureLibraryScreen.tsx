import { Image, SafeAreaView, View, Text, ScrollView, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system'
import { Camera, CameraType } from 'expo-camera';
import MainButton from '../components/MainButton';
import BottomBar from '../components/BottomBar';
import { useRoute } from '@react-navigation/native';
import SwipeableBar from '../components/SwipeableBar';
import { Swipeable } from 'react-native-gesture-handler';

const PictureLibraryScreen: React.FC = () => {

  const [photos, setPhotos] = useState<string[]>([]);
  const [type, setType] = useState(CameraType.back);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);
  const barRef = useRef<Swipeable | null>(null);
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

  const takePicture = async () => {
    const photoTaken = await camera.current?.takePictureAsync()
      .catch(err => console.log("There was an error taking the picture", err));

    const pictureName = `melaknow_${Date.now()}.jpg`;
    const appFolderPath = FileSystem.documentDirectory + 'MelaKnow-Photos';
    const picturePath = `${appFolderPath}/${pictureName}`;

    await FileSystem.moveAsync({from: photoTaken!.uri, to: picturePath})
      .catch(err => console.log("There was an error moving the picture file", err));

    setPhotos([...photos, picturePath])
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
            {photos.map((photo, index) => (
              <SwipeableBar photos={photos} key={index} previousRef={barRef} setPhotos={setPhotos} fileUri={photo}>
                <View className='px-2 flex-grow border-b-2 border-gray-300 justify-center' style={{ height: 120 }}>
                    <Image source={{uri: photo}} style={{ width: 100, height: 100, borderRadius: 30 }}/>
                </View>
              </SwipeableBar>
            ))}
          </ScrollView>
          <BottomBar route={route}/>
        </View>
      )}
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;