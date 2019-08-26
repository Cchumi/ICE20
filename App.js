import React, { Component }  from 'react';
import {Platform} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//import AppNavigator from './AppNavigator';

import Navigator from "./navigation/Navigator"
import {NavigationActions} from 'react-navigation'
import OfflineNotice from './OfflineNotice'
import { useScreens } from 'react-native-screens';
 
useScreens();
var reducers = require('./js/redux/reducers');

let store = createStore(
  reducers,
  applyMiddleware(thunk)
  );

export default class App extends Component {
  _getCurrentRouteName(navState) {

    if (navState.hasOwnProperty('index')) {
        this._getCurrentRouteName(navState.routes[navState.index])
    } else {
        console.log("Current Route Name:", navState.routeName)
        this.setState({navState: setCurrentRouteName(navState.routeName)})
    }
}

  render() {
    return (
      <Provider store={store}>
        <Navigator  ref={nav => { this.navigator = nav; }} 
        /*onNavigationStateChange={(prevState, newState) => {
          this._getCurrentRouteName(newState)
      }}*/
        />
        <OfflineNotice /> 
      </Provider>
    );
  }
}