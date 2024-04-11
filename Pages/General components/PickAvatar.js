import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Parse from 'parse/react-native';

export const PickAvatar = ({onAvatarSelect, isSignedUp, picked}) => {
  const handleAvatarSelect = async avatarSelection => {
    console.log('clicked', avatarSelection);
    onAvatarSelect(avatarSelection);
    if (!isSignedUp) {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser) {
        currentUser.set('avatar', avatarSelection);
        try {
          await currentUser.save();
          onAvatarSelect(avatarSelection);
        } catch (error) {
          console.error('Failed to save avatar:', error);
        }
      }
    }
  };

  const pickedAvatar = avatarSelection => ({
    ...styles.images,
    borderColor: avatarSelection === selectedAvatar ? 'black' : 'transparent',
    borderWidth: avatarSelection === selectedAvatar ? 2 : 0,
  });

  return (
    <View style={styles.avatars}>
      <TouchableOpacity
        onPress={() => handleAvatarSelect('Avatar1')}
        style={pickedAvatar('Avatar1')}>
        <Image
          source={require('../../Assets/images/Avatar1.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar2');
        }}>
        <Image
          source={require('../../Assets/images/Avatar2.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar3');
        }}>
        <Image
          source={require('../../Assets/images/Avatar3.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar4');
        }}>
        <Image
          source={require('../../Assets/images/Avatar4.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar5');
        }}>
        <Image
          source={require('../../Assets/images/Avatar5.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar6');
        }}>
        <Image
          source={require('../../Assets/images/Avatar6.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar7');
        }}>
        <Image
          source={require('../../Assets/images/Avatar7.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar8');
        }}>
        <Image
          source={require('../../Assets/images/Avatar8.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar9');
        }}>
        <Image
          source={require('../../Assets/images/Avatar9.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar10');
        }}>
        <Image
          source={require('../../Assets/images/Avatar10.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar11');
        }}>
        <Image
          source={require('../../Assets/images/Avatar11.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar12');
        }}>
        <Image
          source={require('../../Assets/images/Avatar12.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar13');
        }}>
        <Image
          source={require('../../Assets/images/Avatar13.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar14');
        }}>
        <Image
          source={require('../../Assets/images/Avatar14.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar15');
        }}>
        <Image
          source={require('../../Assets/images/Avatar15.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar16');
        }}>
        <Image
          source={require('../../Assets/images/Avatar16.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar17');
        }}>
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
