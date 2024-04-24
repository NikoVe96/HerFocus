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
import { useNavigation, useTheme } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useUser } from '../../Components/UserContext';
import { ScrollView } from 'react-native-gesture-handler';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const {colors} = useTheme();
   const {handleLogin, error} = useUser(); 


  return (
    <ScrollView>
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
          placeholder="kodeord"
          placeholderTextColor="#8C8C8C"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.form}
          secureTextEntry={true}></TextInput>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot password')}
          style={styles.forgotpas}>
          <Text>Glemt dit kodeord?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn, {backgroundColor: colors.mainButton}]}
          onPress={() => handleLogin(email, password, navigation)}
          title=" Login"
          titleColor="#000000">
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text>Har du ikke en konto?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sign up')}
          style={[styles.createBtn, {backgroundColor: colors.subButton}]}
          title="Create one">
          <Text style={styles.btnText}>Lav en her</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 200,
  },
  image: {
    width: '80%',
    height: '30%',
    marginTop: 50,
    marginBottom: 30,
  },
  form: {
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
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default LogIn;
