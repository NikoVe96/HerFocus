import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomNavigation from './Navigation/BottomNav';
import SideMenu from './Navigation/SideMenu';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <SideMenu />
          <BottomNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
