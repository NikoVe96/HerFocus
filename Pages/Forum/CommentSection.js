import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useState} from 'react';
import Comment from './Comment';
import Parse from 'parse/react-native';

const CommentSection = ({postId, numberOfComments}) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    console.log('Rendering comments...');
    async function fetchComments() {
      try {
        const query = new Parse.Query('Comment');
        query.equalTo('postIdString', postId);
        query.ascending('createdAt');
        const results = await query.find();
        const updatedComments = {...comments};

        for (const result of results) {
          updatedComments[result.id] = result.toJSON();
        }

        setComments[updatedComments];
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [postId, numberOfComments]);

  //  useEffect(() => {
  //    const fetchComments = async () => {
  //      const query = new Parse.Query('Comment');
  //      query.equalTo('postIdString', postId);
  //      query.descending('createdAt');
  //      try {
  //        let result = await query.find();
  //        setComments(result);
  //      } catch (error) {
  //        console.error('Error fetching comments', error);
  //      }
  //    };
  //    fetchComments();
  //  }, [postId]);

  //  const handleNewComment = newComment => {
  //    setComments(currentComments => [newComment, ...currentComments]);
  //  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.seperator}></View>
      <View style={styles.sectionContent}>
        {Object.entries(comments).map(([commentId, comment]) => (
          <Comment
            key={commentId}
            CommentedBy={comment.get('username')}
            commentContent={comment.get('commentContent')}
            daysAgo={Math.round(
              (new Date().getTime() - new Date(comment.createdAt).getTime()) /
                (1000 * 3600 * 24),
            )}></Comment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  seperator: {
    width: 320,
    height: 1,
    marginLeft: 15,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  sectionContent: {
    color: 'black',
  },
});

export default CommentSection;
