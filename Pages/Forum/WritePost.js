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

function WritePost({forumTitle, onNewPost}) {
  const [post, setPost] = useState('');
  const [username, setUsername] = useState('');

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
          placeholder="Skriv et opslag..."
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
      <TouchableOpacity onPress={() => handlePost()} style={styles.postBtn}>
        <Text style={styles.btnText}>Post</Text>
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
    width: 280,
    height: 70,
    marginLeft: 20,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF6ED',
  },
  postBtn: {
    width: 280,
    height: 30,
    marginLeft: 55,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#61646B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnText: {
    fontSize: 15,
  },
  postedText: {
    marginTop: 20,
  },
});

export default WritePost;
