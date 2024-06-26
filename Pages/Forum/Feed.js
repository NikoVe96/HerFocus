import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import Post from './Post';
import Parse from 'parse/react-native';
import {useNavigation} from '@react-navigation/native';

const Feed = ({forumTitle, posts}) => {
  //const [posts, setPosts] = useState([]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={styles.feedContent}>
        {posts.length == 0 ? (
          <Text></Text>
        ) : (
          posts.map((post, index) => (
            <Post key={index} postObject={post}></Post>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  seperator: {
    width: 310,
    height: 1,
    marginLeft: 30,
    marginBottom: 20,
    backgroundColor: 'black',
  },
});

export default Feed;
