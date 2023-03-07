import { SafeAreaView, View } from "react-native";
import { useState } from "react";
import MainButton from "../components/MainButton";

const LoginScreen: React.FC = () => {

    const handleSignIn = async (email, password) => {
        try {
            const userCredential = await signIn(email, password);
            setUser(userCredential.user);
        } catch (error) {
            console.log('Error signing in:', error);   
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-end">
                <MainButton buttonText={"Log In"}/>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;