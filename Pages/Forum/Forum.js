import React from 'react';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Feed from './Feed';
import WritePost from './WritePost';

export const Forum = () => {
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const {forumTitle, forumDescription} = route.params;

  const handlePost = postContent => {
    setPosts([postContent, ...posts]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{forumTitle}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{forumDescription}</Text>
          </View>
        </View>
        <WritePost onPost={handlePost}></WritePost>
        <Feed posts={posts} />
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
    marginTop: 30,
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
