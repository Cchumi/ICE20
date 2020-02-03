import { createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";
import LoadingScreen from '../../screens/loading/LoadingScreen'
import LoadingStack from '../Stacks/LoadingStackNavigator'
import TabNavigator from './TabBarNavigator'
import Intro from '../../screens/Intro/Intro'
import ConditionsScreen from '../../screens/Conditions/ConditionsGenerales'
const SwitchNavigator = createSwitchNavigator({
  Loading: {
    screen: LoadingStack,
  },
  Intro: {
    screen: Intro,
    navigationOptions: {
      header: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    },
  },
  ConditionsGeneralesIntro: {
    screen: ConditionsScreen,
  },
  MainApp: {
    screen: TabNavigator,
  },
  /* Auth: {
     screen: AuthStack,
   },
   AppCli: {
     screen: MainNavigatorCli,
   },
   AppEnt: {
     screen: MainNavigatorEnt,
   },*/
});
export default SwitchNavigator