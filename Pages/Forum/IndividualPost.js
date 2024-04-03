import Parse from 'parse/react-native';
import CommentSection from './CommentSection';
import WriteComment from './WriteComment';
import Post from './Post';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';

function IndividualPost({route}) {
  const {individualPost} = route.params;
  const [postedBy, setPostedBy] = useState('');
  const [postContent, setPostContent] = useState('');
  const [numberOfComments, setCommentCount] = useState(0);

  useEffect(() => {
    //console.log('post ID:', individualPost.id);
    const fetchPost = async () => {
      try {
        const Post = Parse.Object.extend('Post');
        const query = new Parse.Query(Post);
        const post = await query.get(individualPost.get(objectd));
        if (post) {
          setPostedBy(post.get('username'));
          setPostContent(post.get('postContent'));
          setCommentCount(post.get('numberOfComments'));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (individualPost) {
      fetchPost();
    }
  }, [individualPost]);

  // const fetchCommentCount = async () => {
  //   const Post = Parse.Object.extend('Post');
  //   const query = new Parse.Query(Post);
  //   const post = await query.get(individualPost.get('objectId'));
  //   const updatedCommentCount = post.get('numberOfComments');
  //   setCommentCount(updatedCommentCount);
  // };

  const handleCommentPosted = () => {
    setIsCommenting(false);
    fetchCommentCount();
  };

  return (
    <View style={styles.postContainer}>
      <Post
        postedBy={postedBy}
        postContent={postContent}
        numberOfComments={numberOfComments}
        individualPostClickCallback={() =>
          handleAddCommentClick(individualPost)
        }
      />
      <CommentSection
        postId={individualPost}
        numberOfComments={numberOfComments}
      />
      <WriteComment
        postId={individualPost}
        onCommentPosted={handleCommentPosted}
      />
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
