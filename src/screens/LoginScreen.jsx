import { useNavigation } from '@react-navigation/native';
import React,{useState,useContext} from 'react';
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
import auth from '@react-native-firebase/auth';
import AuthContext from '../store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const LoginScreen = () => {
    const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const userCredential =  await auth().signInWithEmailAndPassword(email, password);
      const loggedUser = userCredential.user
   
await AsyncStorage.setItem('user',JSON.stringify(loggedUser))

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'Home' }],
        // });
        navigation.navigate('Home')
      
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };
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
          value={email}
              onChangeText={setEmail}
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
          value={password}
              onChangeText={setPassword}
              secureTextEntry
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
        
        <Button backgroundColor={'#fff'} borderColor={'transparent'} borderWidth={0} text={'SIGN IN'} textColor={'#000'} onPress={handleLogin} />

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
