
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import FloatingLabelInput from './components/FloatingLabelInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { center } from "../../navigation/components/constants";
import { useFirestore } from 'react-redux-firebase'
import firebase from 'react-native-firebase';
class Message extends Component {

  static navigationOptions = ({ navigation }) => ({
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
      submitDisabled: true,
      message: {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: '',
      }

    }
    // this.createClass = this.createClass.bind(this);

  }
  componentDidMount = () => {

  };


  handleTextNomChange = (newText) => this.setState({ message: { ...this.state.message, nom: newText } });
  handleTextPrenomChange = (newText) => this.setState({ message: { ...this.state.message, prenom: newText } });
  handleTextEmailChange = (newText) => this.setState({ message: { ...this.state.message, email: newText } });
  handleTextTelephoneChange = (newText) => this.setState({ message: { ...this.state.message, telephone: newText } });
  handleTextMessageChange = (newText) => this.setState({ message: { ...this.state.message, message: newText } });
  FormSubmit = () => {
    //const firestore = useFirestore();
    firebase.firestore().collection('messages').add(this.state.message)
    this.setState(
      {
        message: {
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          message: '',
        }
      }
    )
    Alert.alert("Merci pour votre message");
  };
  render() {
    let disabled = true
    if(this.state.message.nom && this.state.message.prenom && this.state.message.email && this.state.message.telephone && this.state.message.message){
      disabled = false
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={{ flex: 1 }}
            keyboardVerticalOffset={10} behavior={"padding"}>
            <FloatingLabelInput
              type="Input"
              label="Nom *"
              value={this.state.message.nom}
              paddingTop={10}
              onChangeText={this.handleTextNomChange}
            />
            <FloatingLabelInput
              type="Input"
              label="Prénom *"
              value={this.state.message.prenom}
              paddingTop={10}
              onChangeText={this.handleTextPrenomChange}
            />
            <FloatingLabelInput
              type="Input"
              label="Email"
              value={this.state.message.email}
              paddingTop={10}
              onChangeText={this.handleTextEmailChange}
            />
            <FloatingLabelInput
              type="Input"
              label="Téléphone"
              value={this.state.message.telephone}
              paddingTop={10}
              keyboardType="numeric"
              onChangeText={this.handleTextTelephoneChange}
            />
            <FloatingLabelInput
              type="TextInput"
              label="Votre Message ici *"
              value={this.state.message.message}
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
            <TouchableOpacity onPress={this.FormSubmit} style={{ paddingTop: 20 }}  disabled={disabled}>
              <View style={disabled ? styles.buttonDisabled : styles.button}>
                <Text style={styles.text}>Envoyer</Text>
              </View>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
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
  buttonDisabled: {
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: '#FFFFFF',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
    backgroundColor: 'rgba(230, 0, 126, .5)',
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