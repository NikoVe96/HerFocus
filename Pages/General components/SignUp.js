import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    console.log('pressed');
    if (password !== confirmPassword) {
      console.log('Error' + error.message);
      setError('The passwords do not match, try again! 🙂');
      return;
    }

    const user = new Parse.User();
    user.set('name', name);
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
      await user.signUp();
      navigation.navigate('Daily Overview');
      console.log('pressed');
    } catch (error) {
      console.log('Error: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../Assets/images/Logo lightmode.png')}
        style={styles.image}></Image>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#8C8C8C"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.form}></TextInput>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#8C8C8C"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.form}></TextInput>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#8C8C8C"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.form}></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#8C8C8C"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={styles.form}></TextInput>
      <TextInput
        placeholder="Confirm password"
        placeholderTextColor="#8C8C8C"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={true}
        style={styles.form}></TextInput>
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          handleSignup();
        }}
        title=" Sign up"
        titleColor="#000000">
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpBtn} title="Login">
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF6ED',
    flex: 1,
  },
  image: {
    width: 320,
    height: 130,
    marginTop: 50,
  },
  form: {
    backgroundColor: '#FFF6ED',
    width: 280,
    height: 30,
    marginTop: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  signUpBtn: {
    width: 200,
    height: 30,
    backgroundColor: '#DC9B18',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
  },
});

export default SignUp;
