import 'react-native-gesture-handler'
import 'react-native-get-random-values';
import 'expo-random';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { configurePushNotifications } from './Components/PushNotificationMethods';

AppRegistry.registerComponent(appName, () => App);
