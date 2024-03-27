import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import WritePost from './WritePost';
import Parse from 'parse/react-native';

const Post = ({postedBy, daysAgo, postContent}) => {
  return (
    <View style={styles.holder}>
      <Text style={styles.user}></Text>
      <Text style={styles.when}></Text>
      <View style={styles.postContainer}>
        <Text style={styles.post}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {},
  when: {},
  postContainer: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: 'blue',
  },
  post: {
    color: 'black',
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
});

export default Post;
