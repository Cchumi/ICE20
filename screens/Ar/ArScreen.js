/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import {
  AppRegistry,
  ActivityIndicator,

  Alert,
  Text,
  View,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  WebView,
  Animated,
  Dimensions,
  Linking,
  NativeModules,
  Easing,
  StatusBar,
  AsyncStorage,
  ActionSheetIOS,
  CameraRoll,
  PermissionsAndroid,
  PixelRatio,
  InteractionManager
} from 'react-native';

import {
  ViroARSceneNavigator,
  ViroConstants,
} from 'react-viro';

import TopInfo from "./components/TopInfo";
import AddButton from "../../navigation/components/AddButton";
import ScanLine from "./components/ScanLine";
import ShareScreenButton from './components/ShareScreenButtonComponent';
import SuccessAnimation from './components/SuccessAnimation';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { withNavigation, ThemeColors, SafeAreaView } from 'react-navigation';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Torch from 'react-native-torch';

import { addPortalWithIndex, removePortalWithUUID, addModelWithIndex, removeAll, removeModelWithUUID, toggleEffectSelection, changePortalLoadState, changePortalPhoto, changeModelLoadState, changeItemClickState, switchListMode, removeARObject, displayUIScreen } from '../../redux/actions';
import * as UIConstants from '../../redux/UIConstants';
import TimerMixin from 'react-timer-mixin';
import renderIf from '../../utils/helpers/renderIf';
import theme from '../../styles/theme.styles'
import Video from 'react-native-video';
//import VideoPlayer from 'react-native-video-controls';
// constants
import Share from 'react-native-share';

import SmallBubbles from './components/SmallBubbles'

var InitialARScene = require('./markers/ArResolver.js');
//var InitialARScene = require('./markers/BusinessCard.js');

import apiKey from '../../constants/viroApiKey'
////console.log(apiKey)
const kObjSelectMode = 1;
const kPortalSelectMode = 2;
const kEffectSelectMode = 3;

const kPreviewTypePhoto = 1;
const kPreviewTypeVideo = 2;
const iconStyles = {
  size: 30,
  color: 'rgba(230, 0, 126, 1)',
};


class ArScreen extends Component {
  constructor(props) {
    super(props)
    //console.log(this.props)
    this.animatedValue = new Animated.Value(0);
    this.topLeftValue = new Animated.Value(0);
    this.topCenterValue = new Animated.Value(0);
    this.topRightValue = new Animated.Value(0);
    this.requestAudioPermission = this.requestAudioPermission.bind(this);
    this.requestWriteAccessPermission = this.requestWriteAccessPermission.bind(this);
    this.requestReadAccessPermission = this.requestReadAccessPermission.bind(this);
    //this._startRecording = this._startRecording.bind(this);
    //this._stopRecording = this._stopRecording.bind(this);
    this._takeScreenshot = this._takeScreenshot.bind(this);
    this._startStopWatch = this._startStopWatch.bind(this);
    this.state = {
      skipIntro: null,
      isReady: false,
      restartAllowed: true,
      animationScanLine: true,
      trackingInitialized: false,
      resetScene: false,
      isLoading: true,
      fullscreen: false,
      videoSource: '',
      isTorchOn: false,
      hideTabBar: false,
      hideBubbles: false,
      isActive: false,
      viroAppProps: {
        data: this.props.navigation.state.params.data,//this.props.campagnes,
        materials: this.props.navigation.state.params.materials,//this.props.materials,
        animations: this.props.navigation.state.params.animations,//this.props.animations,
        //data: [],
        //materials: [],
        // animations: [],
        resetScene: false,
        displayObject: false,
        animationScanLine: true,
        yOffset: 0,
        _changeStateScanline: this._changeStateScanline,
        // _onLoadEnd: this._onLoadEnd.bind(this),
        //_onLoadStart: this._onLoadStart.bind(this),
        //_onTrackingInit:this._onTrackingInit.bind(this), 
        //_changeStateScanline: this._changeStateScanline.bind(this),
        //_renderTrackingScanLine: this._renderTrackingScanLine.bind(this), 
        //_onResetScanAr: this._onResetScanAr,
        //_onLoadVideo: this._onLoadVideo.bind(this),
      },
      //currentModeSelected: kObjSelectMode,
      videoUrl: null,
      haveSavedMedia: false,
      playPreview: false,
      //showShareScreen: false,
      //viroAppProps: {loadingObjectCallback: this._onListItemLoaded, clickStateCallback: this._onItemClickedInScene},
      showPhotosSelector: false,
      //previewType: kPreviewTypeVideo,
      lastSelectedPortalUUID: -1,
      timer: null,
      hours: '00',
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
      recordStartTimeInMillis: 0,
      cameraPermission: false,
      audioPermission: '',
      writeAccessPermission: false,
      readAccessPermission: false,
      screenshot_count: 0,
    }
  }

  _setCurrentScreen = (scene) => {
    //console.log('Current Scene:', scene)
    // InitialARScene = null
    //InitialARScene = require('./markers/ArResolver.js')
    //InitialARScene = null;
    //this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN)
    this.setState({
      isLoading: true,
      animationScanLine: false,
      isActive: false,
      trackingInitialized: false,
    }, () => {
      //InitialARScene = require('./markers/ArResolver.js');
      setTimeout(() => {
        this.setState({
          isLoading: false,
          trackingInitialized: true,
          animationScanLine: true,
          isActive: true,
        })
      }, 2000)

    });
    //console.log('Current Scene:', scene)

  }
  /*static navigationOptions = () => {
    return {
      tabBarOnPress({ navigation, defaultHandler }) {
        if (navigation.isFocused()) {
          console.log("double")
          // same tab was tapped twice
          // reset inner state
          return;
        }
        // tab was not previously focused
        defaultHandler();
      }
    };
  };*/

  async requestAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': 'Figment AR Audio Permission',
          'message': 'Figment AR App needs to access your audio ' +
            'so you can record videos with audio of ' +
            'your augmented scenes.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          audioPermission: true,
        });
      } else {
        this.setState({
          cameraPermission: false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }

  async requestWriteAccessPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Figment AR Audio Permission',
          'message': 'Figment AR App needs to access your photos / videos ' +
            'so you can record cool videos and photos of' +
            'your augmented scenes.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          writeAccessPermission: true,
        });
      } else {
        this.setState({
          writeAccessPermission: false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }

  async requestReadAccessPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Figment AR Audio Permission',
          'message': 'Figment AR App needs to access your audio ' +
            'so you can view your own images in portals.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          readAccessPermission: true,
        });
      } else {
        this.setState({
          readAccessPermission: false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }

  componentDidMount = () => {
    //console.log("did mount")
    ////console.log(this.state.viroAppProps)
    ////console.log(this.props)
    //console.log(this.state.viroAppProps)
    this.props.navigation.setParams({
      ...this.props.navigation.state.params,
      setCurrentScreen: scene => {
        this._setCurrentScreen(scene);
      }
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      //console.log('willFocus');
      this.setState({
        isLoading: false,
        trackingInitialized: true,
        animationScanLine: true,
        isActive: true,
      })
    });
    this.blurListener = navigation.addListener("willBlur", () => {
      //console.log('willBlur');
      this._exitViro();
      this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN)
      this.setState({
        isLoading: true,
        animationScanLine: false,
        isActive: false,
      })
      //InitialARScene =undefined
    });
    /*  this.setState({
        viroAppProps: {
          ...this.state.viroAppProps,
          data: this.props.campagnes,
          materials: this.props.materials,
          animations: this.props.animations,
        }
      })*/
    ////console.log('data ', JSON.stringify(this.state.viroAppProps.data))
    ////console.log('animations ', JSON.stringify(this.state.viroAppProps.animations))
    ////console.log('materials ', JSON.stringify(this.state.viroAppProps.materials))
  }

  componentDidUpdate = (prevProps) => {
    console.log("update")
    //console.log(prevProps.navigation)
    //console.log(this.props.navigation)
    /* console.log(prevProps.navigation)
     console.log(this.props.navigation)
     console.log(prevProps.navigation.isFocused())
     console.log(this.props.navigation.isFocused())
     if(prevProps.navigation.isFocused() && this.props.navigation.isFocused()) {
       console.log("same screen")
     }*/
  }


  componentWillMount() {
    /*InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({
        isArScreen: true,
      })
    })*/
  }


  componentWillUnmount = () => {
    this.focusListener.remove();
    this.blurListener.remove();
    /* InteractionManager.runAfterInteractions(() => {
       this.props.navigation.setParams({
         isArScreen: false,
       })
     })*/
  }

  _exitViro() {
    this.setState({
      trackingInitialized: false,
    });
    //this.props.navigation.goBack();
    //this.props.navigation.pop();
    //alert("exit");
  }

  /*RECORD*/
  _takeScreenshot = () => {
    // check for write permissions, if not then request
    if (!this.state.writeAccessPermission) {
      this.requestWriteAccessPermission();
    }

    this._arNavigator._takeScreenshot("figment_still_" + this.state.screenshot_count, false).then((retDict) => {
      if (!retDict.success) {
        if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
          this._displayVideoRecordAlert("Screenshot Error", "Please allow camera permissions!" + errorCode);
        }
      }
      let currentCount = this.state.screenshot_count + 1;
      this.setState({
        videoUrl: "file://" + retDict.url,
        haveSavedMedia: false,
        playPreview: true,
        previewType: kPreviewTypePhoto,
        screenshot_count: currentCount,
      });
      this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);
    });
  }

  _startRecording = () => {
    // check for audio permissions, if not then request
    if (!this.state.audioPermission) {
      this.requestAudioPermission();
    }
    //this.setState({hideBubbles: true})
    this._arNavigator._startVideoRecording("videosssss", false,
      (errorCode) => {
        this._displayVideoRecordAlert("Recording Error", "Please allow video and audio permissions!" + errorCode);
        this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN);
      });
    this.props.dispatchDisplayUIScreen(UIConstants.SHOW_RECORDING_SCREEN);

    this._startStopWatch();
  }

  // Stopwatch at the top while recording
  _startStopWatch = () => {

    let timer = TimerMixin.setInterval(() => {

      var seconds = (Number(this.state.seconds) + 1).toString(),
        minutes = this.state.minutes,
        hours = this.state.hours;

      if (Number(this.state.seconds) == 59) {
        minutes = (Number(this.state.minutes) + 1).toString();
        seconds = '00';
      }

      if (Number(this.state.minutes) == 59) {
        hours = (Number(this.state.hours) + 1).toString();
        minutes = '00';
        seconds = '00';
      }

      this.setState({
        hours: hours.length == 1 ? '0' + hours : hours,
        minutes: minutes.length == 1 ? '0' + minutes : minutes,
        seconds: seconds.length == 1 ? '0' + seconds : seconds,
      });
    }, 1000);
    this.setState({
      timer: timer,
      recordStartTimeInMillis: (new Date).getTime(),
    });
  }

  _stopRecording = async () => {
    const recordTimeInMillis = (new Date).getTime() - this.state.recordStartTimeInMillis;
    await this._arNavigator._stopVideoRecording()
      .then((retDict) => {
        //console.log(retDict)
        if (!retDict.success) {
          if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
            this._displayVideoRecordAlert("Recording Error", "Please allow camera record permissions!" + errorCode);
          }
        }
        this.setState({
          videoUrl: "file://" + retDict.url,
          haveSavedMedia: false,
          playPreview: false,
          previewType: kPreviewTypeVideo,
        });
        this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);
        //this.setState({hideBubbles: true})
        // Stop stop watch at the top
        clearInterval(this.state.timer);
        this.setState({
          hours: '00',
          minutes: '00',
          seconds: '00',
          miliseconds: '00',
        });
      });
  }

  _saveToCameraRoll = () => {
    if (this.state.videoUrl != undefined && !this.state.haveSavedMedia) {
      this.setState({
        haveSavedMedia: true
      })
    }
    CameraRoll.saveToCameraRoll(this.state.videoUrl);
  }

  _displayVideoRecordAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN) },
      ],
      { cancelable: false }
    )
  }
  // Render UI for Video Recording and taking Screenshots
  _renderRecord = () => {
    var recordViews = [];
    // Recording time at top of the screen showing video length
    if (this.props.currentScreen == UIConstants.SHOW_RECORDING_SCREEN) {
      recordViews.push(
        <View key="record_timeline" style={{ position: 'absolute', backgroundColor: '#00000066', left: 0, right: 0, top: 0, height: 64, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.recordingTimeText}>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</Text>
        </View>
      );
    }

    return recordViews;
  }

  _renderVideo = () => {

    return (
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', zIndex: 999 }}>
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
          <Icon name={"closecircleo"} type={'antdesign'} size={30} />
          {/*<Image style={styles.videocloseimage} source={require("./js/res/btn_close_video.png")} />*/}
        </TouchableHighlight>
      </View>

    );
  }
  onBuffer = () => {
    //alert('buffer')
  }
  async _openShareActionSheet() {
    let contentType = this.state.previewType == kPreviewTypeVideo ? 'video/mp4' : 'image/png';
    await Share.open({
      subject: "#ICE 2.0 AR",
      message: "#ICE 2.0 AR",
      url: this.state.videoUrl,
      type: contentType,
    });
  }

  videoError = () => {
    //alert('error')
  }
  // Render UI for Share Screen, shown after taking a video / image screenshot
  _renderShareScreen = () => {
    // alert(this.props.currentScreen);
    //alert(this.props.currentScreen);
    if (this.props.currentScreen == UIConstants.SHOW_SHARE_SCREEN) {
      /* this.setState({
         //loading: true,
         isLoading: true,
         animationScanLine: false,
         //resetScene: true
       })*/
      //alert(this.props.showShareScreen);
      //if(this.props.showShareScreen) {
      //alert(this.props.currentScreen);
      return (
        <View style={styles.shareScreenContainerTransparent} >
          {/* If previewType == photo, show the image on share screen*/}
          {renderIf(this.state.previewType == kPreviewTypePhoto,
            <Image source={{ uri: this.state.videoUrl }} style={styles.backgroundImage} resizeMethod={'resize'} />)}

          {/* If previewType == video, play the video on share screen*/}
          {/* With react-native-video, if you turn repeat to true and then onEnd pause
            the video, you'll end up with black screen. So we set repeat to false
            and instead seek to 0 when we want to play the video again (seeking will auto start
            the video player too*/}
          {renderIf(this.state.previewType == kPreviewTypeVideo,
            <Video
              ref={(ref) => { this.player = ref }}
              source={{ uri: this.state.videoUrl }}
              paused={!this.state.playPreview}
              repeat={false}
              style={styles.backgroundVideo}
              onBuffer={(e) => console.log(e)
              }
              onError={(e) => console.log(e)
              }           // Callback when remote video is buffering
            //onError={this.videoError} 
            //onEnd={() => { this.setState({ playPreview: false }) }}
            />
          )}

          {/* Overlay Play button on top of video, after playing it once. Clicking this button would seek video to 0 and play it again */}
          {renderIf(!this.state.playPreview && (this.state.previewType == kPreviewTypeVideo),
            <View style={{
              position: 'absolute', flex: 1, flexDirection: 'column',
              width: 90, top: 0, bottom: 0,
              alignItems: 'center', justifyContent: 'center'
            }}>
              <ShareScreenButton onPress={() => { this.player.seek(0); this.setState({ playPreview: true }) }}
                buttonState={'off'}
                stateImageArray={["playcircleo", "playcircleo"]}
                colorIcon={theme.PRIMARY_INACTIVE_COLOR}
                sizeIcon={50}
                type={'antdesign'}
                style={styles.previewScreenButtonClose} />
            </View>
          )}

          {/* Close button -> Takes user back to main screen */}
          <View style={{ position: 'absolute', flex: 1, flexDirection: 'row', left: 5, top: 30, justifyContent: 'flex-end', alignItems: 'flex-end', height: 30, width: 30 }}>
            {<ShareScreenButton onPress={() => { this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN) }}
              buttonState={'off'}
              stateImageArray={["closecircleo", "closecircleo"]}
              colorIcon={theme.PRIMARY_INACTIVE_COLOR}
              sizeIcon={30}
              type={'antdesign'}
              style={styles.previewScreenButtonClose} />}
          </View>

          {/* Button to save media to camera roll */}
          <View style={{ position: 'absolute', left: 20, bottom: 50, width: 30, height: 60 }}>
            {<ShareScreenButton onPress={() => { this._saveToCameraRoll() }}
              buttonState={this.state.haveSavedMedia ? 'on' : 'off'}
              stateImageArray={["clouddownload", "clouddownload"]}
              colorIcon={theme.PRIMARY_INACTIVE_COLOR}
              sizeIcon={30}
              type={'antdesign'}
              style={styles.previewScreenButtonShare} />}
          </View>

          {/* Save to media operation success indicator */}
          {renderIf(this.state.haveSavedMedia,
            <SuccessAnimation onPress={() => { }}
              //stateImageArray={[require("./js/res/controls/play.png")]}
              stateImageArray={["checkcircleo", "checkcircleo"]}
              colorIcon={theme.PRIMARY_INACTIVE_COLOR}
              sizeIcon={30}
              type={'antdesign'}
              style={styles.previewSavedSuccess} />
          )}

          {/* Share button -> Opens Share Action Sheet to enable user to share media to their social media destination of choice */}
          <View style={{ position: 'absolute', right: 20, bottom: 50, width: 30, height: 60 }}>
            {<ShareScreenButton onPress={() => { this._openShareActionSheet() }}
              buttonState={'off'}
              stateImageArray={["sharealt", "sharealt"]}
              colorIcon={theme.PRIMARY_INACTIVE_COLOR}
              sizeIcon={30}
              type={'antdesign'}
              style={styles.previewScreenButtonShare} />}
          </View>
        </View>
      )
    }
  }

  _renderActivityLoader = () => {
    return (
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff' />
      </View>);

  }


  _changeStateScanline = () => {
    //Alert.alert("changed");
    this.setState({
      //isLoading: !this.state.isLoading,
      animationScanLine: false,
    })
  }
  _setARNavigatorRef = (ARNavigator) => {
    this._arNavigator = ARNavigator;
  }

  render() {
    //console.log(this.props)
    //console.log(this.state.viroAppProps)
    const { campagnes, materials, animations } = this.props
    //const { navigation } = this.props;
    //const parent = navigation.dangerouslyGetParent();
    ////console.log(parent)
    ////console.log(this.props.navigation.state.params.data)
    ////console.log(this.props)
    //const itemprops = navigation.getParam('itemDetail', 'NO-ID');
    // //console.log(itemprops)
    return (
      <View style={styles.flex}>

        <StatusBar barStyle="light-content" />
        {!this.state.viroAppProps.data && !this.state.trackingInitialized ? this._renderActivityLoader() :

          <View style={styles.flex}>
            {this.state.trackingInitialized ?
              <ViroARSceneNavigator
                //key={1} 
                style={styles.arView}
                //apiKey={apiKey}
                numberOfTrackedImages={3}
                //bloomEnabled={false}
                autofocus={true}
                videoQuality="High"
                //hdrEnabled={false}
                ref={this._setARNavigatorRef}
                //numberOfTrackedImages={this.props.products.config.numberOfTrackedImages}
                //autofocus={this.props.products.config.autofocus}
                //videoQuality={this.props.products.config.videoQuality}
                //numberOfTrackedImages={products.config.numberOfTrackedImages} 
                //ref={this._setARNavigatorRef}
                //autofocus={this.props.products.config.autofocus}
                //videoQuality={this.props.products.config.videoQuality}
                initialScene={{
                  scene: InitialARScene,
                  //passProps: {
                  //animationScanLine: this.state.animationScanLine,
                  //resetScene: this.state.resetScene,
                  //data: this.props.campagnes,
                  //materials: this.props.materials,
                  //animations: this.props.animations
                  // }
                }}
                //viroAppProps={{ ...this.state.viroAppProps, data: this.props.campagnes }}
                viroAppProps={this.state.viroAppProps}
              /> : <Text>Null</Text>}
            {/* AR Initialization animation shown to the user for moving device around to get AR Tracking working*/}

            {this.state.animationScanLine && <ScanLine />
            }

            {/* 2D UI for sharing rendered after user finishes taking a video / screenshot */}
            {/*this._renderShareScreen()*/}
            {/* Buttons and their behavior for recording videos and screenshots at the bottom of the screen */}
            {this._renderRecord()}
            {this.state.fullscreen ? this._renderVideo() : null}
            {/*this.state.fullscreen ? this._renderVideo() : null*/}
            {this._renderRecord()}

            <TopInfo />
            {this._renderShareScreen()
            }

          </View>
        }
        {!this.state.hideBubbles &&
          <SmallBubbles takeScreenshot={this._takeScreenshot} onRecordStart={this._startRecording} onRecordStop={this._stopRecording} />
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#000000',
  },
  arView: {
    flex: 1,
    zIndex: 1,
  },
  previewPlayButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 90,
  },
  previewPlayButton: {
    position: 'absolute',
    height: 90,
    width: 90,
    left: 0,
    alignSelf: 'center',
  },
  previewSavedSuccess: {
    position: 'absolute',
    height: 115,
    width: 100,
    alignSelf: 'center',
  },
  shareScreenContainerTransparent: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 999
  },
  recordingTimeText: {
    textAlign: 'center',
    color: theme.WHITE,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'stretch',
  },
  previewScreenButtonShare: {
    position: 'absolute',
    height: 35,
    width: 35,
  },
  previewScreenButtonClose: {
    position: 'absolute',
    height: 35,
    width: 35,
  },
  videoclose: {
    height: 30,
    width: 30,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  videocloseimage: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state, store) => {
  return {
    //auth: state.firebase.auth,
    /*profile: state.firebase.profile,
    campagnes: state.firestore.ordered.campagnes,*/
    currentScreen: state.ui.currentScreen,
    campagnes: state.firestore.ordered.campagnes,
    animations: state.firestore.ordered.animations,
    materials: state.firestore.ordered.materials,
    // campagnes: state.firestore.ordered.campagnes,
    //materials: state.firestore.ordered.materials,
    //animations: state.firestore.ordered.animations,
    // listMode: store.ui.listMode,
    // listTitle: store.ui.listTitle,
    // currentItemSelectionIndex: store.ui.currentItemSelectionIndex,
    //  currentItemClickState: store.ui.currentItemClickState,
    // currentSelectedItemType: store.ui.currentSelectedItemType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDisplayUIScreen: (uiScreenState) => dispatch(displayUIScreen(uiScreenState)),
  }
}



export default compose(
  //firestoreConnect(),
  /*firestoreConnect(props => {
    return [
      {
        collection: 'campagnes',
      },
      {
        collection: 'animations',
      },
      {
        collection: 'materials',
      },
    ]
  }),*/
  //firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(ArScreen)

//export default ArScreen;
