import Parse from 'parse/react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Comment = () => {
  const [comment, setComment] = useState('');

  return (
    <View style={styles.commentContainer}>
      <TextInput style={styles.writeComment}></TextInput>
      <TouchableOpacity
        style={styles.createComment}
        placeholder="Write a comment..."
        placeholderTextColor="black"
        multiline={true}
        inputStyle={{
          paddingHorizontal: 10,
          marginLeft: 10,
          textAlignVertical: 'top',
        }}>
        <FontAwesomeIcon icon={faPaperPlane} style={styles.icon} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    transform: [{rotate: '50deg'}],
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeComment: {
    height: 30,
    width: 290,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  createComment: {
    paddingLeft: 5,
    marginBottom: 5,
  },
});

export default Comment;
