import React,{useState,useEffect} from "react";
import { SafeAreaView } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

import {  NavigationContainer } from "@react-navigation/native";

import { createStackNavigator,  } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator()



const App = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading,setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    const isLogin = async () =>{
        const storedUser = await AsyncStorage.getItem('user');
        if(storedUser){
            setIsAuthenticated(JSON.parse(storedUser))
        }
        setLoading(false)
    }
    isLogin()
},[])
    return(
        
        <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            {isAuthenticated ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
     
    )
}

export default App