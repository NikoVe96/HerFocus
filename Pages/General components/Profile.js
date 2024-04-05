import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
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

export const Profile = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let [avatar, setAvatar] = useState('default');

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
          setEmail(currentUser.getEmail());
          setName(currentUser.get('name'));
        }
      }
    }
    getCurrentUser();
  }, [email]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.user}>{username}</Text>
      </View>
      <FontAwesomeIcon icon={faUser} style={styles.avatar} size={30} />
      <View style={styles.seperator}></View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faImage} style={styles.icons} size={30} />
        <Text style={styles.userInfo}> Pick avatar </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6ED',
    flex: 1,
  },
  avatar: {
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  user: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    marginTop: 30,
    marginBottom: 30,
  },
  seperator: {
    width: '100%',
    height: 1,
    marginBottom: 20,
    backgroundColor: 'black',
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
  },
  iconEdit: {
    marginRight: 20,
  },
});

export default Profile;
