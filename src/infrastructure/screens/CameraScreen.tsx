import { View, Text } from 'react-native'
import React, { useRef, useState }  from 'react'
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import { useAppDispatch, type RootState } from '../../reduxStore';
import { useSelector } from 'react-redux';
import { addPhoto } from '../reduxReducers/photoSlice';
import Svg, { Rect } from 'react-native-svg';
import CameraButton from '../components/CameraButton';

const CameraScreen = () => {
  const camera = useRef<Camera>(null);
  const [type, setType] = useState(CameraType.back);
  const dispatch = useAppDispatch();

  const takePicture = async () => {
    const photoTaken = await camera.current?.takePictureAsync()
      .catch(err => console.log("Error taking picture:", err));
    
    if (photoTaken) {
      const pictureName = `melaknow_${Date.now()}.jpg`;
      const appFolderPath = FileSystem.documentDirectory + 'MelaKnow-Photos';
      const picturePath = `${appFolderPath}/${pictureName}`;

      await FileSystem.moveAsync({from: photoTaken.uri, to: picturePath})
        .then(() => {
          dispatch(addPhoto(picturePath));
      }).catch(err => console.log("There was an error moving the photo:", err));
    }
  }

  return (
    <View className='flex-1'>
      <Camera className='flex-1 items-center justify-between' ref={camera} type={type}>
        <Text className='absolute mt-40 mx-auto' style={{ fontSize: 15, color: 'white' }} >Please focus the area within the square.</Text>
        <Svg className='m-auto' height="40%" width="80%" viewBox="5 -5 110 100" >
          <Rect x="10" y="-5" rx={5} width="100" height="100" stroke="beige" strokeWidth="1" fill="transparent"/>
        </Svg>
        <View className=''>
            <CameraButton onClick={takePicture}/>
        </View>
      </Camera>
    </View>
  )
}

export default CameraScreen