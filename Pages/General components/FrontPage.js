import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import Parse from 'parse/react-native';
import {useNavigation} from '@react-navigation/native';

// Component for "hello user", maybe we can put it in a component for itself it is should be reused
export const HelloUser = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
        }
      }
    }
    getCurrentUser();
  }, [username]);

  return <Text style={styles.helloUser}>Hi, {username}!</Text>;
};

export const FrontPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <HelloUser />
      <Text style={styles.title}>What would you like to do today?</Text>
      <View style={styles.frontView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Structure front page')}>
          <Text style={styles.text}>Struture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.frontView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pick module')}>
          <Text style={styles.text}>Learn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.frontView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pick topic')}>
          <Text style={styles.text}>Read</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.frontView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Pick subject')}>
          <Text style={styles.text}>Talk to peers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF6ED',
    flex: 1,
  },
  frontView: {
    width: 330,
    height: 90,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  helloUser: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginBottom: 15,
  },
  button: {
    width: 210,
    height: 30,
    backgroundColor: '#61646B',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 50,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',

    fontSize: 18,
  },
});

export default FrontPage;
