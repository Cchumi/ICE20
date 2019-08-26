import React, { Component }  from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createSwitchNavigator,
   createAppContainer,
   createDrawerNavigator,
   createBottomTabNavigator,
   createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
//import WelcomeIntro from './WelcomeIntro';
//import ArScreen from './ArScreen';
//import HomeTabNavigator from './HomeTabNavigator';
//import Screens from './Screens';

//import HomeTest from './HomeTest';
//import ConditionsGenerales from './ConditionsGenerales';
class WelcomeScreen extends Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Button
           title="Login"
           onPress={() => this.props.navigation.navigate('Dashboard')}
         />
         <Button title="Sign Up" onPress={() => alert('button pressed')} />
       </View>
     );
   }
 }
 
 class DashboardScreen extends Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>DashboardScreen</Text>
         <Button
           title="Login"
           onPress={() => this.props.navigation.navigate('Dashboard')}
         />
       </View>
     );
   }
 }
 
 class Feed extends Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Feed</Text>
       </View>
     );
   }
 }
 
 class Settings extends Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Settings</Text>
       </View>
     );
   }
 }
 
 class Profile extends Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Profile</Text>
       </View>
     );
   }
 }
 
 const DashboardTabNavigator = createBottomTabNavigator(
   {
     Feed,
     Profile,
     Settings
   },
   {
     navigationOptions: ({ navigation }) => {
       const { routeName } = navigation.state.routes[navigation.state.index];
       return {
         headerTitle: routeName
       };
     }
   }
 );
 const DashboardStackNavigator = createStackNavigator(
   {
     DashboardTabNavigator: DashboardTabNavigator
   },
   {
     defaultNavigationOptions: ({ navigation }) => {
       return {
         headerLeft: (
           <Icon
             style={{ paddingLeft: 10 }}
             onPress={() => navigation.openDrawer()}
             name="md-menu"
             size={30}
           />
         )
       };
     }
   }
 );
 
 const AppDrawerNavigator = createDrawerNavigator({
   Dashboard: {
     screen: DashboardStackNavigator
   }
 });
 
 const AppSwitchNavigator = createSwitchNavigator({
   Welcome: { screen: WelcomeScreen },
   Dashboard: { screen: AppDrawerNavigator }
 });
 
 const AppContainer = createAppContainer(AppSwitchNavigator);
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
   }
});

export default AppContainer;