import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useEffect, useState} from 'react';
import Parse from 'parse/react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '@react-navigation/native';

function WritePost({forumTitle, onNewPost}) {
  const [post, setPost] = useState('');
  const [username, setUsername] = useState('');
  const {colors} = useTheme();

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = Parse.User.current();
      if (currentUser !== null) {
        const username = currentUser.get('username');
        setUsername(username);
      } else {
        console.log('Error fetching user data');
      }
    }
    getCurrentUser();
  }, [forumTitle]);

  const handlePost = async () => {
    const Post = new Parse.Object('Post');

    Post.set('postContent', post);
    Post.set('userObjectId', Parse.User.current());
    Post.set('username', username);
    Post.set('forumTitle', forumTitle);
    Post.set('numberOfComments', 0);

    try {
      const result = await Post.save();
      console.log('Post saved successfully!');
      onNewPost(result);
    } catch (error) {
      console.error('Error saving post:', error);
    }
    setPost('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <TextInput
          style={styles.writePost}
          placeholder=" Skriv et opslag..."
          placeholderTextColor="#8C8C8C"
          multiline={true}
          value={post}
          inputStyle={{
            paddingHorizontal: 10,
            marginLeft: 10,
            textAlignVertical: 'top',
          }}
          onChangeText={setPost}></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => handlePost()}
        style={[
          styles.postBtn,
          styles.shadowProp,
          {backgroundColor: colors.mainButton},
        ]}>
        <Text style={[styles.btnText, {color: colors.text}]}>Slå op</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
  },
  icon: {
    color: 'grey',
    marginTop: 15,
  },
  writePost: {
    width: '80%',
    height: 70,
    borderRadius: 8,
    backgroundColor: '#FFF6ED',
  },
  postBtn: {
    width: '50%',
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  btnText: {
    fontSize: 15,
  },
  postedText: {
    marginTop: 20,
  },
});

export default WritePost;
