import { View, Animated, Text, I18nManager} from 'react-native'
import React, { ReactNode } from 'react'
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system'
import { useAppDispatch } from '../../reduxStore';
import { removePhoto } from '../reduxReducers/photoSlice';

type fileProps = {
  fileUri: string
  previousRef: React.MutableRefObject<Swipeable | null>
  idx: number
  children: ReactNode
}

export const SwipeableBar = (props: fileProps) => {

  const swipeRef = React.createRef<Swipeable>();
  const dispatch = useAppDispatch();
  
  const handleSwipeableWillOpen = () => {
    if (props.previousRef  && props.previousRef.current !== null) {
      if (props.previousRef.current !== swipeRef.current) {
        props.previousRef.current?.close();
      }
    }
  };

  const handleSwipeableOpen = () => {
    props.previousRef.current = swipeRef.current;
  };

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = async () => {
      swipeRef.current?.close();

      await FileSystem.deleteAsync(props.fileUri)
        .then(() => dispatch(removePhoto(props.idx)))
        .catch((err) => console.log("Error deleting photo:", err));
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={{ backgroundColor: color, alignItems: 'center', flex: 1, justifyContent: 'center' }}
          onPress={pressHandler}>
          <Text style={{color: 'white', fontSize: 16, backgroundColor: 'transparent', padding: 10,}}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActionsToTake = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => (
    <View
      style={{
        width: 100,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {renderRightAction('Delete', '#dd2c00', 100, progress)}
    </View>
  )

  return (
    <Swipeable 
      key={props.idx}
      ref={swipeRef} 
      overshootFriction={8} 
      leftThreshold={30} 
      rightThreshold={40} 
      renderRightActions={renderRightActionsToTake}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableWillOpen={handleSwipeableWillOpen}>
      {props.children}
    </Swipeable>
  )
}
  
      // <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
      //   <Animated.Text
      //     style={{
      //       color: 'white',
      //       paddingHorizontal: 10,
      //       fontWeight: '600',
      //       transform: [{ scale }]
      //     }}>
      //     Delete
      //   </Animated.Text>
      // </View>
      // <View style={{ backgroundColor: 'blue', justifyContent: 'center' }}>
      //   <Animated.Text
      //     style={{
      //       color: 'white',
      //       paddingHorizontal: 10,
      //       fontWeight: '600',
      //       transform: [{ scale }]
      //     }}>
      //     Archive
      //   </Animated.Text>
      // </View>
