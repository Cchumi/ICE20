/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
  Platform,
  Animated,
  Dimensions,
  Linking,
  Easing} from 'react-native';
import codePush from "react-native-code-push";

import {
  ViroARSceneNavigator,
} from 'react-viro';

import renderIf from './js/helpers/renderIf';



var apiKey = "381814B3-73D4-4B04-B481-FB85528A89BE";

//import renderscene from './js/Arscene';
//var InitialARScene = require('./js/ArMultiMarker/MultiMarker');
var InitialARScene = require('./js/Markers/Markers');
//var InitialARScene = require('./js/ARBusinessCardOld/BusinessCard');

var {
  width,
  height
} = Dimensions.get('window');
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, updateDialog: { title: "Mise à jour disponible!", mandatoryUpdateMessage:"Installer la nouvelle mise à jour ??", optionalUpdateMessage: "Installer la nouvelle mise à jour ?", optionalIgnoreButtonLabel: "Surtout pas!",
optionalInstallButtonLabel: "Bien sûr!"}, installMode: codePush.InstallMode.IMMEDIATE };

//type Props = {};
class ICEar extends Component{
  constructor(props) {
    super(props);
    this._renderTrackingScanLine = this._renderTrackingScanLine.bind(this);
    this._changeStateScanline = this._changeStateScanline.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
    this._onDisplayDialog = this._onDisplayDialog.bind(this);
    this._onResetScanAr = this._onResetScanAr.bind(this);

    //this._onContextClearAll = this._onContextClearAll.bind(this);
    
    // Set initial state here
    this.state = {
      temp: 0,
      restartAllowed: true,
      animationScanLine : true,
      resetScene: false,
      isLoading: false,
      viroAppProps: {resetScene: false,displayObject:false, animationScanLine : true, yOffset:0, _onLoadEnd: this._onLoadEnd, _onLoadStart: this._onLoadStart, _onTrackingInit:this._onTrackingInit, _changeStateScanline:this._changeStateScanline, _renderTrackingScanLine: this._renderTrackingScanLine},
    };


    /*let codePushOptions = ({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, updateDialog: { title: "Mise à jour disponible!", mandatoryUpdateMessage:"Installer la nouvelle mise à jour ??", optionalUpdateMessage: "Installer la nouvelle mise à jour ?", optionalIgnoreButtonLabel: "Surtout pas!",
    optionalInstallButtonLabel: "Bien sûr!"}, installMode: codePush.InstallMode.IMMEDIATE }, this.codePushStatusDidChange.bind(this),
    this.codePushDownloadDidProgress.bind(this));*/
    
  }
  /*this.position = new Animated.ValueXY(0, 0);
     this.animatedValue = new Animated.Value(0);*/
  componentWillMount() {
    
     /*  Animated.loop(
         Animated.sequence([
           Animated.timing(this.animatedValue, { toValue: 1, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
           Animated.timing(this.animatedValue, { toValue: 0, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
         ])).start();*/
     //this.toggleLike(); 
     this._onLoadStart();
   }
  /* componentDidUpdate() {
    this.position = new Animated.ValueXY(0, 0);
     this.animatedValue = new Animated.Value(0);
       Animated.loop(
         Animated.sequence([
           Animated.timing(this.animatedValue, { toValue: 1, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
           Animated.timing(this.animatedValue, { toValue: 0, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
         ])).start();
     //this.toggleLike(); 
     this._onLoadStart();
   }*/
   
   componentDidMount() {
   
     //this.syncImmediate.bind(this);
   //codePush.sync({ updateDialog: updateDialogOptions});
   }

   toggleAnimation(){
     //if (this.state.animationScanLine) {

      this.position = new Animated.ValueXY(0, 0);
      this.animatedValue = new Animated.Value(0);
      //return (
      Animated.loop(
          Animated.sequence([
            Animated.timing(this.animatedValue, { toValue: 1, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
            Animated.timing(this.animatedValue, { toValue: 0, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
          ])).start()

     // )  
    // }
    /*this.setState((state) => {
      const newLiked = !state.liked;

      if (newLiked) {
        Animated.sequence([
          Animated.spring(this.animatedValue, { toValue: 1 }),
          Animated.spring(this.animatedValue, { toValue: 0 }),
        ]).start();
      }

      return { liked: newLiked };
    });*/
  }
   
  /* codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }
       let progressView;

    if (this.state.progress) {
     progressView = (
        <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
      );
    }{progressView}*/
   
   renderOverlay = () => {
   const lineStyles = [
     styles.lineStyle,
     {
       transform: [
         {
           translateY: this.animatedValue.interpolate({
               inputRange: [0, 1],
               outputRange: [-height/2, height/2]
           })
         }
       ],
     },
   ];

   return (
      <View style={styles.overlay}>
       <Animated.View style={lineStyles} />
     </View> 
   );
  }
   
_changeStateScanline() {
       //Alert.alert("changed");
       this.setState({
         animationScanLine: !this.state.animationScanLine
       });
       
     }
   
     // Invoked when a model has started to load, we show a loading indictator.
     _onLoadStart() {
       this.setState({
         isLoading: true,
       });
     }
   
     // Invoked when a model has loaded, we hide the loading indictator.
     _onLoadEnd() {
       this.setState({
         isLoading: false,
       });
     }
     _onResetScanAr() {
       Alert.alert("reset");
       //Alert.alert(this.state.resetScene);
    /* this.setState({
        resetScene: !this.state.resetScene,
        //animationScanLine: !this.state.animationScanLine,
        viroAppProps:{...resetScene: !this.state.resetScene},
    });*/
    //this._onLoadStart();
       // this._renderTrackingScanLine();
        //this.renderOverlay();
    //Alert.alert(this.state.resetScene);
    //this.arSceneNavigator.resetARSession(true, true);
//this.resetARSession(false, true);
    }

   
     _onDisplayDialog() {
       Alert.alert(
       'Scanner un autre objet',
       'Select an object to place in the world!',
       [
         {text: 'Coffee Mug', onPress: () => this._onShowObject(0, "coffee_mug", 0)},
         {text: 'Flowers', onPress: () => this._onShowObject(1, "flowers", .290760)},
         {text: 'Smile Emoji', onPress: () => this._onShowObject(2, "smile_emoji", .497823)},
       ],
       );
     }

     _renderActivityLoader() {

        return (<View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems: 'center', justifyContent:'center'}}>
        <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff'/>
      </View>);
    
    }
     _renderTrackingScanLine() {

      this.toggleAnimation();
       // Alert.alert(this.state.viroAppProps.animationScanLine)
        return (
          
          this.renderOverlay()
          );
      

        }

  render() {

    return (
      <View style={styles.outer} >
      
      <ViroARSceneNavigator key={1} style={styles.arView}
          apiKey={apiKey}
          numberOfTrackedImages={1} 
          pbrEnabled={true} 
          videoQuality="High" 
          initialScene={{scene:InitialARScene, passProps:{animationScanLine:this.state.animationScanLine}}} 
          //initialScene={{scene:InitialARScene, passProps:{animationScanLine:this.state.animationScanLine, resetScene: this.state.resetScene}}}
          viroAppProps={ this.state.viroAppProps}
          //worldAlignment="GravityAndHeading"
          />

          { this.state.animationScanLine ? this._renderTrackingScanLine() : this._renderActivityLoader() }

          <View style={{position: 'absolute',  left: 0, right: 0, bottom: 15, alignItems: 'center'}}>
            <TouchableHighlight style={styles.buttons} 
            onPress={this._onDisplayDialog} 
            //onPress={this._onResetScanAr}
              underlayColor={'#00000000'} >
              <Image source={require("./js/res/btn_mode_objects_on.png")} />
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}
ICEar = codePush(codePushOptions)(ICEar);
//onPress={this._onResetScanAr}
export default ICEar;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },

  buttons : {
    height: 60,
    width: 60,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  lineStyle:{
    borderWidth: 4,
    borderColor:'red',
    margin:0,
    top: 0,
    width: width,
    shadowOffset:{ width: 0, height: 4, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 8,
    shadowRadius: 20 ,
    
},

overlay: {
  position:'absolute',
  left:0,
  right:0,
  top:0,
  bottom:0,
  alignItems: 'center',
  justifyContent:'center'
},
overlayHeart: {
  tintColor: '#fff',
},
});
