/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  WebView,
  Animated,
  Dimensions,
  Linking,
  Easing,
  StatusBar,
  AsyncStorage,
  ActionSheetIOS,
  CameraRoll,
  PermissionsAndroid,
  PixelRatio,
} from 'react-native';

import RootNavigator from './navigation/RootNavigator'
import { Provider } from 'react-redux';
import OfflineNotice from './components/OfflineNotice'
import createReduxStore from './redux/store'
import firebase from 'react-native-firebase'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
// after other imports
const fbConfig = {} // object containing Firebase config
const rrfConfig = { /*userProfile: 'users'*/ } // react-redux-firebase config
const store = createReduxStore()
// Initialize firebase instance
firebase.initializeApp(fbConfig)
firebase.firestore()
/*const rrfConfig = {
  //userProfile: 'users',
  enableLogging: false,
  //ReactNative: { AsyncStorage },
  onAuthStateChanged: (user, firebase) => {
  console.log('User INFORMATION BRO', user);
  if (user) {
  // User is signed in.
  } else {
  firebase.auth().signInAnonymously();
  }
  },
  };*/
/*firebase.auth().signInAnonymously()
  .then(() => {

    this.auth = true;

  });*/
/* firebase.auth().signInAnonymously().catch(function (error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
 });
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
     var isAnonymous = user.isAnonymous;
     var uid = user.uid;
     console.log("User: ", user);
   } else {
     // User is signed out.
   }
 });*/

//firebase.firestore();
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}


const App = () => {

  const [isAuth, setisAuth] = useState(null);
//const onChange = useCallback((e, value) => setSlide(value), []);
firebase.auth().onAuthStateChanged(async user => {
  if (!user) {
    //console.log('!user')
    await firebase.auth().signInAnonymously()
      .then(() => {
        setisAuth(true)
        console.log('signed 1')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setisAuth(false)
        // ...
        console.log('erreur ', error)
      });
  }
  else {
    //console.log('user', user)
    //firebase.auth().signOut()
    console.log('signed 2')
    setisAuth(true)
  }
});
  if (!isAuth) {
    return null
  }
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <RootNavigator />
        {/*<OfflineNotice /> */}
      </ReactReduxFirebaseProvider>
    </Provider>
  );

};


export default App;
