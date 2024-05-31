import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
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
    const {width, height} = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);


  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../Assets/images/logo-light-nb.png')}
          style={styles.image}></Image>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#8C8C8C"
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.form, {fontSize: 14 * scaleFactor}]}></TextInput>
        <TextInput
          placeholder="Kodeord"
          placeholderTextColor="#8C8C8C"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.form, {fontSize: 14 * scaleFactor}]}
          secureTextEntry={true}></TextInput>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot password')}
          style={styles.forgotpas}>
          <Text style={{fontSize: 15 * scaleFactor}}>Glemt dit kodeord?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: colors.mainButton }]}
          onPress={() => handleLogin(email, password, navigation)}
          title=" Login"
          titleColor="#000000">
          <Text style={{fontSize: 15 * scaleFactor}}>Login</Text>
        </TouchableOpacity>
        <Text>Har du ikke en konto?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sign up')}
          style={[styles.createBtn, { backgroundColor: colors.subButton }]}
          title="Create one">
          <Text style={{fontSize: 15 * scaleFactor}}>Lav en her</Text>
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
    width: '70%',
    height: 30,
    marginTop: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  forgotpas: {
    marginTop: 20,
    marginBottom: 50,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  loginBtn: {
    width: '50%',
    height: 30,
    borderRadius: 8,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  createBtn: {
    width: '30%',
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  errorText: {
    color: 'red',
  },
});

export default LogIn;
