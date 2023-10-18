import { View, Text } from 'react-native'
import React, { useRef, useState }  from 'react'
import MainButton from '../components/MainButton'; 
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import CameraButton from '../components/CameraButton';


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
        <Camera className='flex-grow my-auto' ref={camera} type={type}>
            <View className='mb-35 mt-10'>
                <CameraButton onClick={takePicture}/>
            </View>
        </Camera>
    </View>
  )
}

export default CameraScreen