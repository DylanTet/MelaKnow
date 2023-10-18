import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { StackActions, useNavigation } from '@react-navigation/native';

  type props = {
  route: string;
}

const BottomBar = ({route} : props) => {

  const [selectedButton, setSelectedButton] = useState("home");
  const navigation = useNavigation();

  useEffect(() => {
    if (route === "HomeScreen") {
      setSelectedButton("home")
    } else {
      setSelectedButton("file")
    }
  }, [route])

  return (
    <View className='basis-1/8 flex-row border-slate-400 border-t-0.5 items-center justify-center space-x-16' style={{  }}>
        <IconButton
          icon="home"
          size={40}
          className=''
          iconColor={selectedButton === "home" ? 'cyan' : 'gray'}
          onPress={() => {setSelectedButton("home"); navigation.dispatch(StackActions.replace('HomeScreen'))}}
        />
        <TouchableOpacity style={{ shadowColor: 'rgba(0, 0, 0, 0.3)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13} }}>
          <IconButton
            mode='contained'
            containerColor='cyan'
            className='border-white border-4 z-20 -top-11 rounded-full'
            style={{ height: 80, width: 80}}
            icon="camera"
            iconColor='black'
            size={40}
            onPress={() => {navigation.navigate('CameraScreen' as never)}}
          />
        </TouchableOpacity>
        <IconButton
          icon="file"
          size={40}
          iconColor={selectedButton === "file" ? 'cyan' : 'gray'}
          onPressIn={() => {setSelectedButton("file"); navigation.dispatch(StackActions.replace('PictureLibraryScreen'))}}
        />
      </View>
  )
}

export default BottomBar