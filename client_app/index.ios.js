/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//Components
import { Header } from './src/components/common';

const App = () => {
   return(
     <View>
       <Header headerText="Patient Tracker"/>
     </View>
   );
};

AppRegistry.registerComponent('client_app',() => App);