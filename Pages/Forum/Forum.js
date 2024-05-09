import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import Feed from './Feed';
import WritePost from './WritePost';
import WriteComment from './WriteComment';
import Parse from 'parse/react-native';
import BottomNavigation from '../../Navigation/BottomNav';

export const Forum = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const { forumTitle, forumDescription } = route.params;
  const { colors } = useTheme();

  useEffect(() => {
    postQuery();
  }, [forumTitle, posts]);

  function handleNewPost() {
    postQuery();
  }

  async function postQuery() {
    let posts = new Parse.Query('Post');
    posts.contains('forumTitle', forumTitle);
    posts.descending('createdAt');
    const results = await posts.find();
    setPosts(results);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.text }]}>{forumTitle}</Text>
          <View
            style={[styles.descContainer, { backgroundColor: colors.subButton }]}>
            <Text style={[styles.description, { color: colors.text }]}>
              {forumDescription}
            </Text>
          </View>
        </View>
        <WritePost
          onNewPost={handleNewPost}
          forumTitle={forumTitle}></WritePost>
        <Feed forumTitle={forumTitle} posts={posts} setPosts={setPosts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: 25,
    alignSelf: 'center'
  },
  descContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
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
