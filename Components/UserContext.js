import React, {createContext, useContext, useState} from 'react';
import Parse from 'parse/react-native';
import {useFocusEffect} from '@react-navigation/native';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [username, setUsername] = useState('');
   const [error, setError] = useState('');
   const [avatar, setAvatar] = useState('');
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');

  const handleSignup = async (
    name,
    username,
    email,
    password,
    confirmPassword,
    navigation,
    avatar
  ) => {
    setError('')

    const lowerCaseEmail = email.toLowerCase();

    const userNameExist = new Parse.Query('User');
    userNameExist.equalTo('username', username);
    const userExists = await userNameExist.first(); 
    if (userExists) {
      setError('Dette brugernavn er allerede i brug, vælg et nyt');
    }
      if (password !== confirmPassword) {
        setError('Kodeordene er ikke ens, prøv igen');
        return;
      }
      
    const user = new Parse.User();
    user.set('name', name);
    user.set('username', username);
    user.set('email', lowerCaseEmail);
    user.set('password', password);
    user.set('avatar', avatar);

    try {
      await user.signUp();
      navigation.navigate('Login');
      console.log('pressed');
    } catch (error) {
        console.error('Error during signup:', error);
    }
  };

  const handleLogin = async (email, password, navigation) => {
    setError('');

  const lowerCaseEmail = email.toLowerCase(); 

    try {
      const user = await Parse.User.logIn(lowerCaseEmail, password);
      console.log('Success! User ID:', user.id);
      navigation.navigate('Front page');
       setUsername(user.getUsername());
    } catch (error) {
      console.error('Error while logging in user', error);
      setError('Forkert email eller kodeord');
    }
  };

 const handleLogout = async (navigation) => {
   try {
     await Parse.User.logOut();
     setUsername('');
     navigation.navigate('Login');
   } catch (error) {
     console.error('Error logging out', error);
   }
 };

  const updateUserProfile = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUsername(currentUser.get('username'));
      setAvatar(currentUser.get('avatar'));
      setEmail(currentUser.get('email')); 
      setName(currentUser.get('name'));
    }
  };

 return (
   <UserContext.Provider
     value={{username, email, name, error, avatar, updateUserProfile, handleLogin, handleLogout, handleSignup}}>
     {children}
   </UserContext.Provider>
 );
};

export const useUser = () => useContext(UserContext);