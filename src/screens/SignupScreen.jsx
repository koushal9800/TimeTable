import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as yup from 'yup';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const SignupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignupScreen = () => {
  const navigation = useNavigation();

  const handleSignup = async (values, actions) => {
    if (values.password !== values.confirmPassword) {
      actions.setFieldError('confirmPassword', "Passwords don't match");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(userCredential => {
        console.log('Signed up:', userCredential.user);
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Signup Failed', error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../assests/signupBackground.jpeg')}
            style={styles.imageContainer}>
            <Text style={styles.titleText}>FIND YOUR TRIBE</Text>
            <Text style={styles.subText}>Forge a new path.</Text>
            <Formik
              initialValues={{email: '', password: '', confirmPassword: ''}}
              onSubmit={handleSignup}
              validationSchema={SignupSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.bodyContainer}>
                  <TextInput
                    placeholder="Username/Email"
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

                  <TextInput
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
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

                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={{color: 'red'}}>{errors.confirmPassword}</Text>
                  )}

                  <Button
                    backgroundColor={'transparent'}
                    borderColor={'#fff'}
                    borderWidth={2}
                    text={'SIGN IN'}
                    textColor={'#fff'}
                    onPress={handleSubmit}
                  />

                  <View style={styles.bottomContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}>
                      <Text style={{color: '#fff'}}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{color: '#fff'}}>Forgot Password</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ImageBackground>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {fontSize: 40, color: '#fff', fontWeight: 'bold'},
  subText: {fontSize: 20, color: '#EEC213', fontWeight: 'bold'},
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    position: 'absolute',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    marginTop: 36,
  },
});

export default SignupScreen;
