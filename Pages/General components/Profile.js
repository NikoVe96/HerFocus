import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Parse from 'parse/react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faImage,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import PickAvatar from './PickAvatar';
import getAvatarImage from './AvatarUtils';

export const Profile = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let [avatar, setAvatar] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
          setEmail(currentUser.getEmail());
          setName(currentUser.get('name'));
          setAvatar(currentUser.get('avatar'));
        }
      }
    }
    getCurrentUser();
  }, []);

  const handleAvatarSelect = selectedAvatar => {
    setAvatar(selectedAvatar);
  };

  const avatarImageSource = getAvatarImage(avatar);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userNameContainer}>
        <View style={styles.styling}></View>
        <Text style={styles.user}>{username}</Text>
        <Image source={avatarImageSource} style={styles.avatarImage} />
        <View style={styles.avatar}>
          <View style={styles.avatar} size={30}></View>
        </View>
      </View>
      <View style={styles.seperator}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faUser} style={styles.icons} size={30} />
        <Text style={styles.userInfo}> {name} </Text>
      </View>
      <View style={styles.seperator}></View>
      <View style={styles.userContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.icons} size={30} />
          <Text style={styles.userInfo}>{email} </Text>
        </View>
        <FontAwesomeIcon
          icon={faPenToSquare}
          style={styles.iconEdit}
          size={30}
        />
      </View>
      <View style={styles.seperator}></View>
      <View style={styles.userContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faLock} style={styles.icons} size={30} />
          <Text style={styles.userInfo}> ************* </Text>
        </View>
        <FontAwesomeIcon
          icon={faPenToSquare}
          style={styles.iconEdit}
          size={30}
        />
      </View>
      <View style={styles.seperator}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faImage} style={styles.icons} size={30} />
        <Text style={styles.userInfo}> Change avatar </Text>
      </View>
      <PickAvatar
        onAvatarSelect={handleAvatarSelect}
        PickedAvatar={avatar}></PickAvatar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6ED',
  },
  userNameContainer: {
    zIndex: 1,
    alignItems: 'center',
  },
  avatarImage: {
    marginTop: 10,
    width: 60,
    height: 60,
  },
  styling: {
    width: '100%',
    height: 100,
    backgroundColor: '#DC9B18',
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  user: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    marginTop: 50,
  },
  seperator: {
    width: '100%',
    height: 1,
    marginBottom: 20,
    backgroundColor: '#DC9B18',
  },
  userInfo: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    marginLeft: 30,
    marginBottom: 20,
  },
  iconEdit: {
    marginRight: 20,
    marginBottom: 20,
  },
});

export default Profile;
