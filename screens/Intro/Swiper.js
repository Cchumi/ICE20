/**
 * Swiper
 * Renders a swipable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */

import React, { Component } from 'react';
import {
  Dimensions,       // Detects screen dimensions
  Platform,         // Detects platform running the app
  ScrollView,       // Handles navigation between screens
  StyleSheet,       // CSS-like styles
  View,             // Container component
  Alert,
  Image
} from 'react-native';
import Button from './Button';
import Video from 'react-native-video';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';
// Detect screen width and height
const { width, height } = Dimensions.get('window');

class Swiper extends Component {
  /*  constructor(props) {
        super(props);
        this.state = {
          audiopaused: false,
        };
    }*/
  // Props for ScrollView component
  static defaultProps = {
    // Arrange screens horizontally
    horizontal: true,
    // Scroll exactly to the next screen, instead of continous scrolling
    pagingEnabled: true,
    // Hide all scroll indicators
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    // Do not bounce when the end is reached
    bounces: false,
    // Do not scroll to top when the status bar is tapped
    scrollsToTop: false,
    // Remove offscreen child views
    removeClippedSubviews: true,
    // Do not adjust content behind nav-, tab- or toolbars automatically
    automaticallyAdjustContentInsets: false,
    // Fisrt is screen is active
    index: 0,
    //audiopaused: false,
  };

  state = this.initState(this.props);

  /**
   * Initialize the state
   */
  initState(props) {

    // Get the total number of slides passed as children
    const total = props.children ? props.children.length || 1 : 0,
      // Current index
      index = total > 1 ? Math.min(props.index, total - 1) : 0,
      // Current offset
      offset = width * index,
      audiopaused = true;

    const state = {
      total,
      index,
      offset,
      width,
      height,
      audiopaused,

    };

    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      isScrolling: false,
      offset
    };

    return state;
  }

  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = true;
  }

  /**
   * Scroll end handler
   * @param {object} e native event
   */
  onScrollEnd = e => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    this.updateIndex(e.nativeEvent.contentOffset
      ? e.nativeEvent.contentOffset.x
      // When scrolled with .scrollTo() on Android there is no contentOffset
      : e.nativeEvent.position * this.state.width
    );
  }

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollEndDrag = e => {
    const { contentOffset: { x: newOffset } } = e.nativeEvent,
      { children } = this.props,
      { index } = this.state,
      { offset } = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (offset === newOffset &&
      (index === 0 || index === children.length - 1)) {
      this.internals.isScrolling = false;
    }
  }

  /**
   * Update index after scroll
   * @param {object} offset content offset
   */
  updateIndex = (offset) => {
    const state = this.state,
      diff = offset - this.internals.offset,
      step = state.width;
    let index = state.index;

    // Do nothing if offset didn't change
    if (!diff) {
      return;
    }

    // Make sure index is always an integer
    index = parseInt(index + Math.round(diff / step), 10);

    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
      index
    });
  }

  /**
   * Swipe one slide forward
   */
  swipe = () => {
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = this.state.index + 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

    // Update internal scroll state
    this.internals.isScrolling = true;

    // Trigger onScrollEnd manually on android
    if (Platform.OS === 'android') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        });
      });
    }
  }

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */
  renderScrollView = pages => {
    return (
      <ScrollView ref={component => { this.scrollView = component; }}
        {...this.props}
        contentContainerStyle={[styles.wrapper, this.props.style]}
        onScrollBeginDrag={this.onScrollBegin}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
      >
        {pages.map((page, i) =>
          // Render each slide inside a View
          <View style={[styles.fullScreen, styles.slide]} key={i}>
            {page}
          </View>
        )}
      </ScrollView>
    );
  }

  /**
   * Render pagination indicators
   */
  renderPagination = () => {
    if (this.state.total <= 1) {
      return null;
    }

    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />;

    let dots = [];

    for (let key = 0; key < this.state.total; key++) {
      dots.push(key === this.state.index
        // Active dot
        ? React.cloneElement(ActiveDot, { key })
        // Other dots
        : React.cloneElement(Dot, { key })
      );
    }

    return (
      <View
        pointerEvents="none"
        style={[styles.pagination, styles.fullScreen]}
      >
        {dots}
      </View>
    );
  }

  async getKey () {
    try {
      const value = await AsyncStorage.getItem('@LabelConnect:skipIntro');
      //this.setState({myKey: value});
      
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey () {
    try {
      await AsyncStorage.setItem('@LabelConnect:skipIntro', '1');
      const value = await AsyncStorage.getItem('@LabelConnect:skipIntro');
      //state = this.initState(this.props);
     /* this.setState({
        index: this.state.index - this.state.total -1,
      });*/
      this.setState({ audiopaused: true });
      //this.props.navigation.navigate("Loading");
      const navigateAction = NavigationActions.navigate({
        routeName: 'MainApp',
        params: { data: this.props.navigation.state.params.data, materials: this.props.navigation.state.params.materials, animations: this.props.navigation.state.params.animations },

        // navigate can have a nested navigate action that will be run inside the child router
        action: NavigationActions.navigate({ routeName: 'Ar', params: { data: this.props.navigation.state.params.data, materials: this.props.navigation.state.params.materials, animations: this.props.navigation.state.params.animations }, }),
    });
    this.props.navigation.dispatch(navigateAction);
      //Alert.alert(value);
      //Alert.alert(this.getKey());
    } catch (error) {
      console.log("Error saving data" + error);
    }
    //this.props.navigation.navigate('MainNavigator');
    //this.props.navigation.goBack()
    
  }

  async resetKey () {
    try {
      await AsyncStorage.removeItem('@LabelConnect:skipIntro');
      const value = await AsyncStorage.getItem('@LabelConnect:skipIntro');
      //this.setState({myKey: value});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  setAudioPause = () => {
    this.setState({ audiopaused: !this.state.audiopaused });
  }
  /**
   * Render Continue or Done button
   */
  renderButton = () => {
    const lastScreen = this.state.index === this.state.total - 1;
    return (
      <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
        {lastScreen
          // Show this button on the last screen
          // TODO: Add a handler that would send a user to your app after onboarding is complete
          ? <Button text="Je veux Scanner!" onPress={() => this.saveKey()} />
          // Or this one otherwise
          : <Button text="Continuer" onPress={() => this.swipe()} />
        }
      </View>
    );
  }


  /**
   * Render Continue or Done button
   */
  renderSoundButtons = () => {
    const audiopaused = this.state.audiopaused;
    return (
      <View pointerEvents="box-none" style={[styles.SoundbuttonWrapper, styles.fullScreen]}>
        {audiopaused
          // Show this button on the last screen
          // TODO: Add a handler that would send a user to your app after onboarding is complete
          ? <Icon name="ios-volume-off" {...iconStyles} onPress={() => this.setAudioPause()} />
          // Or this one otherwise
          : <Icon name="ios-volume-high" {...iconStyles} onPress={() => this.setAudioPause()} />
        }
      </View>
    );
  }

  /**
   * Render the component
   */
  render = ({ children } = this.props) => {
    const track = "https://firebasestorage.googleapis.com/v0/b/ice20-ice.appspot.com/o/assets%2Faudio%2FAudioBG.mp3?alt=media&token=82bf18b3-ae87-468d-8c22-9bd9b56b73e1";
    const video =
      <Video 
      //source={audio}
      //source={sintel}
        //source={track}
       // source={{uri: 'assets/audio.mp3'}}
        source={{uri: track}} // Can be a URL or a local file.
        //ref={"audioElement"}
        paused={this.state.audiopaused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        volume={0.1}
        ignoreSilentSwitch="ignore" 
        //onLoadStart={this.loadStart} // Callback when video starts to load
        //onLoad={this.setDuration.bind(this)}    // Callback when video loads
        //onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        //onEnd={this.onEnd}           // Callback when playback finishes
        //onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />;
    return (
      <View style={[styles.container, styles.fullScreen]}>
        {/* Render screens */}
        {this.renderScrollView(children)}
        {/* Render mute button */}
        {this.renderSoundButtons()}
        {/* Render pagination */}
        {this.renderPagination()}
        {/* Render Continue or Done button */}
        {this.renderButton()}
        {video}
      </View>
    );
  }
}
//export default Swiper;
export default withNavigation(Swiper);
const iconStyles = {
  size: 20,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Set width and height to the screen size
  fullScreen: {
    width: width,
    height: height
  },
  // Main container
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  // Slide
  slide: {
    backgroundColor: 'transparent'
  },
  // Pagination indicators
  pagination: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  // Pagination dot
  dot: {
    backgroundColor: 'rgba(0,0,0,.25)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  // Active dot
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  // Button wrapper
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
   // Button wrapper
   SoundbuttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
});