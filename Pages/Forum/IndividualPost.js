import Parse from 'parse/react-native';
import CommentSection from './CommentSection';
import WriteComment from './WriteComment';
import Post from './Post';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';

function IndividualPost({route}) {
  const {postObject} = route.params;
  const [postedBy, setPostedBy] = useState('');
  const [postContent, setPostContent] = useState('');
  const [numberOfComments, setCommentCount] = useState(0);

  useEffect(() => {
    console.log('post: ', postObject);
  });

  return (
    <View style={styles.postContainer}>
      <Post
        postObject={postObject}
        individualPostClickCallback={() => handleAddCommentClick(postObject)}
      />
      <WriteComment postId={postObject} />
      <CommentSection postId={postObject} numberOfComments={numberOfComments} />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default IndividualPost;
