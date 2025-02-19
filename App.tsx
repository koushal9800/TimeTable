import React from "react";
import { View,Text,TextInput,ImageBackground } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import RootNavigation from "./src/navigation/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";

const App = ()=>{
    return(
        <NavigationContainer>
        
        <RootNavigation/>
        </NavigationContainer>
    )
}

export default App