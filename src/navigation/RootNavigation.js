import React,{useState, useEffect} from "react";
import { createStackNavigator,  } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack =  createStackNavigator()

const RootNavigation =()=>{

const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{
    const isLogin = async () =>{
        const storedUser = await AsyncStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }
    isLogin()
},[])



    return(
       
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} initialParams={{ user }} />
          
        ) : (
            <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
        
    )
}

export default RootNavigation