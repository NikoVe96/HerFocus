import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  useColorScheme,
  Appearance
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

// Component for "hello user", maybe we can put it in a component for itself it is should be reused
export const HelloUser = () => {
  const [username, setUsername] = useState('');
  const { colors } = useTheme();

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

  return <Text style={[styles.helloUser, { color: colors.primary }]}>Hi, {username}!</Text>;
};

export const FrontPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <HelloUser />
      <Text style={[styles.title, { color: colors.primary }]}>What would you like to do today?</Text>
      <View style={[styles.frontView, { borderColor: colors.primary }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, borderColor: colors.primary }]}
          onPress={() => navigation.navigate('Struture')}>
          <Text style={styles.text}>Struture</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.frontView, { borderColor: colors.primary }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, borderColor: colors.primary }]}
          onPress={() => navigation.navigate('Pick module')}>
          <Text style={styles.text}>Learn</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.frontView, { borderColor: colors.primary }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, borderColor: colors.primary }]}
          onPress={() => navigation.navigate('Pick topic')}>
          <Text style={styles.text}>Read</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.frontView, { borderColor: colors.primary }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, borderColor: colors.primary }]}
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
    flex: 1,
  },
  frontView: {
    width: 330,
    height: 90,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    alignItems: 'center',
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
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 50,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default FrontPage;
