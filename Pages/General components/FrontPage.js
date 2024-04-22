import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

// Component for "hello user", maybe we can put it in a component for itself it is should be reused
export const HelloUser = () => {
  const [username, setUsername] = useState('');
  const { colors } = useTheme();
  const {width, height} = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
        }
        console.log(currentUser);
      }
    }
    getCurrentUser();
  }, [username]);

  return (
    <Text
      style={[
        styles.helloUser,
        {color: colors.text, fontSize: 20 * scaleFactor}
      ]}>
      Hej, {username}!
    </Text>
  );
};

export const FrontPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
    const {width, height} = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <HelloUser />
        <Text
          style={[
            styles.title,
            {color: colors.text, fontSize: 20 * scaleFactor}
          ]}>
          Hvad vil du gerne lave i dag?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Structure')}>
          <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
            <View
              style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
              <Image
                source={require('../../Assets/images/2-removebg-preview.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginBottom: 10,
                }}></Image>
              <Text style={styles.text}>Planlægge</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick module')}>
          <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
            <View
              style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
              <Image
                source={require('../../Assets/images/4-removebg-preview.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                </Image>
              <Text style={styles.text}>Lære</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick subject')}>
          <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
            <View
              style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
              <Image
                source={require('../../Assets/images/1-removebg-preview.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginBottom: 10,
                }}></Image>
              <Text style={styles.text}>Snakke med andre</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick topic')}>
          <View style={[styles.buttonParent, {backgroundColor: colors.border}]}>
            <View
              style={[styles.buttonGrad, {backgroundColor: colors.mainButton}]}>
              <Image
                source={require('../../Assets/images/3-removebg-preview.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginBottom: 10,
                }}></Image>
              <Text style={styles.text}>Læse i vidensbanken</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    width: '100%',
  },
  helloUser: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGrad: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
  },
  buttonParent: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#DC9B18',
    alignSelf: 'center',
    elevation: 10,
    zIndex: 1,
  },
  press: {
    marginBottom: 15,
  },
});

export default FrontPage;
