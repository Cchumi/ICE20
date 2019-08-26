import React, { Component } from 'react';
import {
  AppRegistry,    // Registers the app
  StatusBar,      // Allows to hide the satatus bar
  AsyncStorage, 
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
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
import CodePush from "react-native-code-push";
import RNRestart from 'react-native-restart';

const iconStyles = {
  size: 30,
  color: '#fff',
  paddingLeft: 50,
};
export default class Update extends Component {
  static navigationOptions =({navigation}) =>( {
    title: "Mise à jour",
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
    }
    this.sync = this.sync.bind(this);
   // this.syncImmediate = this.syncImmediate.bind(this);
    this.getUpdateMetadata = this.getUpdateMetadata.bind(this);
    this.codePushDownloadDidProgress = this.codePushDownloadDidProgress.bind(this);
    this.codePushStatusDidChange = this.codePushStatusDidChange.bind(this);
    this._onRestartApp = this._onRestartApp.bind(this);
  }
  /*async componentWillMount() {

  }*/
  componentDidMount() {
    CodePush.notifyApplicationReady();

    this.getUpdateMetadata();
    
  }
  codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Vérification de mises à jours.", appCheck: false });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Téléchargement en cours." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
      this.setState({ syncMessage: "Attente action utilisateur." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installation de la mise à jour." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App à jour.", progress: false, appCheck: true });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Mise à jour annulée par l'utilisateur.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Mise à jour appliqué et sera installé au prochain redémarrage.", progress: false, appCheck: false, restartNeeded: true });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "Une erreur inconnue s'est produite.", progress: false });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }
  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then((metadata) => {
        this.setState({ progress: false, label: metadata.label, version: metadata.appVersion, description: metadata.description });
      }, (error) => {
        this.setState({ syncMessage: "Error: " + error, progress: false });
      });
  }
  _onRestartApp() {
    RNRestart.Restart();
 }
  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
    
  }
  
  render() {
    console.log(this.state.syncMessage);
    let progressView;
    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{(this.state.progress.receivedBytes/125000).toFixed(2)}mb de {(this.state.progress.totalBytes/125000).toFixed(2)}mb téléchargés</Text>
      );
    }
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.outer}>
        <View style={styles.topContainer}>
            <Text style={styles.version}>Version:{this.state.version}.{this.state.label}</Text>
            <Text style={styles.version}>Description:{this.state.description}</Text>
            <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
          </View>
          <View style={styles.middleContainer}>
            {progressView}
          </View>
        {this.state.restartNeeded ?
        <TouchableOpacity style={[styles.DownloadContainer, styles.bottomContainer]} onPress={ ()=>{ this._onRestartApp()}}>
        <View style={styles.button}>
          <Text style={styles.text}>Redémarrer</Text>
        </View>
        {/*<Icon name="ios-eye" size={50} style={{}} />*/}
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.DownloadContainer, styles.bottomContainer]} onPress={ ()=>{ this.sync()}}>
        <View style={styles.button}>
          <Text style={styles.text}>Vérifier</Text>
        </View>
        {/*<Icon name="ios-eye" size={50} style={{}} />*/}
        </TouchableOpacity>
        }
        </View>
        </ScrollView>
      )
}
}

var styles = StyleSheet.create({
  outer : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arView: {
    flex:1,
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


/*{renderIf(this.state.skipIntro,
  <Text style={styles.header}>LOVE</Text>)
}
*/