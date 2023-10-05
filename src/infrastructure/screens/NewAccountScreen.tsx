import { SafeAreaView, View, Text } from 'react-native'
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
        <SafeAreaView className='flex-1 justify-center'>
            <Text className="mx-auto mb-8" style={{fontSize: 30}} >Create Your Free Account</Text>
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
        </SafeAreaView>
    )
}

export default NewAccountScreen