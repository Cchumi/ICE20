import React, { Component, Fragment } from 'react';
import {
  StatusBar,      // Allows to hide the satatus bar
  AsyncStorage, 
  Alert,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import renderIf from '../js/helpers/renderIf';





class HomeTest extends Component {
  /*static navigationOptions = {
    title: 'Home',
  };*/
  async saveKey () {
    try {
      await AsyncStorage.setItem('@ICE20:skipIntro', '0');
      const value = await AsyncStorage.getItem('@ICE20:skipIntro');
      //state = this.initState(this.props);
     /* this.setState({
        index: this.state.index - this.state.total -1,
      });*/
      //props.navigation.goBack(null);
      //this.props.navigation.navigate('Screens');
      //Alert.alert(value);
      //Alert.alert(this.getKey());
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  
  render() {

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.saveKey()} 
        />
      </View>
      )
  }
}
export default HomeTest;

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