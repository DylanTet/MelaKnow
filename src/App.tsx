import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './infrastructure/screens/LoginScreen';
import CameraScreen from './infrastructure/screens/CameraScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;