import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import Comment from './Comment';
import Parse from 'parse/react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommentSection = ({ comments }) => {

  return (


    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sectionContent}>
          {comments.length == 0 ? (
            <Text>Loading comments..</Text>
          ) : (
            comments.map((comment, commentId) => (
              <View key={commentId} style={styles.commentContainer}>
                <View style={styles.userInfo}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={styles.icon}
                    size={30}
                  />
                  <View>
                    <Text style={styles.user}>{comment.get('username')}</Text>
                  </View>
                </View>
                <Text>
                  {Math.round(
                    (new Date().getTime() -
                      new Date(comment.createdAt).getTime()) /
                    (1000 * 3600 * 24),
                  )}
                </Text>
                <View style={styles.comment}>
                  <Text style={styles.commentText}>
                    {comment.get('commentContent')}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 250,
    justifyContent: 'center',
    alignItems: 'center',
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
  commentContainer: {
    width: 350,
    alignSelf: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#AFB1B6',
    marginBottom: 20,
  },
  comment: {
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
  commentText: {
    color: 'black',
    fontSize: 15,
    padding: 10,
  },
});

export default CommentSection;
