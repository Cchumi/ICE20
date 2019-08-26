import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Screens from './Screens';
import ArScreen from './ArScreen';
//import HomeTest from './HomeTest';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeTabNavigator = createBottomTabNavigator({
    ScreensTest:{
        screen:HomeTest,

    },
    ArScreen:{
        screen:ArScreen,

    },
   /* HomeTest:{
        screen:HomeTest,

    },*/
  });
  
  //export default HomeTabNavigator;
  //export default createAppContainer(HomeTabNavigator);