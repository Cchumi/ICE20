
import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet, StatusBar, Image, ActivityIndicator, Platform } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";
import ArScreen from '../ArScreen/ArScreen';
import Intro from '../Intro/Intro';
import CodePush from "react-native-code-push";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TimerMixin from 'react-timer-mixin';

//import {addPortalWithIndex, removePortalWithUUID, addModelWithIndex, removeAll, removeModelWithUUID,toggleEffectSelection, changePortalLoadState, changePortalPhoto, changeModelLoadState, changeItemClickState, switchListMode, removeARObject, displayUIScreen} from '../../js/redux/actions';
import {fetchProductsConfig, fetchProductsAffiche} from '../../js/redux/actions/productActions';



class LoadingScreen extends Component {
  _isMounted = false;
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
    }
    //this.createClass = this.createClass.bind(this);
    this._updateList = this._updateList.bind(this);
    this.performTimeConsumingTask = this.performTimeConsumingTask.bind(this);
    this.sync = this.sync.bind(this);
    this.syncImmediate = this.syncImmediate.bind(this);
    this.getUpdateMetadata = this.getUpdateMetadata.bind(this);
    this.codePushDownloadDidProgress = this.codePushDownloadDidProgress.bind(this);
    this.codePushStatusDidChange = this.codePushStatusDidChange.bind(this);
    this._navigateTo = this._navigateTo.bind(this);
   // this.createClass = this.createClass.bind(this);

  }
  /*componentDidMount = () => {
    // this.props.navigation.navigate("MainNavigator");
   // this._updateList();
     // Hide the status bar
    // StatusBar.setHidden(true);

  };*/

  codePushStatusDidChange(syncStatus) {
    if (this._isMounted) {
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
        this.setState({ syncMessage: "Mise à jour appliqué et sera installé au prochain redémarrage.", progress: false, appCheck: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "Une erreur inconnue s'est produite.", progress: false });
        break;
    }
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
        this.setState({ /*syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version",*/ progress: false, label: metadata.label, version: metadata.appVersion, description: metadata.description });
      }, (error) => {
        this.setState({ syncMessage: "Error: " + error, progress: false });
      });
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
    
  }

  _navigateTo = (routeName) => {
   /* const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)*/
  }


    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
      CodePush.sync(
        { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this)
      );
    }
 
_updateList () { 
     AsyncStorage.getItem('@ICE20:skipIntro').then((val) => {
       this.setState({ skipIntro: val, isReady: true })
       /*if (this.state.skipIntro){
         this.props.navigation.navigate("MainNavigator");
       }*/
     });
   } 

   performTimeConsumingTask = async() => {
    
    return new Promise((resolve) =>
    
      setTimeout(
        () => { 
          
           
          resolve(true) },
        2000
      )
    )
  }
async getData() {
    return await AsyncStorage.getItem("@ICE20:skipIntro");
}
componentWillUnmount() {
  this._isMounted = false;
}
componentDidMount() {
  /*setTimeout(
    () => { 
      this.props.fetchProductsAffiche(); },
    100
  )*/
  this.props.fetchProductsAffiche();

  this._isMounted = true;
  CodePush.notifyApplicationReady();
  if (this._isMounted) {
    const skipIntro = this.getData();
    this.setState({skipIntro: skipIntro});

    this.getUpdateMetadata();
    this.sync();
  }
  }

  componentDidUpdate () {
   /* this.setTimeout(
      () => { 
    if (this.state.appCheck) {
      if (!this.state.skipIntro) {
        this.props.navigation.navigate('Intro');
      } else {
        this.props.navigation.navigate('MainNavigator');
      }
    }
  },
  5000
    );*/
    TimerMixin.setTimeout(
      () => {
        // alert("ok");
        if (this.state.appCheck) {
          if (!this.state.skipIntro) {
            this.props.navigation.navigate('Intro');
          } else {
            this.props.navigation.navigate('MainNavigator');
          }
        }
      },
      4500
    );
    
  }

  render() {
    let progressView;
    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{(this.state.progress.receivedBytes/125000).toFixed(2)}mb de {(this.state.progress.totalBytes/125000).toFixed(2)}mb téléchargés</Text>
      );
    }

   //if (!this.state.appCheck) {
      return (
        <View style={styles.outer}>
        <View style={[{flex: 1}, styles.elementsContainer]}>
          <View style={styles.logo}>
            <Image
                style={{width: 150, height: 150}}
                loadingIndicatorSource={require('./loader/Spinner-1s.gif')} 
                //source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                source={require('./logo/MACARONICE20.png')}
            />
          </View>
          <View style={{flex: 1}}>
            {/*<Text style={styles.version}>Version:{this.state.version}.{this.state.label}</Text>
            <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>*/}
            <ActivityIndicator size="large" color='rgba(230, 0, 126, 1)' />
            <Text style={styles.messages}>CHARGEMENT EN COURS...</Text>
          </View>
          <View style={{flex: 1}}>
            {progressView}
          </View>
        </View>
      </View> 
      )
    //  }
  }
}
const styles = StyleSheet.create({
  outer : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementsContainer: {
    //backgroundColor: '#ecf5fd',
  /*  marginLeft: 24,
    marginRight: 24,
    marginBottom: 24*/
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
  },
  logo: {
    flex: 3,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-end',

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
  restartToggleButton: {
    color: "blue",
    fontSize: 17
  },
  syncButton: {
    color: "green",
    fontSize: 17
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
});
//export default LoadingScreen;
function selectProps(store) {
  return {

    products: store.products.items,
  loading: store.products.loading,
  error: store.products.error,

  };
}

// -- dispatch REDUX ACTIONS map
const mapDispatchToProps = (dispatch) => {
  return {
    //fetchProductsConfig:() => dispatch(fetchProductsConfig()),
    fetchProductsAffiche:() => dispatch(fetchProductsAffiche()),
  }
}

//export default connect(selectProps, mapDispatchToProps)(withNavigation(ArScreen));
export default connect(selectProps, mapDispatchToProps)(LoadingScreen);