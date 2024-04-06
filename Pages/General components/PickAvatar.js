import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Parse from 'parse/react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faImage,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

export const PickAvatar = () => {
  return (
    <View style={styles.avatars}>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar1.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar2.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar3.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar4.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar5.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar6.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar7.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar8.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar9.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar10.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar11.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar12.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar13.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar14.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar15.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar16.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../Assets/images/Avatar17.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  images: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default PickAvatar;
