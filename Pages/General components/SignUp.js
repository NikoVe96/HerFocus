import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import Parse from 'parse/react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PickAvatar from './PickAvatar';
import {useUser} from '../../Components/UserContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let [avatar, setAvatar] = useState('');
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {handleSignup, error} = useUser(); 
   

const handleAvatarSelect = selectedAvatar => {
  setAvatar(selectedAvatar);
};

  // const handleSignup = async () => {
  //   if(email)
  //   if (password !== confirmPassword) {
  //     console.log('Error' + error.message);
  //     setError('Kodeordene er ikke ens, prøv igen 🙂');
  //     return;
  //   }

  //   const user = new Parse.User();
  //   user.set('name', name);
  //   user.set('username', username);
  //   user.set('email', email);
  //   user.set('password', password);
  //   user.set('avatar', avatar);
  //   console.log(avatar);

  //   try {
  //     await user.signUp();
  //     navigation.navigate('Login');
  //     console.log('pressed');
  //   } catch (error) { }
  // };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <Image
          source={require('../../Assets/images/logo-light-nb.png')}
          style={styles.image}></Image>
        <TextInput
          placeholder="Navn"
          placeholderTextColor="#8C8C8C"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.form}></TextInput>
        <TextInput
          placeholder="Brugernavn"
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
          placeholder="Kodeord"
          placeholderTextColor="#8C8C8C"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.form}></TextInput>
        <TextInput
          placeholder="Bekræft kodeord"
          placeholderTextColor="#8C8C8C"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
          style={styles.form}></TextInput>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.avatar}> Vælg en avatar </Text>
        <View style={styles.avatarMargin}>
          <PickAvatar
            onAvatarSelect={handleAvatarSelect}
            picked={avatar}
            isSignUp={true}></PickAvatar>
        </View>
        <TouchableOpacity
          style={[styles.signUpBtn, {backgroundColor: colors.mainButton}]}
          onPress={() =>
            handleSignup(
              name,
              username,
              email,
              password,
              confirmPassword,
              navigation,
            )
          }
          title=" Sign up"
          titleColor="#000000">
          <Text style={styles.btnText}>Lav en profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.signUpBtn, {backgroundColor: colors.mainButton}]}>
          <Text style={styles.btnText}>Tilbage login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 130,
    marginTop: 50,
  },
  form: {
    width: 280,
    height: 30,
    marginTop: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  avatar: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
  },
  avatarMargin: {
    marginLeft: 30,
    marginRight: 20,
  },
  signUpBtn: {
    width: 200,
    height: 30,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
  },
  errorText: {
    color: 'red',
  },
});

export default SignUp;
