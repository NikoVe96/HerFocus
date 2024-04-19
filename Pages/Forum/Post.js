import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import WriteComment from './WriteComment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import Parse from 'parse/react-native';
import CommentSection from './CommentSection';

const Post = ({postObject}) => {
  const navigation = useNavigation();
  const [commentCount, setCommentCount] = useState(
    postObject.get('numberOfComments'),
  );
  let daysAgo = Math.round(
    (new Date().getTime() - new Date(postObject.get('createdAt')).getTime()) /
      (1000 * 3600 * 24),
  );
  const {colors} = useTheme();

  function handlePostClick() {
    navigation.navigate('IndividualPost', {postObject: postObject});
  }

  async function getPost() {
    let post = new Parse.Query('Post');
    post.equalTo('objectId', postObject.get('objectId'));
    const results = await post.find();
    console.log(results);
    IndividualPost = results[0];
  }

  useEffect(() => {
    console.log(postObject.get('numberOfComments'));
  }, [postObject.get('numberOfComments')]);

  const fetchCommentCount = async () => {
    const query = new Parse.Query(Post);
    const post = await query[0].get(id);
    const updatedCommentCount = post.get('numberOfComments');
    setCommentCount(updatedCommentCount);
  };

  return (
    <View
      style={[styles.postContainer, styles.shadowProp, {backgroundColor: colors.notification}]}>
      <View style={styles.userInfo}>
        <FontAwesomeIcon icon={faUser} style={styles.icon} size={30} />
        <View>
          <Text style={[styles.user, {color: colors.text}]}>
            {postObject.get('username')}
          </Text>
          <Text style={[styles.when, {color: colors.text}]}>
            Tilføjet {daysAgo} dage siden
          </Text>
        </View>
      </View>
      <View style={[styles.post, {backgroundColor: colors.subButton}]}>
        <Text style={[styles.postText, {color: colors.text}]}>
          {postObject.get('postContent')}
        </Text>
      </View>
      <View style={styles.comments}>
        <View style={styles.addComment}>
          <TouchableOpacity onPress={() => handlePostClick()}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={[styles.icon2, {color: colors.iconLight}]}
              size={15}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePostClick()}>
            <Text style={[styles.text, {color: colors.text}]}>kommenter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberComments}>
          <Text style={{color: colors.text}}>
            {postObject.get('numberOfComments')} comments
          </Text>
        </View>
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
    marginLeft: 10,
    fontSize: 15,
  },
  when: {
    marginLeft: 10,
    fontSize: 10,
  },
  postContainer: {
    width: 350,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
   shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
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
  },
  postText: {
    color: 'black',
    fontSize: 15,
    padding: 10,
  },
  comments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 10,
  },
  icon2: {
    transform: [{rotate: '50deg'}],
    marginRight: 10,
  },
  addComment: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default Post;
