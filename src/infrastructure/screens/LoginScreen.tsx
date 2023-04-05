import { SafeAreaView, View, TextInput, Text } from "react-native";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { login } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { TextInput as PaperTextInput } from "react-native-paper";

const LoginScreen: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    const handleLogin = async () => {
        try {
            const user = await login(email, password)
            navigation.navigate("CameraScreen" as never, {} as never)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <Text className="mx-auto" style={{fontSize: 30}} >Login To Your Account!</Text>
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
            <View className="flex-1 justify-end">
                <MainButton buttonText={"Log In"} onPress={handleLogin} />
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;