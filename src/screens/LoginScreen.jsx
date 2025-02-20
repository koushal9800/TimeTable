import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {Formik} from 'formik';
import * as yup from 'yup';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleFacebookLogin = async () => {
    try {
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const userCredential = await auth().signInWithCredential(
        facebookCredential,
      );
      console.log('User signed in with Facebook!', userCredential.user);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Facebook login or Firebase credential failed:', error);
    }
  };

  const handleLogin = values => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(userCredential => {
        console.log('Logged in:', userCredential.user);
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Authentication Failed', error.message);
      });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assests/loginBackground.jpeg')}
        style={styles.imageContainer}>
        <Text style={styles.titleText}>
          Clutch
        </Text>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={handleLogin}
          validationSchema={loginSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
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

              {touched.email && errors.email && (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
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
              {touched.password && errors.password && (
                <Text style={{color: 'red'}}>{errors.password}</Text>
              )}
              <Button
                backgroundColor={'#fff'}
                borderColor={'transparent'}
                borderWidth={0}
                text={'SIGN IN'}
                textColor={'#000'}
                onPress={handleSubmit}
              />
              </>
          )}
        </Formik>

              <View style={{ marginTop:12 }} >

              <LoginButton
              
                onLoginFinished={handleFacebookLogin}
                onLogoutFinished={() => console.log('logout.')}
              />
          </View>

              <View
                style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={{color: '#fff'}}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                  <Text style={{color: '#fff'}}>Forgot Password</Text>
                </TouchableOpacity>
              </View>
            
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer:{
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText:{fontSize: 44, color: '#fff', fontWeight: 'bold'},
  bottomContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20,
    position: 'absolute',
    width: width,
  }
})

export default LoginScreen;
