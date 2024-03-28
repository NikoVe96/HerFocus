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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const Feed = ({posts: propPosts}) => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    setPosts(propPosts);
  }, [propPosts]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={styles.feedContent}>
        {posts.map((post, index) => (
          <Post
            key={index}
            postedBy={post.get('username')}
            daysAgo={Math.round(
              (new Date().getTime() - new Date(post.createdAt).getTime()) /
                (1000 * 3600 * 24),
            )}
            postContent={post.get('postContent')}></Post>
        ))}
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
