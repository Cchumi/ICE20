// In App.js in a new project

import React from "react";
import { View, Text, Platform, Alert } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import Intro from "../screens/Intro/Intro";
import ConditionsGenerales from "../screens/Conditions/ConditionsGenerales";
import Affiche from "../screens/Affiche/Affiche";
import ArScreen from "../screens/ArScreen/ArScreen";
import HomeTest from "../screens/HomeTest";
import Settings from "../screens/HomeTest";
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
const FooterTabNavigator = (props) => {
  let currentRouteName = props.navigation.state.routes[props.navigation.state.index].key
  return (
    <SafeAreaView style={defaultFooterStyle}>
      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50
        }}
        onPress={() => props.navigation.navigate('Feed')}>
        {currentRouteName === 'Feed'
          ? <FeedActive fill={Colors.white} />
          : <Feed fill={Colors.white} />}
      </TouchableOpacity>
      <UploadIcon navigation={props.navigation} />
      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50
        }}
        onPress={() => props.navigation.navigate('Message')}>
        <InboxIcon focused={currentRouteName === 'Message'} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
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
const ConditionsGeneralesStack = createStackNavigator({ ConditionsGenerales: ConditionsGenerales });

/* SETTINGS GENERALES STACK */
const SettingsStack = createStackNavigator({ HomeTestHome : HomeTest });
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
const ArStack = createStackNavigator({ ArScreenHome : ArScreen });
ArStack.navigationOptions = {
  tabBarLabel: "Ar",
  tabBarIcon: ({ tintColor, focused }) => <AddButton tintColor={tintColor} focused={focused} ref={arButton => this.arButton = arButton} />,
  showLabel: false,
};

/* AFFICHE STACK */
const AfficheStack = createStackNavigator({ AfficheHome : Affiche });
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
const MainNavigator = createBottomTabNavigator({
	FirstTab: {
    screen: Affiche,
    navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (<Icon name="ios-flag" size={30} color={tintColor}/>),
			tabBarOnPress: () => {
        //this.setState({isArScreens: true});
      }
		})
	},
	AddButton: {
		screen: ArScreen,//() => null,
		navigationOptions: () => ({
			tabBarIcon: (<AddButton />), //screenprops={isArScreens:true}
			tabBarOnPress: () => {
        this.setState({isArScreens: true})
      }
		})
	},
	SecondTab: {
    screen: Settings,
    navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (<Icon name="ios-flag" size={30} color={tintColor}/>),
			tabBarOnPress: () => {
        //this.setState({isArScreens: true});
      }
    })
	},
  {
    tabBarComponent: props => <FooterTabNavigator {...props} />
  
});

const MainNavigators = createBottomTabNavigator({ AfficheStack, ArStack, SettingsStack},
  {
    initialRouteName: 'ArStack',
    transitionConfig: ()=> {
      return {screenInterpolator: CardStackStyleInterpolator.default.forHorizontal}
      },
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      tintColor: '#fff',
      inactiveTintColor: 'rgba(230, 0, 126, 1)',
      activeTintColor: '#fff',
      style: {
        backgroundColor: 'rgba(230, 0, 126, 0.5)',
      }
    },
    
  });

/*MainNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  initialRouteName: 'ArStack',
  header: null,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    tintColor: '#fff',
    inactiveTintColor: 'rgba(230, 0, 126, 1)',
    activeTintColor: '#fff',
    style: {
      backgroundColor: 'rgba(230, 0, 126, 0.5)',
    }
  },
};*/
/*const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ AfficheStack, ArStack, SettingsStack},
    {
      initialRouteName: 'ArStack',
      transitionConfig: ()=> {
        return {screenInterpolator: CardStackStyleInterpolator.default.forHorizontal}
        },
      tabBarOptions: {
        showLabel: false,
        showIcon: true,
        tintColor: '#fff',
        inactiveTintColor: 'rgba(230, 0, 126, 1)',
        activeTintColor: '#fff',
        style: {
          backgroundColor: 'rgba(230, 0, 126, 0.5)',
        }
      },
      
    }),
    
 // android: createDrawerNavigator({ HomeStack, SettingsStack }, { contentComponent: BurgerMenu })
});*/
//, SettingsStack
/*const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ AfficheStack, ArStack, SettingsStack},
    {
      initialRouteName: 'ArStack',
      transitionConfig: ()=> {
        return {screenInterpolator: CardStackStyleInterpolator.default.forHorizontal}
        },
      tabBarOptions: {
        showLabel: false,
        showIcon: true,
        tintColor: '#fff',
        inactiveTintColor: 'rgba(230, 0, 126, 1)',
        activeTintColor: '#fff',
        style: {
          backgroundColor: 'rgba(230, 0, 126, 0.5)',
        }
      },
      
    }),
    
 // android: createDrawerNavigator({ HomeStack, SettingsStack }, { contentComponent: BurgerMenu })
});*/
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