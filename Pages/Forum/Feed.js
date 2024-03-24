import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Feed = ({posts}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={styles.feedContainer}>
        <View style={styles.feedContent}>
          {posts.map((post, index) => (
            <View key={index}>
              <Text style={styles.post}>{post}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.createComment}
          onPress={() => handleLogin(navigation)}
          title=" Login"
          titleColor="#000000">
          <Text style={styles.btnText}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  seperator: {
    width: 300,
    height: 1,
    marginLeft: 40,
    marginBottom: 10,
    backgroundColor: 'black',
  },
  feedContainer: {
    width: 300,
    height: 300,
    marginLeft: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#AFB1B6',
  },
  feedContent: {
    backgroundColor: '#AFB1B6',
    alignSelf: 'center',
  },
  post: {
    color: 'black',
    fontSize: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default Feed;
