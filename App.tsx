import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/infrastructure/screens/LoginScreen';
import PictureLibraryScreen from './src/infrastructure/screens/PictureLibraryScreen';
import NewAccountScreen from './src/infrastructure/screens/NewAccountScreen';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from './src/services/firebase';

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
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='PictureLibraryScreen' 
        screenOptions={{}}
      >
        {user ? (
          <>
            {/* <Stack.Screen 
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
              headerBackVisible: false
            })}/> */}
          </>
        ) : (
          <>
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
                headerBackVisible: false
              })}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name='NewAccountScreen' component={NewAccountScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;