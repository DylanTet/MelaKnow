import { SafeAreaView, View, Text } from "react-native";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { login } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { TextInput as PaperTextInput } from "react-native-paper";

const LoginScreen: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        await login(email, password)
        .then(() => navigation.navigate("HomeScreen" as never))
        .catch(userLoginError => console.log("There was an error logging in: ", userLoginError))
    }

    const createAccount = () => {
        navigation.navigate("NewAccountScreen" as never)
    }

    return (
        <SafeAreaView className="flex-1 justify-center">
            <Text className="mx-auto mb-8" style={{fontSize: 30}} >Login To Your Account!</Text>
            <View className="mb-8 flex">
                <PaperTextInput
                    className="mx-10"
                    mode="outlined"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <PaperTextInput
                    className="mx-10"
                    mode="outlined"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View className="flex">
                <MainButton buttonText="Log In" onPress={handleLogin} />
                <MainButton customStyling='mt-2' buttonText='Create Free Account' onPress={createAccount} />
            </View>
            
        </SafeAreaView>
    );
}

export default LoginScreen;