import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomBar from '../components/BottomBar'

const HomeScreen: React.FC = () => {

  const route = useRoute().name

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>

      </View>
      <BottomBar route={route}/>
    </SafeAreaView>
  )
}

export default HomeScreen