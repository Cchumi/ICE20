
import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import FloatingLabelInput from './components/FloatingLabelInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { center } from "../../navigation/components/constants";

class Message extends Component {
    static navigationOptions =({navigation}) =>( {
        title: "Contactez-Nous!",
        headerStyle: {
            backgroundColor: 'rgba(230, 0, 126, 1)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      });
  constructor(props) {
    super(props);
    this.state = {
      skipIntro: null,
      isReady: false,
      text: 'Nom',
      valueNom: '',
      valuePrenom: '',
      valueEmail: '',
      valueTelephone: '',
      valueMessage: '',
    }
   // this.createClass = this.createClass.bind(this);

  }
  componentDidMount = () => {
   // this.props.navigation.navigate("MainNavigator");
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

  handleTextNomChange = (newText) => this.setState({ valueNom: newText });
  handleTextPrenomChange = (newText) => this.setState({ valuePrenom: newText });
  handleTextEmailChange = (newText) => this.setState({ valueEmail: newText });
  handleTextTelephoneChange = (newText) => this.setState({ valueTelephone: newText });
  handleTextMessageChange = (newText) => this.setState({ valueMessage: newText });
  FormSubmit = () => {
      Alert.alert("Merci pour votre message");
    this.setState(
        {
            
            valueNom: '',
            valuePrenom: '',
            valueEmail: '',
            valueTelephone: '',
            valueMessage: '',
          }
    )
    };
  render() {
    return (
      <View style={styles.container}>
        
        <FloatingLabelInput
          type="Input" 
          label="Nom *"
          value={this.state.valueNom}
          paddingTop={10} 
          onChangeText={this.handleTextNomChange}
        />
        <FloatingLabelInput
          type="Input" 
          label="Prénom *"
          value={this.state.valuePrenom}
          paddingTop={10} 
          onChangeText={this.handleTextPrenomChange}
        />
        <FloatingLabelInput
          type="Input" 
          label="Email"
          value={this.state.valueEmail}
          paddingTop={10} 
          onChangeText={this.handleTextEmailChange}
        />
        <FloatingLabelInput
          type="Input" 
          label="Téléphone"
          value={this.state.valueTelephone}
          paddingTop={10} 
          keyboardType="numeric" 
          onChangeText={this.handleTextTelephoneChange}
        />
        <FloatingLabelInput
          type="TextInput" 
          label="Votre Message ici *"
          value={this.state.valueMessage}
          paddingTop={10} 
          multiline={true} 
          numberOfLines={4} 
          height={150} 
          onChangeText={this.handleTextMessageChange}
        />
        {/*<Icon name="ios-send" size={50} />*/}
        {/*<Button
            style={styles.sendMail}
            onPress={this.FormSubmit}
            title="Envoyer"
            color="#fff"
            accessibilityLabel="Learn more about this purple button"
            />*/}
        <TouchableOpacity onPress={this.FormSubmit} style={{paddingTop:20}}>
            <View style={styles.button}>
            <Text style={styles.text}>Envoyer</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1, 
    padding: 30, 
    backgroundColor: '#f5fcff',
  },
  sendMail: {
      backgroundColor: 'rgba(230, 0, 126, 1)',
  },
  button: {
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: '#FFFFFF',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
    backgroundColor: 'rgba(230, 0, 126, 1)',
  },
  // Button text
  text: {
    color: '#FFFFFF',/*'#FFFFFF',*/
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  
});
export default Message;