import React, {createContext, useContext, useState} from 'react';
import Parse from 'parse/react-native';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [username, setUsername] = useState('');
   const [error, setError] = useState('');
   const [password, setPassword] = useState('');

  const handleSignup = async (
    name,
    username,
    email,
    password,
    confirmPassword,
    navigation
  ) => {
      if (password !== confirmPassword) {
        setError('Kodeordene er ikke ens, prøv igen 🙂');
        return;
      }

    const user = new Parse.User();
    user.set('name', name);
    user.set('username', username);
    user.set('email', email);
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
    try {
      const user = await Parse.User.logIn(email, password);
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

 return (
   <UserContext.Provider
     value={{username, error, handleLogin, handleLogout, handleSignup}}>
     {children}
   </UserContext.Provider>
 );
};

export const useUser = () => useContext(UserContext);