import { View, PanResponder, Animated} from 'react-native'
import React, { useRef } from 'react'

const SwipeableView = () => {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan}]),
    onPanResponderRelease: () => {
      const threshold = 100;
      if(Math.abs(pan))
    }
  })

  return (
    <View>
    </View>
  )
}

export default SwipeableView