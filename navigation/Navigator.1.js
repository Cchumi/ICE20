// In App.js in a new project

import React from "react";
import { View, Text, Platform } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import Intro from "../screens/Intro/Intro";
import ConditionsGenerales from "../screens/Conditions/ConditionsGenerales";
import Affiche from "../screens/Affiche/Affiche";
import ArScreen from "../screens/ArScreen/ArScreen";
import HomeTest from "../screens/HomeTest";
// Import components
import AddButton from './components/AddButton';

import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();
let MyTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
      inputRange,
      outputRange: [.8, 1, 1],
  });

  const scaleY = position.interpolate({
      inputRange,
      outputRange: ([0.8, 1, 1]),
  });

  return {
      opacity,
      transform: [
          {scaleY}
      ]
  };
};

let TransitionConfiguration = () => {
  return {
      // Define scene interpolation, eq. custom transition
      screenInterpolator: (sceneProps) => {

          const {position, scene} = sceneProps;
          const {index} = scene;

          return MyTransition(index, position);
      }
  }
};

/* CONDITIONS GENERALES STACK */
const ConditionsGeneralesStack = createStackNavigator({ ConditionsGenerales });

/* SETTINGS GENERALES STACK */
const SettingsStack = createStackNavigator({ HomeTest });
SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ tintColor }) => <Icon name="ios-cog" size={30} color={tintColor} /*style={{
    textShadowColor: '#fff',
    shadowColor: '#fff',
    shadowOpacity: .5,
    shadowRadius: 1,
    textShadowOffset:{width: 0,height: 0}
    }}*//>,
  drawerLabel: "Settings",
  drawerIcon: ({ tintColor }) => <Icon name="md-cog" size={30} color={tintColor} /*style={{
    textShadowColor: '#fff',
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 5,
    textShadowOffset:{width: 5,height: 2}
    }}*//>
};

/* AR STACK */
const ArStack = createStackNavigator({ ArScreen });
ArStack.navigationOptions = {
  tabBarLabel: "Ar",
  tabBarIcon: ({ tintColor }) => <View style={{
    /*height: 80,
    width: 80,
    borderRadius: 100,*/
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderWidth: 2,
    borderColor: tintColor,//'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(230, 0, 126, 1)',
   // flexDirection: 'row',
    /*textAlign: 'center',*/
    //flex: 1 , 
    //marginBottom:40,
    justiftyContent:"center",
    alignItems:"center",
    }}>
  <Icon name="ios-camera" size={40} color={"#fff"} style={{
    padding:15,
/*textAlign: 'center',
width: 80, 
    height: 80,*/
//verticalAlign: 'center',
}}
/*textShadowColor: '#fff',
shadowColor: '#fff',
shadowOpacity: 1,
shadowRadius: 5,
textShadowOffset:{width: 5,height: 2}
}}*//></View>,
  drawerLabel: "Ar",
  drawerIcon: ({ tintColor }) => <View style={{
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#FE6D64',
    paddingBottom: 15}}>
  <Icon name="ios-camera" size={45} color={tintColor}/></View>
};

/* AFFICHE STACK */
const AfficheStack = createStackNavigator({ Affiche });
AfficheStack.navigationOptions = {
  tabBarLabel: "Affiche",
  tabBarIcon: ({ tintColor }) => <Icon name="ios-flag" size={30} color={tintColor} /*style={{
    textShadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 5,
    textShadowOffset:{width: 5,height: 2}
    }}*//>,
  drawerLabel: "Affiche",
  drawerIcon: ({ tintColor }) => <Icon name="md-flag" size={30} color={tintColor}/* style={{
    textShadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 5,
    textShadowOffset:{width: 2,height: 2}
    }}*//>
};
//, SettingsStack
const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ AfficheStack, ArStack, SettingsStack},
    {
      initialRouteName: 'ArStack',
      transitionConfig: TransitionConfiguration,
      tabBarOptions: {
        showLabel: false,
        showIcon: true,
        tintColor: '#fff',
        inactiveTintColor: 'rgba(230, 0, 126, 1)',
        activeTintColor: '#fff',
        style: {
          backgroundColor: 'rgba(230, 0, 126, 0.5)',
        }
      }
    }),
    
 // android: createDrawerNavigator({ HomeStack, SettingsStack }, { contentComponent: BurgerMenu })
});
/*const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, SettingsStack }),
  android: createDrawerNavigator({ HomeStack, SettingsStack }, { contentComponent: BurgerMenu })
});*/
//const SettingsStack = createStackNavigator({ SettingsScreen });
//export default createSwitchNavigator({ LoadingScreen, AppNavigator });
//export default RootSwitch;
//export default createAppContainer(AppNavigator);
export default createAppContainer(createSwitchNavigator(
  {
    Intro: Intro,
    ConditionsGenerales: ConditionsGeneralesStack,
    MainNavigator: MainNavigator,
  },
  {
    initialRouteName: 'Intro',
    
  }
));