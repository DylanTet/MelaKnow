import { View, Text } from 'react-native'
import React, { useRef, useState }  from 'react'
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import CameraButton from '../components/CameraButton';
import Svg, { Circle, Rect } from 'react-native-svg';

const CameraScreen = () => {
    const camera = useRef<Camera>(null);
    const [type, setType] = useState(CameraType.back);
    const [photos, setPhotos] = useState<string[]>([]);

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

  return (
    <View className='flex-1'>
        <Camera className='flex-grow justify-end items-center' ref={camera} type={type}>
            <Svg height="60%" width="60%" viewBox="0 0 100 100" >
              <Rect x="0" y="-30" width="100" height="100" stroke="beige" strokeWidth="2" fill="transparent"/>
            </Svg>
            <View className='mb-5'>
                <CameraButton onClick={takePicture}/>
            </View>
        </Camera>
    </View>
  )
}

export default CameraScreen