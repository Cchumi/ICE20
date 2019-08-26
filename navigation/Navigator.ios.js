// In App.js in a new project

import React from "react";
import { View, Text, Platform, Alert } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator, BottomTabBar } from "react-navigation";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import Intro from "../screens/Intro/Intro";
import ConditionsGenerales from "../screens/Conditions/ConditionsGenerales";
import Affiche from "../screens/Affiche/Affiche";
import Details from "../screens/Affiche/Details";
import DemoTemplate from "../screens/Affiche/DemoTemplate";
import ArScreen from "../screens/ArScreen/ArScreen";
import HomeTest from "../screens/HomeTest";
import Settings from "../screens/Settings/Settings";
import SettingsDetails from "../screens/Settings/SettingsDetails";
import Infos from "../screens/Infos/Infos";
import Update from "../screens/Update/Update";
import Tutoriel from "../screens/Tutoriel/Tutoriel";
import Message from "../screens/Settings/Message";
// Import components
import AddButton from './components/AddButton';
import TabBar from './components/tabBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const TabBarComponent = (props) => (<BottomTabBar {...props} />);
/* CONDITIONS GENERALES STACK */
const ConditionsGeneralesStack = createStackNavigator({ ConditionsGenerales: ConditionsGenerales });
const AfficheStack = createStackNavigator(
  {
    Affiche: {
      screen: Affiche,
    }
  },
  {
    DetailsHome: {
      screen: Details,
      navigationOptions: {
        tabBarVisible: false,
      },
    }
  },
  {
    DemoTemplateHome: {
      screen: DemoTemplate,
      navigationOptions: {
        tabBarVisible: false,
      },
    }
  }
);
const AffStack = createStackNavigator({ Affiche, Details, DemoTemplate });
AffStack.navigationOptions = ({ navigation }) => {
  // get the name of the route
  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'Details' || routeName === 'DemoTemplate') {
    tabBarVisible = false;
  }
  else {
    tabBarVisible = true;
  }
  return {
    tabBarVisible, // this now varies based on screen
    //tabBarLabel: "Search", // this is the same for all screens
  };
};

const SettingsStack = createStackNavigator({ Settings, Infos, Tutoriel, Update, Message });
SettingsStack.navigationOptions = ({ navigation }) => {
  // get the name of the route
  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'Infos' || routeName === 'Tutoriel' || routeName === 'Update' || routeName === 'Message') {
    tabBarVisible = false;
  }
  else {
    tabBarVisible = true;
  }
  return {
    tabBarVisible, // this now varies based on screen
    //tabBarLabel: "Search", // this is the same for all screens
  };
};
/* AR STACK */
const ArStack = createStackNavigator({ ArScreen });
const MainNavigator = createBottomTabNavigator({
  AfficheHome: {
    screen: AffStack,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => <Icon name="ios-flag" size={30} color={tintColor} /*style={{
        textShadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 5,
        textShadowOffset:{width: 5,height: 2}
        }}*//>,
    })
  },
  ArScreen: {
    screen: (props) => <ArScreen {...props} birdType="Resident" args={{ height: 100, region: 'America' }} />,//ArScreen, //() => null, //buttonprops={{childref: this.child}}
    navigationOptions: ({ navigation }) => ({
      tabBarButtonComponent: () => (
        <AddButton onRef={ref => (this.child = ref)} screenprops={{ isAScreens: true }} />
      ),
      //tabBarIcon: (<AddButton onRef={ref => (this.child = ref)}  screenprops={{isAScreens: true}}/>),
			/*tabBarOnPress: ({navigation}) => {
       // this.refs.addbutton;//.handleAddButtonPress;
       this.child.handleAddButtonPressOpenClose();
        //navigation.navigate('AddButton');
       
      }*/
    })
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: ({ navigation }) => ({ //{focused ? 'ios-home' : 'ios-home-outline'}
      tabBarIcon: ({ tintColor, focused }) => <Icon name="ios-cog" size={30} color={tintColor} />,

    })
  }
  /*Infos: {
    screen: Infos,
    navigationOptions: ({navigation}) => ({ //{focused ? 'ios-home' : 'ios-home-outline'}
      tabBarIcon: ({ tintColor, focused  }) => <Icon name="ios-person" size={30} color={tintColor} />,
		})
  }*/
},
  {
    initialRouteName: 'ArScreen',
    tabBarOptions: {
      showLabel: true,
      lazyLoad: true,
      showIcon: true,
      tintColor: '#fff',
      inactiveTintColor: 'rgba(230, 0, 126, 1)',
      activeTintColor: '#fff',
      style: {
        backgroundColor: 'rgba(230, 0, 126, 0.5)',
        borderTopWidth: 0,
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: 60
      },
      tabStyle: {
        
        zIndex: 11111,
        paddingTop: 20,
      },
      indicatorStyle: {
        backgroundColor: 'transparent'
      },
    },
    lazy: true,
    /*tabBarComponent: props =>
    <TabBarComponent
      {...props}
      style={{ borderTopColor: '#605F60' }}
    />,*/
    // tabBarComponent: props => <TabBar {...props} />,
  },
)


export default createAppContainer(createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Intro: Intro,
    ConditionsGenerales: ConditionsGeneralesStack,
    MainNavigator: MainNavigator,
    DetailsHome: Details,
  },
  {
    initialRouteName: 'Loading',

  }
));