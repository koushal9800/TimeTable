import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const SignupScreen = () => {
    const navigation = useNavigation()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const handleRegister = async () => {
        setLoading(true);
        setError('');
    
        try {
          const userCredential = await auth().createUserWithEmailAndPassword(email, password);
          const userId = userCredential.user.uid;
    
          await firestore().collection('users').doc(userId).set({
            email: email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
    
          Alert.alert('Registration successful! Please log in.');
          navigation.navigate('Home')
        } catch (err) {
          setError(err.message);
        }
    
        setLoading(false);
      };
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios'?'padding':'height'}
    >
        <ScrollView contentContainerStyle={{ flexGrow:1 }} >
    <View style={{ flex:1 }} >
        
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
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
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
          
          <Button backgroundColor={'transparent'} borderColor={'#fff'} borderWidth={2} text={'SIGN IN'} textColor={'#fff'} onPress={handleRegister} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: width,
              marginTop: 36,
            }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} >
              <Text style={{color: '#fff'}}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#fff'}}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
