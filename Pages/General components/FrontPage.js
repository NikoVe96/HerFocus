import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
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

  return <Text style={styles.helloUser}>Hej, {username}!</Text>;
};

export const FrontPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <HelloUser />
        <Text style={styles.title}>Hvad vil du gerne lave i dag?</Text>
        <View style={[styles.frontView, styles.shadowProp]}>
          <ImageBackground
            source={require('../../Assets/images/Struktur.png')}
            style={styles.images}
            resizeMode="cover">
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Struture')}>
              <Text style={styles.text}>Strukturere</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={[styles.frontView, styles.shadowProp]}>
          <ImageBackground
            source={require('../../Assets/images/Learning2.png')}
            style={styles.images}
            resizeMode="cover">
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Pick module')}>
              <Text style={styles.text}>Lære</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={[styles.frontView, styles.shadowProp]}>
          <ImageBackground
            source={require('../../Assets/images/Forums2.png')}
            style={styles.images}
            resizeMode="cover">
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Pick subject')}>
              <Text style={styles.text}>Snakke med andre</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={[styles.frontView, styles.shadowProp]}>
          <ImageBackground
            source={require('../../Assets/images/Reading.png')}
            style={styles.images}
            resizeMode="cover">
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Pick topic')}>
              <Text style={styles.text}>Læse i vidensbanken</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF6ED',
    flex: 1,
    marginBottom: 30,
  },
  frontView: {
    width: 330,
    height: 140,
    marginTop: 10,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  images: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
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
    backgroundColor: '#FFEABF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 100,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',

    fontSize: 18,
  },
});

export default FrontPage;
