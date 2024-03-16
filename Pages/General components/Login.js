import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Parse from 'parse/react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async navigation => {
    setError('');
    try {
      const user = await Parse.User.logIn(email, password);
      console.log('Success! User ID:', user.id);
      navigation.navigate('Front page');
    } catch (error) {
      console.error('Error while logging in user', error);
      setError('Wrong email or password!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../Assets/images/logo-light-nb.png')}
        style={styles.image}></Image>
      <TextInput
        placeholder="email"
        placeholderTextColor="#8C8C8C"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.form}></TextInput>
      <TextInput
        placeholder="password"
        placeholderTextColor="#8C8C8C"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.form}
        secureTextEntry={true}></TextInput>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotpas}>
        <Text>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleLogin(navigation)}
        title=" Login"
        titleColor="#000000">
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Sign up')}
        style={styles.createBtn}
        title="Create one">
        <Text style={styles.btnText}>Create one</Text>
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
  forgotpas: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  loginBtn: {
    width: 200,
    height: 30,
    backgroundColor: '#DC9B18',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
  },
  createBtn: {
    width: 130,
    height: 30,
    backgroundColor: '#FFEABF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogIn;
