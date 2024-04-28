import React, { useEffect, useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './Navigation/BottomNav';
import SideMenu from './Navigation/SideMenu';
import { NavigationContainer, DefaultTheme, useTheme } from '@react-navigation/native';
import { useColorScheme, Button } from 'react-native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useThemeContext } from './Assets/Theme/ThemeContext';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { UserProvider } from './Components/UserContext';


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

/* Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
} */

function App() {

  const { theme } = useThemeContext();
  const [ID, setID] = useState('');
  //const [expoPushToken, setExpoPushToken] = useState('');
  //const [notification, setNotification] = useState(false);
  //const notificationListener = useRef();
  //const responseListener = useRef();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser) {
          setID(currentUser.id);
          //themeQuery();
        }
      } catch (error) {
        console.error('Error fetching user theme:', error);
        //setTheme(themes.default); // Fallback to default theme on error
      }
    };

    /* registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
 
     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
       setNotification(notification);
     });
 
     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
       console.log(response);
     });
 
     return () => {
       Notifications.removeNotificationSubscription(notificationListener.current);
       Notifications.removeNotificationSubscription(responseListener.current);
     }; */

    getTheme();
  }, []);

  async function themeQuery() {
    let themeQ = new Parse.Query('Settings');
    themeQ.contains('user', ID);
    const Result = await themeQ.find();
    const chosenTheme = (Result[0].get('theme'));
    //setTheme(themes[chosenTheme]);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, }}>
      <NavigationContainer theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <SideMenu />
          {/*<Button
            title="Press to Send Notification"
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          />*/}
           {/* <BottomNavigation /> */}
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