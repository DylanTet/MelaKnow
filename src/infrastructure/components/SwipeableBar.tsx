import { View, Animated, Text, I18nManager} from 'react-native'
import React, { PropsWithChildren, useRef, Component } from 'react'
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class SwipeableBar extends Component<PropsWithChildren<unknown>> {

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
    const pressHandler = () => {

      this.close();
      // eslint-disable-next-line no-alert
      window.alert(text);
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
      {/* {this.renderRightAction('More', '#C8C7CD', 192, progress)}
      {this.renderRightAction('Flag', '#ffab00', 128, progress)} */}
      {this.renderRightAction('Delete', '#dd2c00', 100, progress)}
    </View>
  )

  private swipeableRow?: Swipeable; 

  private close = () => {
    this.swipeableRow?.close();
  };
  
  render() {
    const { children } = this.props;
    return (
      <Swipeable  leftThreshold={30} rightThreshold={40} renderRightActions={this.renderRightActionsToTake}>
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