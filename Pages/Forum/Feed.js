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
import {useNavigation, useTheme} from '@react-navigation/native';

const Feed = ({forumTitle, posts}) => {
   const {colors} = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <View
          style={[
            styles.seperator,
            {backgroundColor: colors.border}]}></View>
        <View style={styles.feedContent}>
          {posts.length == 0 ? (
            <Text></Text>
          ) : (
            posts.map((post, index) => (
              <Post style={styles.postSize} key={index} postObject={post}></Post>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  seperator: {
    width: '80%',
    alignSelf: 'center',
    height: 1,
    marginBottom: 20,
  },
});

export default Feed;
