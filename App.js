import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from './components/navigate';


export default function App() {
  return (
    <AppContainer/>
    );
}

const SwitchNavigator=createSwitchNavigator({
  Home:{screen:Home},
  BottomTab:{screen:AppTabNavigator},
})
const AppContainer=createAppContainer(SwitchNavigator);