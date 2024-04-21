import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '@react-navigation/native';

const CommentSection = ({comments}) => {
  const {colors} = useTheme();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={[styles.seperator, {backgroundColor: colors.border}]}></View>
        <View style={styles.sectionContent}>
          {comments.length == 0 ? (
            <Text></Text>
          ) : (
            comments.map((comment, commentId) => (
              <View
                key={commentId}
                style={[
                  styles.commentContainer,
                  styles.shadowProp,
                  {backgroundColor: colors.notification},
                ]}>
                <View style={styles.userInfo}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={styles.icon}
                    size={30}
                  />
                  <View>
                    <Text style={[styles.user, {color: colors.text}]}>
                      {comment.get('username')}
                    </Text>
                    <Text style={[styles.when, {color: colors.text}]}>
                      Tilføjet{' '}
                      {Math.round(
                        (new Date().getTime() -
                          new Date(comment.createdAt).getTime()) /
                          (1000 * 3600 * 24),
                      )}{' '}
                      dage siden
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.comment,
                    styles.shadowProp,
                    {backgroundColor: colors.subButton},
                  ]}>
                  <Text style={[styles.commentText, {color: colors.text}]}>
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
  },
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
  commentContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  comment: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  commentText: {
    fontSize: 15,
    padding: 10,
  },
  seperator: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    marginBottom: 20,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});

export default CommentSection;
