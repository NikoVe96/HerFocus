import React, {useEffect} from 'react';
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
import Post from './Post';

const Feed = ({posts}) => {
  console.log(posts);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let query = new Parse.Query('Post');
    query.addDescending();
    let result = query.find();
    setPosts(result);
  }, []);

  const handleNewPost = newPost => {
    setPosts(curentPosts => [...curentPosts, newPost]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={styles.feedContainer}>
        <View style={styles.postContainer}>
          <View style={styles.feedContent}>
            {posts.map(post => (
              <View key={post.id}>
                <Text style={styles.post}>{post.get('postContent')}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.seperator2}></View>
        <View style={styles.commentContainer}>
          <TextInput style={styles.writeComment}></TextInput>
          <TouchableOpacity
            style={styles.createComment}
            placeholder="Write a comment..."
            placeholderTextColor="black"
            multiline={true}
            value={comment}
            inputStyle={{
              paddingHorizontal: 10,
              marginLeft: 10,
              textAlignVertical: 'top',
            }}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={styles.icon}
              size={25}
            />
          </TouchableOpacity>
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
    width: 310,
    height: 1,
    marginLeft: 30,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  feedContainer: {
    width: 350,
    alignSelf: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#AFB1B6',
  },
  icon: {
    transform: [{rotate: '50deg'}],
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeComment: {
    height: 30,
    width: 290,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  createComment: {
    paddingLeft: 5,
    marginBottom: 5,
  },
  seperator2: {
    width: 320,
    marginLeft: 15,
    height: 1,
    marginBottom: 15,
    backgroundColor: 'black',
  },
});

export default Feed;
