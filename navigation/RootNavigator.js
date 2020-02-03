/* ROOT NAVIGATOR

*/
import React from 'react';
import { createAppContainer } from 'react-navigation'

import SwitchNavigator from './Navigators/SwitchNavigator'

const appContainer = createAppContainer(SwitchNavigator)

export default appContainer