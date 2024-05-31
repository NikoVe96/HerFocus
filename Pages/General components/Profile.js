import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
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
import { useTheme } from '@react-navigation/native';
import BottomNavigation from '../../Navigation/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../Components/UserContext';
import { useFocusEffect } from '@react-navigation/native';


export const Profile = () => {
  let [avatar, setAvatar] = useState('');
  const { colors } = useTheme();
  const { username, name, email, updateUserProfile } = useUser();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  useFocusEffect(
    useCallback(() => {
      updateUserProfile();
      return () => { };
    }, []),
  );

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser !== null) {
        setAvatar(currentUser.get('avatar'));
      }
    }
    getCurrentUser();
  }, [username]);

  const handleAvatarSelect = selectedAvatar => {
    setAvatar(selectedAvatar);
  };

  const avatarImageSource = getAvatarImage(avatar);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userNameContainer}>
          <View
            style={[styles.styling, { backgroundColor: colors.border }]}></View>
          <Text
            style={[
              styles.user,
              { color: colors.text, fontSize: 25 * scaleFactor },
            ]}>
            {username}
          </Text>
          <Image source={avatarImageSource} style={styles.avatarImage} />
          <View style={styles.avatar}>
            <View style={styles.avatar}></View>
          </View>
        </View>
        <View style={styles.seperator}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={faUser}
            style={[styles.icons, { color: colors.text }]}
            size={20}
          />
          <Text
            style={[
              styles.userInfo,
              { color: colors.text, fontSize: 18 * scaleFactor },
            ]}>
            {' '}
            {name}{' '}
          </Text>
        </View>
        <View
          style={[
            styles.seperator,
            { backgroundColor: colors.mainButton },
          ]}></View>
        <View style={styles.userContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={[styles.icons, { color: colors.text }]}
              size={20}
            />
            <Text
              style={[
                styles.userInfo,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              {email}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.seperator,
            { backgroundColor: colors.mainButton },
          ]}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={faImage}
            style={[styles.icons, { color: colors.text }]}
            size={20}
          />
          <Text
            style={[
              styles.userInfo,
              { color: colors.text, fontSize: 18 * scaleFactor },
            ]}>
            Skift avatar
          </Text>
        </View>
        <View style={styles.changeAvatar}>
          <PickAvatar
            onAvatarSelect={handleAvatarSelect}
            picked={avatar}></PickAvatar>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userNameContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    marginTop: 10,
    width: 60,
    height: 60,
  },
  styling: {
    width: '100%',
    height: 80,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 10,
  },
  user: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 30,
    zIndex: 2,
    position: 'absolute',
    marginTop: 40,
  },
  seperator: {
    width: '100%',
    height: 1,
    marginBottom: 20,
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
  changeAvatar: {
    marginLeft: 10,
  },
});

export default Profile;
