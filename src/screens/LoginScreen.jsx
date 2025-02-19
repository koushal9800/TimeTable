import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../components/Button';


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const LoginScreen = () => {
    const navigation = useNavigation()
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assests/loginBackground.jpeg')}
        style={{
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 44, color: '#fff', fontWeight: 'bold'}}>
          Clutch
        </Text>

        <TextInput
          placeholder="Email"
          style={{
            width: width * 0.8,
            backgroundColor: 'transparent',
          }}
          contentStyle={{color: '#fff'}}
          cursorColor="#fff"
          underlineColor="#fff"
          activeUnderlineColor="#fff"
          textColor="#fff"
          placeholderTextColor="#fff"
        />

        <TextInput
          placeholder="Password"
          style={{
            width: width * 0.8,
            backgroundColor: 'transparent',
          }}
          contentStyle={{color: '#fff'}}
          cursorColor="#fff"
          underlineColor="#fff"
          activeUnderlineColor="#fff"
          textColor="#fff"
          placeholderTextColor="#fff"
        />
        
        <Button backgroundColor={'#fff'} borderColor={'transparent'} borderWidth={0} text={'SIGN IN'} textColor={'#000'} onPress={()=>navigation.navigate('Home')} />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#4263a6',

            padding: 16,
            alignItems: 'center',
            width: width * 0.8,
            marginTop: 36,
            justifyContent: 'center',
          }}
          // onPress={onPress}
        >
          <Image
            source={require('../assests/facebook.jpeg')}
            style={{width: 24, height: 24}}
            resizeMode="contain"
          />

          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 12,
            }}>
            SIGN IN WITH FACEBOOK
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            bottom: 20,
            position: 'absolute',
            width: width,
          }}>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')} >
            <Text style={{color: '#fff'}}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: '#fff'}}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
