import { createAppContainer, createStackNavigator, HeaderBackButton, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeIntro from './WelcomeIntro';
import ArScreen from './ArScreen';
//import HomeTabNavigator from './HomeTabNavigator';
import Screens from './Screens';

import HomeTest from './HomeTest';
import ConditionsGenerales from './screens/Conditions/ConditionsGenerales';
const iconStyles = {
   size: 20,
   color: '#FFFFFF',
 };


const AppNavigator = createStackNavigator({
   Welcome: {
      screen: WelcomeIntro,
      navigationOptions: {
         header: null,
           //title: 'Home',
         }
   },
   Screens: {
      screen: Screens,
      navigationOptions: {
         header: null,
      }
   },
  /* HomeTabNavigator: {
      screen: HomeTabNavigator,

   },*/
  /* ArScreen: {
      screen: ArScreen,
      navigationOptions: {
         header: null,
      }
   },  */      
   Conditions: {
      screen: ConditionsGenerales,
      navigationOptions: {
         title: 'Conditions Générales',
      }
      /* navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
      title: 'Conditions Générales',
            headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
          })*/
   },
},
{
   initialRouteName: 'Welcome',
   //headerMode: 'none',
}
);
const AppContainer = createAppContainer(AppNavigator);
//alert("ok");
// Now AppContainer is the main component for React to render

export default AppContainer;