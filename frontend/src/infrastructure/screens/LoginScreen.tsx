import { View, Text } from "react-native";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { login } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { Icon, TextInput as PaperTextInput } from "react-native-paper";
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInPressed, setSignInPressed] = useState('');
    const navigation = useNavigation();
    const [fontsLoaded, fontError] = useFonts({
        Roboto_900Black,
      });

    const handleLogin = async () => {
        await login(email, password)
        .then(() => navigation.navigate("HomeScreen" as never))
        .catch(userLoginError => console.log("There was an error logging in: ", userLoginError))
    }

    const createAccount = () => {
        navigation.navigate("NewAccountScreen" as never)
    }

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View className="flex-1 justify-center">
            <LinearGradient
                colors={['rgb(0,219,255)', 'rgb(0,92,255)']}
                className="flex-1">
                <Text className="mx-auto mt-32 text-4xl font-bold" style={{ fontFamily: 'Roboto_900Black' }} >MelaKnow</Text>
                <View className="mt-32 px-10">
                    <View className="flex-row items-center">
                        <Icon
                            source="email-outline"
                            size={25}
                            color="#005cff"
                        />
                        <PaperTextInput
                            className=""
                            style={{ backgroundColor: 'transparent',  }}
                            underlineColor="black"
                            activeUnderlineColor="#005cff"
                            textColor="#005cff"
                            placeholderTextColor="#005cff"
                            underlineStyle={{ width: 270 }}
                            mode="flat"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View className="flex-row items-center">
                        <Icon
                            source="lock-open"
                            size={25}
                            color="#005cff"
                        />
                        <PaperTextInput
                            className=""
                            style={{ backgroundColor: 'transparent', width: 270 }}
                            mode="flat"
                            activeUnderlineColor="#005cff"
                            textColor="#005cff"
                            underlineStyle={{ width: 270 }}
                            placeholder="Password"
                            placeholderTextColor="#005cff"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View className="mt-40 items-center">
                    <MainButton customStyling="w-80 font-bold" buttonText="Log In" onPress={handleLogin} />
                    <Text className="mt-10 text-md">Don't have an account? Create one</Text>
                </View>
            </LinearGradient>
        </View>
    );
}

export default LoginScreen;