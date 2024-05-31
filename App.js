import React, { useEffect, useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from './Navigation/SideMenu';
import { NavigationContainer, DefaultTheme, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useThemeContext } from './Assets/Theme/ThemeContext';
import { UserProvider } from './Components/UserContext';
import { configurePushNotifications } from './Components/PushNotificationMethods';


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'
configurePushNotifications();

function App() {

  const { theme } = useThemeContext();
  const [ID, setID] = useState('');
  //const [expoPushToken, setExpoPushToken] = useState('');
  //const [notification, setNotification] = useState(false);
  //const notificationListener = useRef();
  //const responseListener = useRef();

  useEffect(() => {

    //configurePushNotifications();
  }, []);

  async function themeQuery() {
    let themeQ = new Parse.Query('Settings');
    themeQ.contains('user', ID);
    const Result = await themeQ.find();
    const chosenTheme = (Result[0].get('theme'));
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