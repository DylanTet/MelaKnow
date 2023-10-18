import React from 'react'
import { IconButton } from 'react-native-paper'

const CameraButton = () => {
  return (
    <IconButton
        mode='contained'
        containerColor='cyan'
        className='border-white border-4 z-20 -top-11 rounded-full'
        style={{ height: 80, width: 80}}
        icon="camera"
        iconColor='black'
        size={40}
    />
  )
}

export default CameraButton