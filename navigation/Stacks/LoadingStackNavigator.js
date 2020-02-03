/* STACK DES LIKES

*/
import { createStackNavigator } from 'react-navigation'

import LoadingScreen from '../../screens/loading/LoadingScreen'
//import AppStack from '../Navigators/TabBarNavigator'
import Intro from '../../screens/Intro/Intro'
import ConditionsScreen from '../../screens/Conditions/ConditionsGenerales'
import theme from '../../styles/theme.styles'

const AfficheStackNavigator = createStackNavigator({
    Loading: {
        screen: LoadingScreen,
        navigationOptions: {
            header: null,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0
            }
          },
    },

})

export default AfficheStackNavigator