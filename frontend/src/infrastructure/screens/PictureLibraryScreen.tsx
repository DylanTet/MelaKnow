import { Image, SafeAreaView, View, ScrollView,  } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system'
import BottomBar from '../components/BottomBar';
import { useRoute } from '@react-navigation/native';
import { SwipeableBar } from '../components/SwipeableBar';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../reduxStore';
import { addPhoto } from '../reduxReducers/photoSlice';
import MainButton from '../components/MainButton';
import { reqFromModelServer } from '../../detection-model/services';
import InfoModal from '../components/InfoModal';

const PictureLibraryScreen: React.FC = () => {
  const barRef = useRef<Swipeable | null>(null);
  const route = useRoute().name;
  const { photoList } = useSelector((state: RootState) => state.userPhotos);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [showScanButton, setShowScanButton] = useState(true);

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

  const handleScanButtonPress = async (photoUri: string) => {
    try {
      if (showScanButton) {
        // await reqFromModelServer(photoUri)
        // .then((modelPred) => {
          
        // });

        setShowScanButton(false);
      } 
    } catch(err) {

    }
  }

  const handleResultsButtonPress = async () => {
    setModalVisible(true);
  }

  useEffect(() => {
    if (photoList.length === 0) {
      setTimeout(() => {
        loadPhotos();
      }, 0) 
    }
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-white'> 
      <ScrollView>
        {photoList.map((photo, index) => (
          <SwipeableBar idx={index} previousRef={barRef} fileUri={photo}>
            <View className='px-2 flex-row items-center border-b-2 border-gray-300' style={{ height: 120 }}>
              <View className='flex-grow'>
                <Image source={{uri: photo}} style={{ width: 100, height: 100, borderRadius: 30 }}/>
              </View>
              {showScanButton ? (
                <MainButton customStyling='mx-2' buttonText='Scan' onPress={() => handleScanButtonPress(photo)} />
              ) : (
                <MainButton customStyling='mx-2' buttonText='Show Results' onPress={() => handleResultsButtonPress()} />
              )}
            </View>
          </SwipeableBar>
        ))}
      </ScrollView>
      <BottomBar route={route}/>
      <InfoModal isVisible={modalVisible} closeModal={() => setModalVisible(false)} data='Your mole is estimated about 60% benign'/>
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;