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
  Alert,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
  Platform,
  WebView,
  Animated,
  Dimensions,
  Linking,
  Easing} from 'react-native';
import codePush from "react-native-code-push";
import AppIntro from 'react-native-app-intro';
import { Navigation } from 'react-native-navigation';
import {
  ViroARSceneNavigator,
} from 'react-viro';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import RNRestart from 'react-native-restart';
import renderIf from './js/helpers/renderIf';
import Torch from 'react-native-torch';


var apiKey = "381814B3-73D4-4B04-B481-FB85528A89BE";

//import renderscene from './js/Arscene';
//var InitialARScene = require('./js/ArMultiMarker/MultiMarker');
var InitialARScene = require('./js/Markers/Markers');
//var InitialARScene = require('./js/ARBusinessCard/BusinessCard');

var {
  width,
  height
} = Dimensions.get('window');


//type Props = {};
class App extends Component{
  constructor(props) {
    super(props);
    this._renderTrackingScanLine = this._renderTrackingScanLine.bind(this);
    this._changeStateScanline = this._changeStateScanline.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
    //this._onDisplayDialog = this._onDisplayDialog.bind(this);
    this._onResetScanAr = this._onResetScanAr.bind(this);
    this._onLoadVideo = this._onLoadVideo.bind(this);
    this._renderVideo = this._renderVideo.bind(this);
    this._renderResetButton = this._renderResetButton.bind(this);
    this._handlePressTorch = this._handlePressTorch.bind(this);
    this._renderBottomElements = this._renderBottomElements.bind(this);
    
    // Set initial state here
    this.state = {
      restartAllowed: true,
      animationScanLine : false,
      resetScene: false,
      isLoading: false,
      fullscreen: false,
      videoSource:'',
      isTorchOn: false,
      viroAppProps: {
        resetScene: false ,
        displayObject:false, 
        animationScanLine : true, 
        yOffset:0, 
        _onLoadEnd: this._onLoadEnd, 
        _onLoadStart: this._onLoadStart, 
        _onTrackingInit:this._onTrackingInit, 
        _changeStateScanline:this._changeStateScanline, 
        _renderTrackingScanLine: this._renderTrackingScanLine, 
        _onResetScanAr: this._onResetScanAr,
        _onLoadVideo: this._onLoadVideo
      },
    };

    
  }
  /*this.position = new Animated.ValueXY(0, 0);
     this.animatedValue = new Animated.Value(0);*/
  componentWillMount() {
    //CodePush.disallowRestart();
    //Alert.alert("mounted cool vite OK OK MAINTENANT CA MARCHE !!!!!");
/*CodePush.sync(
{
deploymentKey: 'giMb817KrtTFkIuOg4i5ohnEUDyoBJvD1i-VN',
updateDialog: true,
installMode: CodePush.InstallMode.IMMEDIATE,
},
this.CodePushStatusDidChange.bind(this),
this.CodePushDownloadDidProgress.bind(this)
);*/
     /*  Animated.loop(
         Animated.sequence([
           Animated.timing(this.animatedValue, { toValue: 1, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
           Animated.timing(this.animatedValue, { toValue: 0, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
         ])).start();*/
     //this.toggleLike(); 
     //CodePush.notifyApplicationReady();
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
  /*  var updateDialogOptions = {
      updateTitle: "You have an update",
      optionalUpdateMessage: "Update available. Install?",
      optionalIgnoreButtonLabel: "Nop",
      optionalInstallButtonLabel: "Yep",
  };

  codePush.sync({ updateDialog: updateDialogOptions}
  );*/
  codePush.notifyApplicationReady();
  //codePush.sync();
    //CodePush.allowRestart();

//CodePush.notifyAppReady();
     //this.syncImmediate.bind(this);
    // CodePush.sync();
   //CodePush.sync({ updateDialog: updateDialogOptions});
   }

   /*CodePushStatusDidChange(status) {
    switch(status) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log("Checking for updates.");
            break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log("Downloading package.");
            break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log("Installing update.");
            break;
        case CodePush.SyncStatus.UP_TO_DATE:
            console.log("Up-to-date.");
            break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log("Update installed.");
            break;
    }
   }*/

/*CodePushDownloadDidProgress(progress) {
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
}*/

   toggleAnimation(){
     //if (this.state.animationScanLine) {

      this.position = new Animated.ValueXY(0, 0);
      this.animatedValue = new Animated.Value(0);
      //return (
      Animated.loop(
          Animated.sequence([
            Animated.timing(this.animatedValue, { toValue: 1, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
            Animated.timing(this.animatedValue, { toValue: 0, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
          ])).start();

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
   
  /* CodePushStatusDidChange(syncStatus) {
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

  CodePushDownloadDidProgress(progress) {
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
  onEndVideo = () => {
    this.setState({
      fullscreen: !this.state.fullscreen
    });
    this.player.dismissFullscreenPlayer();
   //Alert.alert("changed");
   /* Orientation.lockToPortrait();
    this.setState({
      video_url: "",
      paused: true
    });*/
  };
  _onLoadVideo(vidUrl) {
    //Alert.alert("Video Function " + vidUrl);
    this.setState({
      videoSource: vidUrl,
     fullscreen: !this.state.fullscreen
     
    });
    
  }
   
    _changeStateScanline() {
       //Alert.alert("changed");
       this.setState({
        //isLoading: !this.state.isLoading,
        animationScanLine: false,
       });
       
     }
   
     // Invoked when a model has started to load, we show a loading indictator.
     _onLoadStart() {
       this.setState({
         isLoading: true,
         animationScanLine: false
       });
     }
   
     // Invoked when a model has loaded, we hide the loading indictator.
     _onLoadEnd() {
       this.setState({
         isLoading: false,
         animationScanLine: true
       });
     }
     _onResetScanAr() {
     /* this.setState({
        resetScene: !this.state.resetScene,
       });*/
       //this.props.sceneNavigator.viroAppProps={resetScene:true};
      // this.props.sceneNavigator.viroAppProps={animationScanLine:true};
      //this._changeStateScanline();
      RNRestart.Restart();
      /*this.setState({
        viroAppProps:{...this.state.viroAppProps, resetScene: !this.state.viroAppProps.resetScene},
    });*/


    }
    _renderVideo() {
      return (
        <View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems: 'center'}}>
          <Video 
            source={{
              uri: this.state.videoSource,
              headers: {
                Authorization: 'bearer some-token-value',
                'X-Custom-Header': 'some value'
              }
            }} 
            fullscreen={this.state.fullscreen}
            controls={true} 
            rate={1.0}
            volume={1.0}
            muted={false}
            resizeMode={"cover"}
            style={styles.backgroundVideo} 
            //fullscreenOrientation={'landscape'} 
            ref={r => this.player = r}
          />
          <TouchableHighlight style={styles.videoclose} 
            onPress={this.onEndVideo}
            underlayColor={'#00000000'} >
            <Image style={styles.videocloseimage}  source={require("./js/res/btn_close_video.png")} />
          </TouchableHighlight>
        </View>
       
      );
    }
    _renderBottomElements() {
      return (
      <View style={{position: 'absolute', flex:1, flexDirection:'row', left: -60, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: 'rgba(230, 0, 126, 0.5)'}}>
        <View style={{position:'absolute', flex:1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: 80, height: 80, top:0}}>
          {renderIf(!this.state.animationScanLine,
            this._renderResetButton()
          )}
        </View>
        <View style={{flex:1, position: 'absolute', flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: 25, height: 25, bottom:0, transform: [{'translate': [80,0, 0]}]}}>
          {this._renderFlashButton()}
        </View>
      </View>
      );
    }
    _renderFlashButton() {
      return (
          <TouchableHighlight
            onPress={this._handlePressTorch}
            underlayColor={'#00000000'} >
            <View>
              <Image source={this.state.isTorchOn ? require("./js/res/flashOn.png") : require("./js/res/flashOff.png")} style={styles.buttonFlashIcon}/>
            </View>
          </TouchableHighlight>
        
      );
     }  
     _handlePressTorch() {
      const { isTorchOn } = this.state;
      Torch.switchState(!isTorchOn);
      this.setState({ isTorchOn: !isTorchOn });
    }
    /* _onDisplayDialog() {
       Alert.alert(
       'Scanner un autre objet',
       'Select an object to place in the world!',
       [
         {text: 'Coffee Mug', onPress: () => this._onShowObject(0, "coffee_mug", 0)},
         {text: 'Flowers', onPress: () => this._onShowObject(1, "flowers", .290760)},
         {text: 'Smile Emoji', onPress: () => this._onShowObject(2, "smile_emoji", .497823)},
       ],
       );
     }*/
     _renderResetButton() {

      return (
          <TouchableHighlight
            onPress={this._onResetScanAr}
            underlayColor={'#00000000'} >
            <View>
              <Image source={require("./js/res/camera.png")} style={styles.buttonResetIcon} />
            </View>
          </TouchableHighlight>
      );
     }
     _renderActivityLoader() {
      return (
        <View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems: 'center', justifyContent:'center'}}>
          <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff'/>
        </View>);
    
    }
     _renderTrackingScanLine() {
      this.toggleAnimation();
        return (
          this.renderOverlay()
          );
        }

  render() {
    return (
      <View style={styles.outer} >

       <ViroARSceneNavigator key={1} style={styles.arView}
          apiKey={apiKey}
          numberOfTrackedImages={3} 
          autofocus={true}
          videoQuality="High"
          initialScene={{scene:InitialARScene, passProps:{animationScanLine:this.state.animationScanLine, resetScene: this.state.resetScene}}}
          viroAppProps={ this.state.viroAppProps}
        />

        { /*this.state.animationScanLine ? this._renderTrackingScanLine() : this._renderActivityLoader()*/ }
        { this.state.isLoading ? this._renderActivityLoader() : null }
        { this.state.animationScanLine ? this._renderTrackingScanLine() : null }
        { this._renderBottomElements() }
        { /*!this.state.animationScanLine ? this._renderResetButton() : null */}
        { /*this._renderFlashButton() */}
        { this.state.fullscreen ? this._renderVideo() : null }

      </View>
    );
  }
}
//App = CodePush(CodePushOptions)(App);
//App = CodePush(App);
//const MyApp = CodePush(CodePushOptions)(App);
//export default MyApp;
export default App;

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
  bottomBar: {
    position: 'absolute', 
    flex:1, 
    flexDirection:'row', 
    left: 0, 
    right: 0, 
    top: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 50,
    backgroundColor: 'rgba(230, 0, 126, 0.8)',
  },
  buttonReset : {
    position:'absolute', 
    flex:1, 
    flexDirection:'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width:80, 
    height: 80, 
    left:0, 
    bottom:5
  },
  buttonFlash : {
    flex:1, 
    position: 'absolute', 
    flexDirection:'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width:30, 
    height: 30, 
    right:0, 
    bottom:5, 
    transform: [{'translate': [0 ,0, 0]}]
  },
  buttonResetIcon: {
    position : 'absolute',
    height: 80,
    width: 80,
    bottom: 0,
    left: 0,
  },
  buttonFlashIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    bottom: 0,
    left: 0,
  },
  videoclose : {
    height: 30,
    width: 30,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  videocloseimage: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent:'center'
  },
  lineStyle:{
    borderWidth: 4,
    borderColor:'rgba(230, 0, 126, 1)',
    margin:0,
    top: 0,
    width: width,
    shadowOffset:{ width: 0, height: 2, },
    shadowColor: 'white',
    shadowOpacity: 1.0,
    elevation: 8,
    shadowRadius: 20 
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
  backgroundVideo: {
    /*width: width,
    height: height,*/
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent:'center',
    //zIndex: 9999
  },
});
