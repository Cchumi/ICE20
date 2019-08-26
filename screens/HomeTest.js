
import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";

class HomeTest extends Component {
  static navigationOptions =({navigation}) =>( {
    title: "A l'affiche",
  });
  constructor(props) {
    super(props);
    this.state = {
      skipIntro: null,
      isReady: false,
    }
   // this.createClass = this.createClass.bind(this);

  }
  componentDidMount = () => {
    this.props.navigation.navigate("MainNavigator");
   // this._updateList();
    // Hide the status bar
    //StatusBar.setHidden(true);
   /* if(this.state.skipIntro){
     // this.props.navigation.navigate("Intro");
    }
    else {
      //this.props.navigation.navigate("HomeScreen");
    }*/
    //this.props.navigation.navigate("HomeScreen");
  };

  /*async _updateList () { 
    AsyncStorage.getItem('@ICE20:skipIntro').then((val) => {
      this.setState({ skipIntro: val, isReady: true })
    });
  } */
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Home Test.</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default HomeTest;