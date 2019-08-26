import React, { Component } from 'react';
import {
  AppRegistry,    // Registers the app
  StatusBar,      // Allows to hide the satatus bar
  AsyncStorage, 
  Alert,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Screens from './Screens';
import ArScreen from './ArScreen';
import HomeTest from './HomeTest';
//import HomeTabNavigator from './HomeTabNavigator';
import renderIf from './js/helpers/renderIf';
import { withNavigation } from 'react-navigation';



class WelcomeIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skipIntro: null,
      isReady: false,
    }
    this.createClass = this.createClass.bind(this);
    this.goToTabNavigator = this.goToTabNavigator.bind(this);
  }
  async componentWillMount() {

  }
  async componentDidMount() {
    this._updateList();
    // Hide the status bar
    StatusBar.setHidden(true);
  }
  async _updateList () { 
    AsyncStorage.getItem('@ICE20:skipIntro').then((val) => {
      this.setState({ skipIntro: val, isReady: true })
    });
  } 
goToTabNavigator() {
  this.props.navigation.navigate('HomeTabNavigator');
}
  createClass() {
    if (!this.state.skipIntro) {
        return (
          <Screens navigation={this.props.navigation} />
        )
    }
    else {
      return (<HomeTest  navigation={this.props.navigation}  />)
        /*return (*/
          //this.props.navigation.navigate('HomeTabNavigator')
         //return this.goToTabNavigator();
        /*)*/
    }
    return null;
  }
  
  render() {
    if (!this.state.isReady) {
      return (
        <View style={localStyles.outer}>

        <Image
          style={{width: 150, height: 150}}
          source={require('./assets/logoICE20.png')}
          
        />
        </View> 
      )
    } else {
         return (
          this.createClass()
      );
    }
  }
}
export default withNavigation(WelcomeIntro);

//export default WelcomeIntro;
var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arView: {
    flex:1,
  },
  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});