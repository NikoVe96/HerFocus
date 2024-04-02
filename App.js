import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './Navigation/BottomNav';
import SideMenu from './Navigation/SideMenu';
import { NavigationContainer, DefaultTheme, useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useThemeContext } from './Assets/Theme/ThemeContext';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

const YellowTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    light: '#FFEABF',
    primary: '#DC9B18',
    background: '#FFF6ED',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const BlueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    light: '#68669D',
    primary: '#131227',
    background: '#393751',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const GreenTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    light: '#71CA81',
    primary: '#0F9D58',
    background: '#C8E6C9',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const RedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    light: '#F19C9B',
    primary: '#D33F49',
    background: '#FFEBEE',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const themes = {
  yellow: YellowTheme,
  blue: BlueTheme,
  green: GreenTheme,
  red: RedTheme,
  default: DefaultTheme,
};

function App() {

  const { theme } = useThemeContext();
  const [ID, setID] = useState('');

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
          <BottomNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;