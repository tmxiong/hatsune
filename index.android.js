/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { AppRegistry } from 'react-native';
import App from './src/cpApp/containers/app';
// import MyApp from './src/myApp/root';
import MyApp from './src/myApp/routers';

AppRegistry.registerComponent('hatsune', () => App);
AppRegistry.registerComponent('MyApp', () => MyApp);
