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
import { useUser } from '../../Components/UserContext';
import BottomNavigation from '../../Navigation/BottomNav';

export const HelloUser = () => {
  const { username } = useUser();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <Text
      style={[
        styles.helloUser,
        { color: colors.text, fontSize: 22 * scaleFactor }
      ]}>
      Hej, {username}!
    </Text>
  );
};

export const FrontPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HelloUser />
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 22 * scaleFactor },
          ]}>
          Hvad vil du gerne lave i dag?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Structure')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/2-removebg-preview.png')}
              style={[styles.images, {
                width: 100 * scaleFactor,
                height: 100 * scaleFactor,
              }]}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Planlægge
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick module')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/4-removebg-preview.png')}
              style={[styles.images, {
                width: 100 * scaleFactor,
                height: 100 * scaleFactor,
              }]}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Lære i læringsmodulerne
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick subject')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/1-removebg-preview.png')}
              style={[styles.images, {
                width: 100 * scaleFactor,
                height: 100 * scaleFactor,
              }]}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Snakke med andre
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick topic')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/3-removebg-preview.png')}
              style={[styles.images, {
                width: 100 * scaleFactor,
                height: 100 * scaleFactor,
              }]}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Læse i vidensbanken
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloUser: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginBottom: 35,
  },
  text: {
    textAlign: 'center',
  },
  buttonGrad: {
    width: '90%',
    borderRadius: 10,
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.50,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  press: {
    marginBottom: 15,
  },
  images: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default FrontPage;
