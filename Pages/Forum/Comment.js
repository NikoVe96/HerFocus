import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Comment = (commentedBy, daysAgo, commentContent) => {
  const {colors} = useTheme();

  return (
    <View style={styles.commentContainer}>
      <View style={styles.userInfo}>
        <FontAwesomeIcon icon={faUser} style={styles.icon} size={30} />
        <View>
          <Text style={styles.user}>{commentedBy}</Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Text style={[styles.commentText, {color: colors.text}]}>
          {commentContent}
        </Text>
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
  commentContainer: {
    width: 350,
    alignSelf: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
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
  },
  commentText: {
    fontSize: 15,
    padding: 10,
  },
});

export default Comment;
