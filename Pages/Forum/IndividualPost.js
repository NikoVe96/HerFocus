import Parse from 'parse/react-native';
import CommentSection from './CommentSection';
import WriteComment from './WriteComment';
import Post from './Post';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

function IndividualPost({ route }) {
  const { postObject } = route.params;
  const [postedBy, setPostedBy] = useState('');
  const [postContent, setPostContent] = useState('');
  const [numberOfComments, setCommentCount] = useState(0);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [postObject.get('numberOfComments')]);

  async function fetchComments() {
    try {
      let query = new Parse.Query('Comment');
      query.equalTo('postIdentifier', postObject);
      query.descending('createdAt');
      const results = await query.find();
      console.log(results);
      setAllComments(results);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  function handleNewComment() {
    fetchComments();
  }

  return (
    <View style={styles.postContainer}>
      <Post
        postObject={postObject}
        individualPostClickCallback={() => handleAddCommentClick(postObject)}
      />
      <WriteComment postId={postObject} onNewComment={handleNewComment} />
      <View style={styles.seperator}></View>
      <CommentSection comments={allComments} />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  seperator: {
    width: 320,
    height: 1,
    marginLeft: 15,
    marginBottom: 20,
    backgroundColor: 'black',
  },
});

export default IndividualPost;
