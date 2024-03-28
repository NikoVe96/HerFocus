import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WriteComment from './WriteComment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import Parse from 'parse/react-native';

const Post = ({postedBy, daysAgo, postContent}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const query = new Parse.Query('Comment');
      query.descending('createdAt');
      try {
        let result = await query.find();
        setComments(result);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };
    fetchComments();
  }, []);

  const handleNewComment = newComment => {
    setComments(currentComments => [newComment, ...currentComments]);
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
      <View style={styles.seperator}></View>
      <WriteComment onNewComment={handleNewComment}></WriteComment>
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
  seperator: {
    width: 320,
    marginLeft: 15,
    height: 1,
    marginBottom: 15,
    backgroundColor: 'black',
  },
});

export default Post;
