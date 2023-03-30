import { SafeAreaView, View, TextInput, Text } from "react-native";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { login } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    const handleLogin = async () => {
        try {
            const user = await login(email, password)
            navigation.navigate("CameraScreen", {})
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <Text>Login Screen</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View className="flex-1 justify-end">
                <MainButton buttonText={"Log In"} onPress={handleLogin} />
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;