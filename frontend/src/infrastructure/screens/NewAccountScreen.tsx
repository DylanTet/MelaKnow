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

    return (
        <View className='flex-1 justify-center bg-white'>
            <View className='flex-1' style={{}}>
                <Image source={require('../../assets/823_generated.jpg')}
                    style={{ resizeMode: 'contain', width: 300, height: 400 ,alignSelf: 'center' }}
                />
                <Text className="mx-auto mb-8" style={{fontSize: 30}} >MelaKnow</Text>
                <Text className="mx-auto mb-8" style={{fontSize: 20}}>Get peace of mind with
                    <Text> AI-powered mole scans!</Text>
                </Text>
            </View>
            
            <View className='mb-8'>
                <PaperTextInput
                    activeOutlineColor='cyan'
                    className="mx-10"
                    mode="outlined"
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                />
                <PaperTextInput
                    activeOutlineColor='cyan'
                    className="mx-10"
                    mode="outlined"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View>
                <MainButton customStyling="" buttonText="Create Account" onPress={createAccount}/>
            </View>
        </View>
    )
}

export default NewAccountScreen