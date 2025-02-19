import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../components/Button';



let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const SignupScreen = () => {
    const navigation = useNavigation()
  return (
    <View>
      <ImageBackground
        source={require('../assests/signupBackground.jpeg')}
        style={{
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, color: '#fff', fontWeight: 'bold'}}>
          FIND YOUR TRIBE
        </Text>
        <Text style={{fontSize: 20, color: '#EEC213', fontWeight: 'bold'}}>
          Forge a new path.
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 20,
            position: 'absolute',
          }}>
          <TextInput
            placeholder='Username'
            style={{
              width: width * 0.8,
              backgroundColor: 'transparent',
              
            }}
            contentStyle={{ color:'#fff', }}
            cursorColor="#fff"
            underlineColor="#fff"
            activeUnderlineColor="#fff"
            textColor="#fff"
            placeholderTextColor='#fff'
          />

<TextInput
            placeholder='Password'
            style={{
              width: width * 0.8,
              backgroundColor: 'transparent',
              
            }}
            contentStyle={{ color:'#fff', }}
            cursorColor="#fff"
            underlineColor="#fff"
            activeUnderlineColor="#fff"
            textColor="#fff"
            placeholderTextColor='#fff'
          />
          
          <Button backgroundColor={'transparent'} borderColor={'#fff'} borderWidth={2} text={'SIGN IN'} textColor={'#fff'} onPress={()=>navigation.navigate('Home')} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: width,
              marginTop: 36,
            }}>
            <TouchableOpacity>
              <Text style={{color: '#fff'}}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#fff'}}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignupScreen;
