import { View, Animated, Text, I18nManager} from 'react-native'
import React, { PropsWithChildren, Component } from 'react'
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system'

type fileProps = {
  loadPhotos: () => void
  photos: string[]
  fileUri: string
  previousRef: React.MutableRefObject<Swipeable | null>
  key: number
}

export default class SwipeableBar extends Component<PropsWithChildren<unknown> & fileProps> {

  private swipeRef = React.createRef<Swipeable>();
  
  private handleSwipeableWillOpen = () => {
    if (this.props.previousRef  && this.props.previousRef.current !== null) {
      if (this.props.previousRef.current !== this.swipeRef.current) {
        this.props.previousRef.current?.close();
      }
    }
  };

  private handleSwipeableOpen = () => {
    this.props.previousRef.current = this.swipeRef.current;
  };

  private renderRightAction = (
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
      this.swipeRef.current?.close();

      await FileSystem.deleteAsync(this.props.fileUri)
        .catch((err) => console.log("Error deleting photo:", err));
      
      await this.props.loadPhotos();
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

  private renderRightActionsToTake = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => (
    <View
      style={{
        width: 100,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction('Delete', '#dd2c00', 100, progress)}
    </View>
  )

  render() {
    const { children } = this.props;
    return (
      <Swipeable 
        key={this.props.key}
        ref={this.swipeRef} 
        overshootFriction={8} 
        leftThreshold={30} 
        rightThreshold={40} 
        renderRightActions={this.renderRightActionsToTake}
        onSwipeableOpen={this.handleSwipeableOpen}
        onSwipeableWillOpen={this.handleSwipeableWillOpen}>
        {children}
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
}