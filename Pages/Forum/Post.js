import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import WriteComment from './WriteComment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faPaperPlane, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import Parse from 'parse/react-native';
import Modal from 'react-native-modal';
import getAvatarImage from '../General components/AvatarUtils';


const Post = ({postObject, onDelete}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentCount, setCommentCount] = useState(
    postObject.get('numberOfComments'),
  );
  let daysAgo = Math.round(
    (new Date().getTime() - new Date(postObject.get('createdAt')).getTime()) /
      (1000 * 3600 * 24),
  );
  const {colors} = useTheme();
   const avatar = postObject.get('avatar');
   const avatarImageSource = getAvatarImage(avatar);

  function handlePostClick() {
    navigation.navigate('IndividualPost', {postObject: postObject});
  }

    useEffect(() => {
      async function getCurrentUser() {
          const currentUser = await Parse.User.currentAsync();
            setUsername(currentUser.getUsername());
        }
      getCurrentUser();
    }, []);

    const deletePost = async () => {
      try {
        await postObject.destroy();
        onDelete(postObject.id); 
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    };


  useEffect(() => {
    console.log(postObject.get('numberOfComments'));
  }, [postObject.get('numberOfComments')]);


   const showModal = () => {
     setModalVisible(true);
   };

   const hideModal = () => {
     setModalVisible(false);
   };


  return (
    <View style={styles.container}>
      <View
        style={[
          styles.postContainer,
          styles.shadowProp,
          {backgroundColor: colors.notification},
        ]}>
        <View style={styles.upperDisplay}>
          <View style={styles.userInfo}>
            <Image source={avatarImageSource} style={styles.avatarImage}/>
            <View>
            </View>
            <View style={styles.userText}>
              <Text style={[styles.user, {color: colors.text}]}>
                {postObject.get('username')}
              </Text>
              <Text style={[styles.when, {color: colors.text}]}>
                Tilføjet {daysAgo} dage siden
              </Text>
            </View>
          </View>
          <View>
            {postObject.get('username') == username ? (
              <TouchableOpacity onPress={showModal}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={15}
                  style={[styles.trashIcon, {color: colors.iconLight}]}
                />
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}>
              <View
                style={[
                  styles.modalContainer,
                  {backgroundColor: colors.light},
                ]}>
                <Text style={styles.modalTitle}>
                  Er du sikker på, at du vil slette dit opslag?
                </Text>
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <TouchableOpacity
                    onPress={hideModal}
                    style={styles.modalTextContainer1}>
                    <Text style={styles.modalText}>Nej, det var en fejl</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={deletePost}
                    style={styles.modalTextContainer2}>
                    <Text style={styles.modalText}>Ja, slet mit opslag</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View
          style={[
            styles.post,
            styles.shadowProp,
            {backgroundColor: colors.subButton},
          ]}>
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
          <TouchableOpacity onPress={() => handlePostClick()}>
            <View style={styles.numberComments}>
              <Text style={{color: colors.text}}>
                {postObject.get('numberOfComments')} kommentarer
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  userText: {
    marginTop: 5,
    marginLeft: 5
  },
  user: {
    fontSize: 15,
  },
  when: {
    fontSize: 10,
  },
  postContainer: {
    borderRadius: 8,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  post: {
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    width: '95%',
    borderRadius: 8,
  },
  postText: {
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
  upperDisplay: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  trashIcon: {
    margin: 10,
  },
  icon2: {
    transform: [{rotate: '50deg'}],
    marginRight: 10,
  },
  addComment: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextContainer1: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'darkred',
    flex: 1,
    marginHorizontal: 10,
  },
  modalTextContainer2: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'green',
    flex: 1,
    marginHorizontal: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarImage:{
    width: 40,
    height: 40,
  }
});

export default Post;
