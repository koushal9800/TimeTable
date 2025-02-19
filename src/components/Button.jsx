import React from "react";
import { View,Text,TouchableOpacity } from "react-native";

const Button = ({text,onPress,backgroundColor})=>{
    return (
        <View>
            <TouchableOpacity style={{
                // backgroundColor:'#0A79DF',
                backgroundColor:backgroundColor,
                borderRadius:20,
                padding:12,
                alignItems:'center',
                width:'100%'
            }} 
            onPress={onPress}
            >
                <Text style={{ color:'#fff', fontSize:16, fontWeight:'600' }} >{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button