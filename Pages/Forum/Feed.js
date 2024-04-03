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

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  async function postQuery() {
    let posts = new Parse.Query('Post');
    posts.contains('forumTitle', 'Family');
    const results = await posts.find();
    setPosts(results);
    console.log(results);
  }

  useEffect(() => {
    postQuery();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={styles.feedContent}>
        {posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            postedBy={post.get('username')}
            daysAgo={Math.round(
              (new Date().getTime() - new Date(post.createdAt).getTime()) /
                (1000 * 3600 * 24),
            )}
            postContent={post.get('postContent')}
            numberOfComments={post.numberOfComments}></Post>
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
