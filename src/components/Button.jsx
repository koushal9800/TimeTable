import React from "react";
import { View,Text,TouchableOpacity,Dimensions } from "react-native";

let width = Dimensions.get('window').width;


const Button = ({text,onPress,backgroundColor,borderWidth,borderColor,textColor})=>{
    return (
        <View>
            <TouchableOpacity
          style={{
            backgroundColor: backgroundColor,
            borderWidth: borderWidth,
            borderColor: borderColor,
            padding: 16,
            alignItems: 'center',
            width: width * 0.8,
            marginTop: 36,
          }}
          onPress={onPress}
        >
          <Text style={{color: textColor, fontSize: 16, fontWeight: '600'}}>
            {text}
          </Text>
        </TouchableOpacity>
        </View>
    )
}

export default Button