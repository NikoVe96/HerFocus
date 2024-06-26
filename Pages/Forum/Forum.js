import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Feed from './Feed';
import WritePost from './WritePost';
import WriteComment from './WriteComment';
import Parse from 'parse/react-native';

export const Forum = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const { forumTitle, forumDescription } = route.params;

  useEffect(() => {
    postQuery();
  }, [forumTitle]);


  function handleNewPost() {
    //setPosts(currentPosts => [newPost, ...currentPosts]);
    postQuery();
  };

  async function postQuery() {
    let posts = new Parse.Query('Post');
    posts.contains('forumTitle', forumTitle);
    posts.descending('createdAt');
    const results = await posts.find();
    setPosts(results);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{forumTitle}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{forumDescription}</Text>
          </View>
        </View>
        <WritePost onNewPost={handleNewPost} forumTitle={forumTitle}></WritePost>
        <Feed forumTitle={forumTitle} posts={posts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 25,
  },
  descContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: 340,
    marginLeft: 17,
    alignSelf: 'flex-start',
    backgroundColor: '#AFB1B6',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: 'black',
    padding: 10,
  },
});

export default Forum;
