import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {TextInput} from 'react-native-paper';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

const LoginScreen = () => {
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
          label="Email"
          style={{width: width * 0.8 , backgroundColor: 'transparent', color: 'red'}}
          cursorColor="#fff"
          underlineColor="#fff"
          activeUnderlineColor="#fff"
          textColor="#fff"
          selectionColor="red"
        />

        <TextInput
          label="Password"
          style={{width: width * 0.8, backgroundColor: 'transparent', color: 'red'}}
          cursorColor="#fff"
          underlineColor="#fff"
          activeUnderlineColor="#fff"
          textColor="#fff"
          selectionColor="red"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',

            padding: 16,
            alignItems: 'center',
            width: width * 0.8,
            marginTop: 36,
          }}
          // onPress={onPress}
        >
          <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
            SIGN IN
          </Text>
        </TouchableOpacity>

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
            width:width
          }}>
          <TouchableOpacity>
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
