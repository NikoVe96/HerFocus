import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from './Navigation/SideMenu';
import { NavigationContainer, DefaultTheme, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useThemeContext } from './Assets/Theme/ThemeContext';
import { UserProvider } from './Components/UserContext';
import { configurePushNotifications } from './Components/PushNotificationMethods';
import messaging from '@react-native-firebase/messaging';


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
configurePushNotifications();

function App() {

  const { theme } = useThemeContext();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  return (
    <GestureHandlerRootView style={{ flex: 1, }}>

      <NavigationContainer theme={theme}>

        <SafeAreaView style={{ flex: 1 }}>
          <SideMenu />

        </SafeAreaView>

      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  );
}

export default AppWrapper;