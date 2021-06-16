import React, { Component } from 'react';
import {
  AppRegistry,    // Registers the app
  StatusBar,      // Allows to hide the satatus bar
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
import CodePush from "react-native-code-push";
import AsyncStorage from '@react-native-community/async-storage';
//import RNRestart from 'react-native-restart';

const iconStyles = {
  size: 30,
  color: '#fff',
  paddingLeft: 50,
};
export default class AdminPasswd extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Déverouillage",
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
      restartAllowed: true,
      version: null,
      label: null,
      appCheck: false,
      isLoading: true,
      progress: false,
      restartNeeded: false,
      adminPasswd: '',
      gotAdminRight: false,
    }

    //this._onRestartApp = this._onRestartApp.bind(this);
  }
  /*async componentWillMount() {

  }*/
  componentDidMount() {
    this.getData();

  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }
  storeData = async () => {
    try {
      await AsyncStorage.setItem('@LabelConnect:GotAdminRight', '1')
    } catch (e) {
      // saving error
    }
  }
  resetKey = async () => {
    try {
      await AsyncStorage.removeItem('@LabelConnect:GotAdminRight');
      this.setState({ gotAdminRight: false });
      Alert.alert("Droits effacés :)", "Maintenant il faut quitter l'application et la relancer pour revenir au contenu normal.")
      //this.setState({myKey: value});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  getData = async () => {
    try {
      const gotAdminRight = await AsyncStorage.getItem("@LabelConnect:GotAdminRight")
      console.log(gotAdminRight)
      if (gotAdminRight !== null) {
        this.setState({ gotAdminRight: true });
        // value previously stored
      }
      else {
        this.setState({ gotAdminRight: false });
      }
    } catch (e) {
      // error reading value
      console.log("erreur ", e)
    }
  }

  _checkPassword = () => {
    if (this.state.adminPasswd !== '#JeSuisLeMaitreDuMonde18') {
      Alert.alert("Essayez encore :)", "Heureusement qu'il ne se devine pas comme cela ;)")
    } else {
      this.storeData();
      this.setState({ gotAdminRight: true });
      Alert.alert("Bien joué :)", "Maintenant il faut quitter l'application et la relancer pour voir apparaitre du nouveau contenu.")
    }
  }

  render() {
    console.log(this.state)
    //console.log(this.state.syncMessage);
    /*let progressView;
    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{(this.state.progress.receivedBytes/125000).toFixed(2)}mb de {(this.state.progress.totalBytes/125000).toFixed(2)}mb téléchargés</Text>
      );
    }*/
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.outer}>
          <View style={styles.topContainer}>
            <Text style={styles.version}>Veuillez saisir le mot de passe fournit par votre administrateur!</Text>
          </View>
          {this.state.gotAdminRight ?
            <TouchableOpacity style={[styles.DownloadContainer, styles.bottomContainer]} onPress={() => { this.resetKey() }}>
              <View style={styles.button}>
                <Text style={styles.text}>Enlever les droits</Text>
              </View>
              {/*<Icon name="ios-eye" size={50} style={{}} />*/}
            </TouchableOpacity>
            :
            <View style={styles.middleContainer}>
              <Input
                label={"Entrez le mot de passe maître"}
                labelStyle={{ color: 'rgba(230, 0, 126, 1)' }}
                onChangeText={(value) => { this.setState({ adminPasswd: value }) }}
                //placeholder='INPUT WITH ERROR MESSAGE'
                errorStyle={{ color: 'red' }}
                errorMessage='Mauvais mot de passe!'
              />
            

            <TouchableOpacity style={[styles.DownloadContainer, styles.bottomContainer]} onPress={() => { this._checkPassword() }}>
              <View style={styles.button}>
                <Text style={styles.text}>Vérifier</Text>
              </View>
              {/*<Icon name="ios-eye" size={50} style={{}} />*/}
            </TouchableOpacity>
            </View>
          }
        </View>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20
  },
  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  middleContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  bottomContainer: {
    justifyContent: 'flex-start',
    width: '90%',
    margin: 20,
    padding: 10,
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  DownloadContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 80,
    //fontSize: 
    // height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    //height: 100,  style={{height: 100, justifyContent:'center', alignItems:'center'}}
  },
  downloadtxt: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    //fontSize: 
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    //height: 100,
  },
  button: {
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: 'rgba(230, 0, 126, 1)',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
    backgroundColor: 'rgba(230, 0, 126, 1)',
  },
  // Button text
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  version: {
    marginTop: 10,
    textAlign: "center",
    color: 'rgba(230, 0, 126, 1)',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    }),
    fontSize: 10,
    //fontWeight: 'bold',
  },
  messages: {
    marginTop: 20,
    textAlign: "center",
    color: 'rgba(230, 0, 126, 1)',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    }),
    fontSize: 12,
    fontWeight: 'bold',
  },
});