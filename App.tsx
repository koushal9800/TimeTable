import React from "react";
import { View,Text,TextInput,ImageBackground } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import RootNavigation from "./src/navigation/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/store/AuthContext";

const App = ()=>{
    return(
        <AuthProvider>
        <NavigationContainer>
        
        <RootNavigation/>
        
        </NavigationContainer>
        </AuthProvider>
    )
}

export default App