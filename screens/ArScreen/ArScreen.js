import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  AppRegistry,
  ActivityIndicator,
  Alert,
  Text,
  View,
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
  Easing,
  StatusBar,
  AsyncStorage,
  ActionSheetIOS,
  CameraRoll,
  PermissionsAndroid,
  PixelRatio,
} from 'react-native';

var {
  width,
  height
} = Dimensions.get('window');
import { withNavigation, NavigationEvents, NavigationActions } from 'react-navigation';

//GLOBAL = require('../../global/global');
import Icon from 'react-native-vector-icons/Ionicons';
const iconStyles = {
  size: 30,
  color: 'rgba(230, 0, 126, 1)',
};
import TopInfo from "./components/TopInfo";
import AddButtons from "../../navigation/components/AddButton";
import ScanLine from "./components/ScanLine";
import codePush from "react-native-code-push";
//import * as UIConstants from './components/UIConstants';

import { connect } from 'react-redux';
import { addPortalWithIndex, removePortalWithUUID, addModelWithIndex, removeAll, removeModelWithUUID, toggleEffectSelection, changePortalLoadState, changePortalPhoto, changeModelLoadState, changeItemClickState, switchListMode, removeARObject, displayUIScreen } from '../../js/redux/actions';
import { fetchProductsConfig, fetchProductsAffiche } from '../../js/redux/actions/productActions';
import TimerMixin from 'react-timer-mixin';
import ShareScreenButton from './components/ShareScreenButtonComponent';
import SuccessAnimation from './components/SuccessAnimation';
import * as UIConstants from '../../js/redux/UIConstants';


const kObjSelectMode = 1;
const kPortalSelectMode = 2;
const kEffectSelectMode = 3;

const kPreviewTypePhoto = 1;
const kPreviewTypeVideo = 2;
//Icon.loadFont();

import {
  ViroARSceneNavigator,
  ViroConstants,
} from 'react-viro';

import renderIf from './js/helpers/renderIf';
import Torch from 'react-native-torch';
import Share from 'react-native-share';
import RNRestart from 'react-native-restart';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
var apiKey = "381814B3-73D4-4B04-B481-FB85528A89BE";

var InitialARScene = require('./js/Markers/Markers');

class ArScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false,//this.state.hideTabBar,
    //animationEnabled: true

  });

  constructor(props) {
    super(props);
    props.navigation.setParams({
      onPhotoClick: this.handlePhotoClick,
      onRecordStartClick: this.handleRecordStartClick,
      onRecordStopClick: this.handleRecordStopClick
    });
    this.props.showShareScreen = false;
    this.state = {
      skipIntro: null,
      isReady: false,
      restartAllowed: true,
      animationScanLine: true,
      resetScene: false,
      isLoading: true,
      fullscreen: false,
      videoSource: '',
      isTorchOn: false,
      hideTabBar: false,
      viroAppProps: {
        data: [],
        resetScene: false,
        displayObject: false,
        animationScanLine: true,
        yOffset: 0,
        _onLoadEnd: this._onLoadEnd.bind(this),
        _onLoadStart: this._onLoadStart.bind(this),
        //_onTrackingInit:this._onTrackingInit.bind(this), 
        _changeStateScanline: this._changeStateScanline.bind(this),
        //_renderTrackingScanLine: this._renderTrackingScanLine.bind(this), 
        //_onResetScanAr: this._onResetScanAr,
        _onLoadVideo: this._onLoadVideo.bind(this),
      },
      currentModeSelected: kObjSelectMode,
      videoUrl: null,
      haveSavedMedia: false,
      playPreview: false,
      //showShareScreen: false,
      //viroAppProps: {loadingObjectCallback: this._onListItemLoaded, clickStateCallback: this._onItemClickedInScene},
      showPhotosSelector: false,
      previewType: kPreviewTypeVideo,
      lastSelectedPortalUUID: -1,
      timer: null,
      hours: '00',
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
      recordStartTimeInMillis: 0,
      cameraPermission: false,
      audioPermission: false,
      writeAccessPermission: false,
      readAccessPermission: false,
      screenshot_count: 0,
    }
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
    this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
    this._takeScreenshot = this._takeScreenshot.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleRecordStartClick = this.handleRecordStartClick.bind(this);
    this.handleRecordStopClick = this.handleRecordStopClick.bind(this);
    this.requestAudioPermission = this.requestAudioPermission.bind(this);
    this.requestWriteAccessPermission = this.requestWriteAccessPermission.bind(this);
    this.requestReadAccessPermission = this.requestReadAccessPermission.bind(this);
    this._renderShareScreen = this._renderShareScreen.bind(this);
    this._saveToCameraRoll = this._saveToCameraRoll.bind(this);
    this._startRecording = this._startRecording.bind(this);
    this._stopRecording = this._stopRecording.bind(this);
    this._startStopWatch = this._startStopWatch.bind(this);
    this._renderRecord = this._renderRecord.bind(this);
    this._onLoadVideo = this._onLoadVideo.bind(this);
    this._renderVideo = this._renderVideo.bind(this);
    // this._onResetScanAr = this._onResetScanAr.bind(this);
    // this.createClass = this.createClass.bind(this);
    //this._renderTopInfo = this._renderTopInfo.bind(this);
    //this._handlePressTopInfo = this._handlePressTopInfo.bind(this);

  }
  handlePhotoClick = () => {
    //this.props.sceneNavigator._takeScreenshot("figment_still_", true);
    //this._arScene._takeScreenshot("figment_still_", true);
    this._takeScreenshot();
    //alert('test');
    // perform your logic here
  }
  handleRecordStartClick = () => {
    this._startRecording();
    //this.props.sceneNavigator._takeScreenshot("figment_still_", true);
    //this._arScene._takeScreenshot("figment_still_", true);
    //alert('test');
    // perform your logic here
  }
  handleRecordStopClick = () => {
    this._stopRecording();
    //this.props.sceneNavigator._takeScreenshot("figment_still_", true);
    //this._arScene._takeScreenshot("figment_still_", true);
    //alert('test');
    // perform your logic here
  }
  onEndVideo = () => {
    /*const setParamsAction = NavigationActions.setParams({
      params: {hideTabBar: false}
    });
    this.props.navigation.dispatch(setParamsAction);*/
    this.setState({
      fullscreen: !this.state.fullscreen,
      hideTabBar: false,
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
    /*const setParamsAction = NavigationActions.setParams({
      params: {hideTabBar: true}
    });
    this.props.navigation.dispatch(setParamsAction);*/
    //Alert.alert("Video Function " + vidUrl);
    this.setState({
      hideTabBar: true,
      videoSource: vidUrl,
      fullscreen: !this.state.fullscreen

    });

  }

  _renderVideo() {
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
          <Image style={styles.videocloseimage} source={require("./js/res/btn_close_video.png")} />
        </TouchableHighlight>
      </View>

    );
  }

  async _getStorageValue() {
    AsyncStorage.getItem('@ICE20:IsArScreen').then(value => { alert(value) })
    //let value = await AsyncStorage.getItem('@ICE20:IsArScreen')
    //return value
  }
  _takeScreenshot() {
    //alert(this.props.currentScreen);
    // check for write permissions, if not then request
    if (!this.state.writeAccessPermission) {
      this.requestWriteAccessPermission();
    }
    this._arNavigator._takeScreenshot("ICE_2.0_still_" + this.state.screenshot_count, false).then((retDict) => {
      if (!retDict.success) {
        if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
          this._displayVideoRecordAlert("Screenshot Error", "Please allow camera permissions!" + errorCode);
        }
      }
      let currentCount = this.state.screenshot_count + 1;
      this.setState({
        videoUrl: "file://" + retDict.url,
        haveSavedMedia: false,
        playPreview: false,
        previewType: kPreviewTypePhoto,
        screenshot_count: currentCount,
      });
      /*this.setState({
        showShareScreen: true,
      });*/
      // this.props.showShareScreen = true;
      this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);
      //const showShareScreen = true;
    });
  }

  async requestAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': 'ICE 2.0 AR Audio Permission',
          'message': 'ICE 2.0 AR App needs to access your audio ' +
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
          'title': 'ICE 2.0 AR Audio Permission',
          'message': 'ICE 2.0 AR App needs to access your photos / videos ' +
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
          'title': 'ICE 2.0 AR Audio Permission',
          'message': 'ICE 2.0 AR App needs to access your audio ' +
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

    /*setTimeout(() => {
      this.setState({

        isLoading: false,

      })
      }, 3000);*/
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log('didFocus');

     /* this.setState({
        loading: false,
        isLoading: false,
        animationScanLine: true,
        resetScene: false
      })*/
      // The screen is focused
      // Call any action
    });
    this.blurListener = navigation.addListener("didBlur", () => {
      console.log('didBlur');
     /* this.setState({
        loading: true,
        isLoading: true,
        animationScanLine: false,
        resetScene: true
      })*/
      // The screen is focused
      // Call any action
    });
    /* this.props.navigation.addListener(
       'didFocus',
       payload => {
         this.setState({
           loading: false
         })
         console.debug('didFocus', payload);
       }
     );
     this.props.navigation.addListener(
       'didBlur',
       payload => {
         this.setState({
           loading: true
         })
         console.debug('didBlur', payload);
       }
     );*/
    //this.props.navigation.setParams({ name: 'Lucy' });
    /* this.props.navigation.setParams({
       key1: 'value1',
       key2: 'value2',
     })*/
    //this.props.fetchProductsConfig();
    /* setTimeout(
       () => { 
         this.props.fetchProductsAffiche(); },
       100
     )*/
    //this.props.fetchProductsAffiche();
    /*this.setState({
      data: products.markers,
    })*/
    //this.props.dispatch(fetchProductsConfig());
  }
  componentDidUpdate = () => {
    //console.log(this.props.navigation.getParam('products', ''));
    //console.log(this.props.products);
  }
  componentWillMount() {
    //const { name } = this.props.navigation.state.params;
    /* const name = this.props.navigation.getParam('name', 'Peter');
     console.log('1', this.props.navigation.state.params);
         this.props.navigation.setParams({ realtebo: 2 });
         console.log('2', name);*/
    /* const setParamsAction = NavigationActions.setParams({
       params: {hideTabBar: false}
     });
 
     this.props.navigation.dispatch(setParamsAction);
     console.log(this.props.navigation);*/
    this._onLoadStart();
  }

  componentWillUnmount() {
    // Remove the event listener
    //this.focusListener.remove();
    //this._arNavigator.resetaScene(true, true)
    //this.arSceneNavigator.resetARSession(true, true)
    /*this.setState({
      loading: true,
      isLoading: true,
      animationScanLine: false,
      resetScene: true
    })*/
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
      //isLoading: false,
      animationScanLine: true
    });
  }

  _renderActivityLoader() {
    return (
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff' />
      </View>);

  }
  _changeStateScanline() {
    //Alert.alert("changed");
    this.setState({
      //isLoading: !this.state.isLoading,
      animationScanLine: false,
    })
  }
  _setARNavigatorRef(ARNavigator) {
    this._arNavigator = ARNavigator;
  }

  // Render UI for Share Screen, shown after taking a video / image screenshot
  _renderShareScreen() {
    // alert(this.props.currentScreen);
    //alert(this.props.currentScreen);
    if (this.props.currentScreen == UIConstants.SHOW_SHARE_SCREEN) {
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
            <Video ref={(ref) => { this.player = ref }}
              source={{ uri: this.state.videoUrl }} paused={!this.state.playPreview}
              repeat={false} style={styles.backgroundVideo}
              onEnd={() => { this.setState({ playPreview: false }) }} />
          )}

          {/* Overlay Play button on top of video, after playing it once. Clicking this button would seek video to 0 and play it again */}
          {renderIf(!this.state.playPreview && (this.state.previewType == kPreviewTypeVideo),
            <View style={{
              position: 'absolute', flex: 1, flexDirection: 'column',
              width: 90, top: 0, bottom: 0,
              alignItems: 'center', justifyContent: 'center'
            }}>
              <TouchableOpacity onPress={() => { this.player.seek(0); this.setState({ playPreview: true }) }} style={styles.previewPlayButtonContainer} underlayColor="#00000000">
                <Icon name="ios-play-circle" size={50} />
                {/*<Image source={require("./js/res/controls/play.png")} style={styles.previewPlayButton} />*/}
              </TouchableOpacity>
            </View>
          )}

          {/* Close button -> Takes user back to main screen */}
          <View style={{ position: 'absolute', left: 20, top: 0, width: 60, height: 60 }}>
            {<ShareScreenButton onPress={() => { this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN) }}
              buttonState={'off'}
              stateImageArray={["ios-close", "ios-close"]}
              colorIcon={'rgba(255, 255, 255, 1)'}
              sizeIcon={50}
              style={styles.previewScreenButtonClose} />}
          </View>

          {/* Button to save media to camera roll */}
          <View style={{ position: 'absolute', left: 20, bottom: 50, width: 30, height: 60 }}>
            {<ShareScreenButton onPress={() => { this._saveToCameraRoll() }}
              buttonState={this.state.haveSavedMedia ? 'on' : 'off'}
              stateImageArray={["ios-cloud-download", "ios-cloud-download"]}
              colorIcon={'rgba(255, 255, 255, 1)'}
              sizeIcon={30}
              style={styles.previewScreenButtonShare} />}
          </View>

          {/* Save to media operation success indicator */}
          {renderIf(this.state.haveSavedMedia,
            <SuccessAnimation onPress={() => { }}
              //stateImageArray={[require("./js/res/controls/play.png")]}
              stateImageArray={["ios-checkbox-outline"]}
              colorIcon={'rgba(255, 255, 255, 1)'}
              sizeIcon={'30'}
              style={styles.previewSavedSuccess} />
          )}

          {/* Share button -> Opens Share Action Sheet to enable user to share media to their social media destination of choice */}
          <View style={{ position: 'absolute', right: 20, bottom: 50, width: 30, height: 60 }}>
            {<ShareScreenButton onPress={() => { this._openShareActionSheet() }}
              buttonState={'off'}
              stateImageArray={["ios-share-alt", "ios-share-alt"]}
              colorIcon={'rgba(255, 255, 255, 1)'}
              sizeIcon={30}
              style={styles.previewScreenButtonShare} />}
          </View>
        </View>
      )
    }
  }
  // Render UI for Video Recording and taking Screenshots
  _renderRecord() {
    var recordViews = [];
    // Recording time at top of the screen showing video length
    if (this.props.currentScreen == UIConstants.SHOW_RECORDING_SCREEN) {
      recordViews.push(
        <View key="record_timeline" style={{ position: 'absolute', backgroundColor: '#00000066', left: 0, right: 0, top: 0, height: 34, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.recordingTimeText}>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</Text>
        </View>
      );
    }

    return recordViews;
  }
  _startRecording() {
    // check for audio permissions, if not then request
    if (!this.state.audioPermission) {
      this.requestAudioPermission();
    }
    this._arNavigator._startVideoRecording("ICE_2.0_video", false,
      (errorCode) => {
        this._displayVideoRecordAlert("Recording Error", "Please allow video and audio permissions!" + errorCode);
        this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN);
      });
    this.props.dispatchDisplayUIScreen(UIConstants.SHOW_RECORDING_SCREEN);

    this._startStopWatch();
  }

  // Stopwatch at the top while recording
  _startStopWatch() {

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

  _stopRecording() {
    const recordTimeInMillis = (new Date).getTime() - this.state.recordStartTimeInMillis;
    this._arNavigator._stopVideoRecording().then((retDict) => {
      if (!retDict.success) {
        if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
          this._displayVideoRecordAlert("Recording Error", "Please allow camera record permissions!" + errorCode);
        }
      }
      this.setState({
        videoUrl: "file://" + retDict.url,
        haveSavedMedia: false,
        playPreview: true,
        previewType: kPreviewTypeVideo,
      });
      this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);

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

  _saveToCameraRoll() {
    if (this.state.videoUrl != undefined && !this.state.haveSavedMedia) {
      this.setState({
        haveSavedMedia: true
      })
    }
    CameraRoll.saveToCameraRoll(this.state.videoUrl);
  }

  _displayVideoRecordAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => this.props.dispatchDisplayUIScreen(UIConstants.SHOW_MAIN_SCREEN) },
      ],
      { cancelable: false }
    )
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
  render() {
    //console.log('render Markers');
    const { error, loading, products } = this.props;

    /* if (error) {
       return <div>Error! {error.message}</div>;
     }
 
     if (loading) {
       return <div>Loading...</div>;
     }*/
    //alert(this.props.config);

    if (this.props.products) {
      // console.log(this.props.products.length);
      // console.log(this.props.products.config.numberOfTrackedImages);
      // console.log(products.config);
      /* this.setState({
         isLoading: false,
       })*/
    }
    // const { params } = this.props.navigation.state;
    //      params.onTabFocus();
    // alert(config.test)
    //console.log(this.state.resetScene)
    return (
      <View style={styles.flex} >
        <StatusBar hidden={true} />
        {loading ? this._renderActivityLoader() :
          <View style={styles.flex}>
            <ViroARSceneNavigator
              //key={1} 
              style={styles.arView}
              apiKey={apiKey}
              numberOfTrackedImages={this.props.products.config.numberOfTrackedImages}
              autofocus={this.props.products.config.autofocus}
              videoQuality={this.props.products.config.videoQuality}
              //numberOfTrackedImages={products.config.numberOfTrackedImages} 
              ref={this._setARNavigatorRef}
              //autofocus={this.props.products.config.autofocus}
              //videoQuality={this.props.products.config.videoQuality}
              initialScene={{ scene: InitialARScene, passProps: { animationScanLine: this.state.animationScanLine, resetScene: this.state.resetScene, data: this.props.products } }}
              // viroAppProps={ ...this.state.viroAppProps, data: this.props.products}
              viroAppProps={this.state.viroAppProps}
            />
            {/* AR Initialization animation shown to the user for moving device around to get AR Tracking working*/}

            {this.state.animationScanLine && <ScanLine /> }
            {/* 2D UI for sharing rendered after user finishes taking a video / screenshot */}
            {this._renderShareScreen()}
            {/* Buttons and their behavior for recording videos and screenshots at the bottom of the screen */}
            {this._renderRecord()}
            {this.state.fullscreen ? this._renderVideo() : null}
            <TopInfo />
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  outer: {
    flex: 1,
  },
  flex: {
    flex: 1,
    backgroundColor: '#000000',
  },
  buttonTopInfo: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: 0,
    left: 0,
  },
  arView: {
    flex: 1,
  },

  lineStyle: {
    borderWidth: 4,
    borderColor: 'rgba(230, 0, 126, 1)',
    margin: 0,
    top: 0,
    width: width,
    shadowOffset: { width: 0, height: 1, },
    shadowColor: 'white',
    shadowOpacity: 0.5,
    elevation: 1,
    shadowRadius: 10
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
    backgroundColor: '#000000',
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

// -- REDUX STORE
function selectProps(store, state) {
  return {
    //modelItems: store.arobjects.modelItems,
    //portalItems: store.arobjects.portalItems,
    //effectItems: store.arobjects.effectItems,
    //config: store.products.itemsconfig,
    // loadingconfig: store.products.loading,
    //errorconfig: store.config.errorconfig,
    products: store.products.items,
    loading: store.products.loading,
    error: store.products.error,
    //loading: state.config.loading,
    // error: state.config.error,
    currentScreen: store.ui.currentScreen,
    listMode: store.ui.listMode,
    listTitle: store.ui.listTitle,
    currentItemSelectionIndex: store.ui.currentItemSelectionIndex,
    currentItemClickState: store.ui.currentItemClickState,
    currentSelectedItemType: store.ui.currentSelectedItemType,
  };
}

// -- dispatch REDUX ACTIONS map
const mapDispatchToProps = (dispatch) => {
  return {
    //fetchProductsConfig:() => dispatch(fetchProductsConfig()),
    fetchProductsAffiche: () => dispatch(fetchProductsAffiche()),
    // this.props.dispatch(fetchProductsConfig());
    /* dispatchAddPortal: (index) => dispatch(addPortalWithIndex(index)),
     dispatchRemovePortalWithUUID: (uuid) => dispatch(removePortalWithUUID(uuid)),
     dispatchAddModel: (index) => dispatch(addModelWithIndex(index)),
     dispatchRemoveModelWithUUID: (uuid) => dispatch(removeModelWithUUID(uuid)),
     dispatchRemoveAll:() => dispatch(removeAll()),
     dispatchToggleEffectSelection: (index) => dispatch(toggleEffectSelection(index)),
     dispatchChangeModelLoadState:(index, loadState) =>dispatch(changeModelLoadState(index, loadState)),
     dispatchChangePortalLoadState:(index, loadState) =>dispatch(changePortalLoadState(index, loadState)),*/
    dispatchDisplayUIScreen: (uiScreenState) => dispatch(displayUIScreen(uiScreenState)),
    /* dispatchSwitchListMode: (listMode, listTitle) =>dispatch(switchListMode(listMode, listTitle)),
      dispatchChangePortalPhoto:(index, source)=>dispatch(changePortalPhoto(index, source)),
      dispatchChangeItemClickState:(index, clickState, itemType) =>dispatch(changeItemClickState(index, clickState, itemType)),*/
  }
}


//export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ArScreen));
/*const mapDispatchToProps = {
  selectProps
  fetchGenres
};*/
//export default connect(mapStateToProps)(ArScreen);
export default connect(selectProps, mapDispatchToProps)(withNavigation(ArScreen));

//export default withNavigation(connect(selectProps, mapDispatchToProps)(ArScreen))
//export default connect(selectProps, mapDispatchToProps)(ArScreen)
//export default withNavigation(ArScreen);
//export default ArScreen;