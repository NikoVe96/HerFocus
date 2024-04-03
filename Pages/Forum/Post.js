import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import WriteComment from './WriteComment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';
import CommentSection from './CommentSection';

const Post = ({
  postId,
  postedBy,
  daysAgo,
  postContent,
  individualPostClickCallback,
}) => {
  const navigation = useNavigation();
  const [numberOfComments, setCommentCount] = useState(0);
  let IndividualPost;

  function handlePostClick(individualPost) {
    navigation.navigate('IndividualPost', (individualPost = {individualPost}));
  }

  async function getPost() {
    let post = new Parse.Query('Post');
    post.equalTo('objectId', postId);
    const results = await post.find();
    IndividualPost = results[0];
  }

  useEffect(() => {
    getPost();
  }, []);

  const fetchCommentCount = async () => {
    const Post = Parse.Object.extend('Post');
    const query = new Parse.Query(Post);
    const post = await query.get(id);
    const updatedCommentCount = post.get('numberOfComments');
    setCommentCount(updatedCommentCount);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        <FontAwesomeIcon icon={faUser} style={styles.icon} size={30} />
        <View>
          <Text style={styles.user}>{postedBy}</Text>
          <Text style={styles.when}>Posted {daysAgo} days ago</Text>
        </View>
      </View>
      <View style={styles.post}>
        <Text style={styles.postText}>{postContent}</Text>
      </View>
      <View style={styles.comments}>
        <TouchableOpacity onPress={() => handlePostClick(postId)}>
          <FontAwesomeIcon icon={faPaperPlane} style={styles.icon2} size={15} />
          <Text>Comment</Text>
        </TouchableOpacity>
        <Text>{numberOfComments} comments</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  user: {
    color: 'black',
    marginLeft: 10,
    fontSize: 15,
  },
  when: {
    color: 'black',
    marginLeft: 10,
    fontSize: 10,
  },
  postContainer: {
    width: 350,
    alignSelf: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#AFB1B6',
    marginBottom: 20,
  },
  post: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    width: 325,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
  },
  postText: {
    color: 'black',
    fontSize: 15,
    padding: 10,
  },
  comments: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
  },
  icon2: {
    transform: [{rotate: '50deg'}],
  },
});

export default Post;
