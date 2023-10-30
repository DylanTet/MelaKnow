import { View } from 'react-native'
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
        <Camera className='flex-grow justify-end items-center' ref={camera} type={type}>
            <Svg height="80%" width="80%" viewBox="0 0 120 120" >
              <Rect x="10" y="-5" rx={5} width="100" height="100" stroke="beige" strokeWidth="1" fill="transparent"/>
            </Svg>
            <View className='mb-5'>
                <CameraButton onClick={takePicture}/>
            </View>
        </Camera>
    </View>
  )
}

export default CameraScreen