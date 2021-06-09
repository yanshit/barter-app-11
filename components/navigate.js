import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/donateBooks';
import BookRequestScreen from '../screens/requestBooks';

export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{
        screen:BookDonateScreen,
        navigationOptions:{
            tabBarIcon:
            <Image 
            source={require("../assets/assets/icon.png")}
            style={{width:20,height:20}}
            />,
            tabBarLabel:"DonateBooks"
        }
    },
    BookRequest:{
        screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:
            <Image 
            source={require("../assets/assets/logo.png")}
            style={{width:20,height:20}}
            />,
            tabBarLabel:"BookRequest"
        }
    },
})
