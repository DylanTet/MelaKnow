import { Image, SafeAreaView, View, ScrollView,  } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system'
import BottomBar from '../components/BottomBar';
import { useRoute } from '@react-navigation/native';
import { SwipeableBar } from '../components/SwipeableBar';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../reduxStore';
import { addPhoto } from '../reduxReducers/photoSlice';
import MainButton from '../components/MainButton';
import InfoModal from '../components/InfoModal';
import { setPictureScanned } from '../reduxReducers/pictureScannedSlice';
import { reqFromModelServer } from "../../detection-model/services";
import { addPrediction } from '../reduxReducers/predictionSlice';

const PictureLibraryScreen: React.FC = () => {
  const barRef = useRef<Swipeable | null>(null);
  const route = useRoute().name;
  const { photoList } = useSelector((state: RootState) => state.userPhotos);
  const dispatch = useAppDispatch();
  const { pictureStates } = useSelector((state: RootState) => state.pictureStates);
  const [currentPredictionShown, setCurrentPredictionShown] = useState<string | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const { predictionData } = useSelector((state: RootState) => state.picturePredictions);
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

      files.map((photoFile, idx) => {
        const photoPath = `${photosDir}/${photoFile}`;
        dispatch(addPhoto(photoPath));

        const pictureScanData = {
          index: idx, 
          status: false,
        }
        dispatch(setPictureScanned(pictureScanData));
      });
    })
    .catch((error) => {
      console.log("There was an error mapping the photo files: " + error);
    }) 
  }

  const handleScanButtonPress = async (photoUri: string, index: number) => {
    try {
       const response = await reqFromModelServer(photoUri);
       const data = response?.Prediction;

       if (data) {
        const pictureScannedPayload = {
          index: index,
          status: true,
        };
        dispatch(setPictureScanned(pictureScannedPayload));
        
        const prediction = {
          index: index,
          data: data
        };
        dispatch(addPrediction(prediction));
      }
    } catch(err) {
      Alert.alert("Error Requesting Prediction", "There was an error requesting the prediction on your photo.\
        Please ensure you have internet connectivity and retry in a few minutes");
      console.log(err);
    }
  }

  const handleResultsButtonPress = (index: number) => {
    try {
      const predictionToShow = predictionData[index];
      setCurrentPredictionShown(predictionToShow);
      setModalVisible(true);
    } catch {
      console.log("Error grabbing results data for photo.");
    }
  }

  const checkIfPictureScanned = (index: number) : boolean => {
    if (pictureStates[index] === true) {
      return true;
    }
    return false;
  };


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
          <SwipeableBar idx={index} previousRef={barRef} fileUri={photo} key={index}>
            <View className='px-2 flex-row items-center border-b-2 border-gray-300' style={{ height: 120 }}>
              <View className='flex-grow'>
                <Image source={{uri: photo}} style={{ width: 100, height: 100, borderRadius: 30 }}/>
              </View>
              {checkIfPictureScanned(index) === false ? (
                <MainButton customStyling='mx-2' buttonText="Scan" onPress={() => handleScanButtonPress(photo, index)} />
              ) : (
                <MainButton customStyling='mx-2' buttonText="See Results" onPress={() => handleResultsButtonPress(index)} />
              )}
            </View>
          </SwipeableBar>
        ))}
      </ScrollView>
      <BottomBar route={route}/>
      <InfoModal isVisible={modalVisible} closeModal={() => setModalVisible(false)} data={currentPredictionShown}/>
    </SafeAreaView>
  );
}

export default PictureLibraryScreen;
