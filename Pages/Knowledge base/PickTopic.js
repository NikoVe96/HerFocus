import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigation from '../../Navigation/BottomNav';


export const PickTopics = () => {
  const navigation = useNavigation();
  const testImage = 'no_picture.png';
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 22 * scaleFactor },
          ]}>
          Hvad vil du gerne læse om?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Subject articles', { subject: 'adhd' })
          }>

          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/WhatIs.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginBottom: 10,
              }}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Hvad er ADHD?
            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Subject articles', { subject: 'mental' })
          }>

          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/ADHD.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginBottom: 10,
              }}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Udfordringer med ADHD
            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Subject articles', { subject: 'women' })
          }>

          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/Women.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginBottom: 10,
              }}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Kvinder med ADHD/ADD
            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Subject articles', {
              subject: 'relationships',
            })
          }>

          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Image
              source={require('../../Assets/images/Hearts.png')}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginBottom: 10,
              }}></Image>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              ADHD og Relationer
            </Text>
          </View>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 25,
    marginTop: 35,
  },
  text: {
    textAlign: 'center',
  },
  buttonGrad: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    bottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  press: {
    marginBottom: 15,
  },
});

export default PickTopics;
