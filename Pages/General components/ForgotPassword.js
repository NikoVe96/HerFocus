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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleResendPassword = async () => {
    setError('');
    try {
      const user = await Parse.User.logIn(email, password);
      console.log('Success! Send email to user with ID:', user.id);
    } catch (error) {
      console.error('Error while sending email to user', error);
      setError('Wrong email!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../Assets/images/logo-light-nb.png')}
        style={styles.image}></Image>
      <Text style={styles.text}>Forgot your password?</Text>
      <Text style={styles.text}>No worries, it happens!</Text>
      <Text style={styles.text}>
        Type in your email and we'll send you an email to reset your password.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#8C8C8C"
        style={styles.form}></TextInput>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {}}
        title=" Reset password"
        titleColor="#000000">
        <Text style={styles.btnText}>Reset password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createBtn} title="Back to Login">
        <Text style={styles.btnText}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 320,
    height: 130,
    marginTop: 50,
    marginBottom: 30,
  },
  text: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 16,
  },
  form: {
    width: 280,
    height: 30,
    marginTop: 20,
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
    marginTop: 15,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
  },
  createBtn: {
    width: 150,
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

export default ForgotPassword;
