import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'react-native-config native module unavailable',
  'Missing environment variable',
]);

AppRegistry.registerComponent(appName, () => App);
