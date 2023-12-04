import { SafeAreaView, View, Text, Image } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { createNewAccount } from '../../services/auth'
import MainButton from '../components/MainButton'

const NewAccountScreen = () => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    const createAccount = async () => {
        try {
            const user = await createNewAccount(email, password)
            navigation.reset({
                index: 0,
                routes: [{ name: 'PictureLibraryScreen' as never}]
            })
            navigation.navigate("PictureLibraryScreen" as never)
        } catch(error) {
            console.log(error)
        }
    }

    const moveToLogin = () => {
        navigation.navigate("LoginScreen" as never)
    }

    return (
        <View className='flex-1 justify-center bg-white'>
            <View className='flex mt-14' style={{  }}>
                <Text className='ml-8 text-xl font-bold text-[#00dbff]' onPress={moveToLogin}>Login</Text>
                <Image source={require('../../assets/823_generated.jpg')}
                    style={{ resizeMode: 'contain', width: 300, height: 200 ,alignSelf: 'center' }}
                />
                <Text className="mx-auto mb-8 font-bold" style={{ fontSize: 30 }} >MelaKnow</Text>
                <Text className="mx-auto mb-8 text-center" style={{ fontSize: 20, lineHeight: 35 }}>Get peace of mind with {'\n'}
                    <Text className='text-center'>AI-powered mole scans!</Text>
                </Text>
            </View>
            <View className='bg-[#00ffa4] flex-1 pt-6 rounded-3xl'>
                <View className='mb-5 bg-[#00ffa4]'>
                    <PaperTextInput
                        activeOutlineColor='cyan'
                        style={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3, shadowRadius: 2 }}
                        className="mx-10 mb-5"
                        mode="outlined"
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <PaperTextInput
                        activeOutlineColor='cyan'
                        className="mx-10"
                        style={{ borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3, shadowRadius: 2 }}
                        mode="outlined"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <View>
                    <MainButton customStyling="mx-10" buttonText="Create Account" onPress={createAccount}/>
                </View>
            </View>
        </View>
    )
}

export default NewAccountScreen