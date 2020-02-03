/* STACK AR

*/
import { createStackNavigator } from 'react-navigation'

import ArScreen from '../../screens/Ar/ArScreen'

const ArStackNavigator = createStackNavigator({
    Ar: {
        screen: ArScreen,
        navigationOptions: {
          header: null,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          }
        },
      },
})

export default ArStackNavigator