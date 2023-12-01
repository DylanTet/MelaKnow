import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/infrastructure/screens/LoginScreen';
import PictureLibraryScreen from './src/infrastructure/screens/PictureLibraryScreen';
import NewAccountScreen from './src/infrastructure/screens/NewAccountScreen';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from './src/services/firebase';
import HomeScreen from './src/infrastructure/screens/HomeScreen';
import CameraScreen from './src/infrastructure/screens/CameraScreen';
import { Provider } from 'react-redux';
import { store } from './src/reduxStore';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {

  const [user, setUser] = useState<User | null>(null)
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    };
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='HomeScreen' 
          screenOptions={{}}
        >
          {user ? (
            
            <>
              <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen}
                options={() => ({
                  headerBackVisible: false,
                  headerRight: () => user ? (
                    <Button color="#000" onPress={handleSignOut} title="Log Out" />
                  ) : null,
                  headerTitle: 'Home',
                })}/>
              <Stack.Screen 
                name="PictureLibraryScreen"
                component={PictureLibraryScreen}
                options={() => ({
                  headerRight: () => user ? (
                    <Button color="#FFF" onPress={handleSignOut} title="Log Out" />
                  ) : null,
                  headerStyle: {
                    backgroundColor: '#000'
                  },
                  headerTintColor: '#FFF',
                  headerTitle: "Previous Scans",
                  headerBackVisible: false,
              })}/>
              <Stack.Screen
                name='CameraScreen'
                component={CameraScreen}
                options={() => ({
                })}
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={() => ({
                  headerShown: false,
                })}/>
              <Stack.Screen name='NewAccountScreen' component={NewAccountScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;