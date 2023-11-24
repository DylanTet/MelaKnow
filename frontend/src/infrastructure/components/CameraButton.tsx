import React from 'react'
import { IconButton } from 'react-native-paper'

type Props = {
  onClick: () => void
}

const CameraButton: React.FC<Props> = ({onClick}) => {
  return (
    <IconButton
        mode='contained'
        containerColor='cyan'
        className='border-white border-4 z-20 -top-11 rounded-full'
        style={{ height: 80, width: 80}}
        icon="camera"
        iconColor='black'
        size={40}
        onPress={onClick}
    />
  )
}

export default CameraButton