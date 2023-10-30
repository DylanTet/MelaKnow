import { Image, SafeAreaView, View, Text, ScrollView, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system'
import BottomBar from '../components/BottomBar';
import { useRoute } from '@react-navigation/native';
import { SwipeableBar } from '../components/SwipeableBar';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../reduxStore';
import { addPhoto } from '../reduxReducers/photoSlice';

const PictureLibraryScreen: React.FC = () => {
  const barRef = useRef<Swipeable | null>(null);
  const route = useRoute().name;
  const { photoList } = useSelector((state: RootState) => state.userPhotos);
  const dispatch = useAppDispatch();
  
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

      files.map((photoFile) => {
        const photoPath = `${photosDir}/${photoFile}`;
        dispatch(addPhoto(photoPath));
      })

    })
    .catch((error) => {
      console.log("There was an error mapping the photo files: " + error);
    }) 
  }

  useEffect(() => {
    if (photoList.length === 0) {
      setTimeout(() => {
        loadPhotos();
      }, 0) 
    }
    console.log(photoList)
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-white'> 
      <ScrollView>
        {photoList.map((photo, index) => (
          <SwipeableBar key={index} previousRef={barRef} fileUri={photo}>
            <View className='px-2 flex-grow border-b-2 border-gray-300 justify-center' style={{ height: 120 }}>
              <Image source={{uri: photo}} style={{ width: 100, height: 100, borderRadius: 30 }}/>
            </View>
          </SwipeableBar>
        ))}
      </ScrollView>
        <BottomBar route={route}/>
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;