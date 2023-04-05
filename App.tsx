import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/infrastructure/screens/LoginScreen';
import CameraScreen from './src/infrastructure/screens/CameraScreen';
import { useState } from 'react';
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import firebaseApp from './src/services/firebase';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {

  const [user, setUser] = useState<User | null>(null)

  const auth = getAuth(firebaseApp)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    };
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;