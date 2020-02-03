import React, { Component, Fragment } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    SafeAreaView,
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
    Easing,
    StatusBar,
    AsyncStorage,
    ActionSheetIOS,
    CameraRoll,
    PermissionsAndroid,
    PixelRatio,

    NativeModules,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Torch from 'react-native-torch';

// constants
import {
    center,
    topCenter,
    topLeft,
    topRight,
    bigBubbleSize,
    smallBubbleSize,
    bubbleColor,
    animateTime,
    easingType,
    delay,
} from '../../../navigation/components/constants';


class SmallBubbles extends React.Component {
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0);
        this.topLeftValue = new Animated.Value(0);
        this.topCenterValue = new Animated.Value(0);
        this.topRightValue = new Animated.Value(0);
        this.state = {
            isTorchOn: false,
            isCameraOn: true,
        }
    }

    animate = (toValue) => {
        Animated.stagger(delay, [
            Animated.parallel([
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue,
                        duration: animateTime,
                        easing: Easing.exp,
                    }
                ),
                Animated.timing(
                    this.topLeftValue,
                    {
                        toValue,
                        duration: animateTime,
                        easing: easingType,
                    }
                ),
            ]),
            Animated.timing(
                this.topCenterValue,
                {
                    toValue,
                    duration: animateTime,
                    easing: easingType,
                }
            ),
            Animated.timing(
                this.topRightValue,
                {
                    toValue,
                    duration: animateTime,
                    easing: easingType,
                }
            ),
        ]).start();
        //]).start(() => {this.props.navigation.navigate('ArScreen');})
    }

    animateReverse = (toValue) => {
        Animated.stagger(delay, [
            Animated.timing(
                this.topRightValue,
                {
                    toValue,
                    duration: animateTime,
                    easing: easingType,
                }
            ),
            Animated.timing(
                this.topCenterValue,
                {
                    toValue,
                    duration: animateTime,
                    easing: easingType,
                }
            ),
            Animated.parallel([
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue,
                        duration: animateTime,
                        easing: easingType,
                    }
                ),
                Animated.timing(
                    this.topLeftValue,
                    {
                        toValue,
                        duration: animateTime,
                        easing: easingType,
                    }
                ),
            ]),
        ]).start();
    }

    _handlePressTorch = () => {
        const { isTorchOn } = this.state;
        //this.state.isCameraOn?RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off
        Alert.alert("Fonction Flash non disponnible sous android")
        Torch.switchState(!isTorchOn);
        this.setState({ isTorchOn: !this.state.isTorchOn });

    }
    _handlePressPhoto = () => {
        //console.log(this.props)
        //const { ArScreen } = this.props.navigation._childrenNavigation;
        //this.props.takeScreenShot();
        this.props.takeScreenshot()
        //ArScreen.state.params.onPhotoClick();
    }

    _handlePressRecord = () => {
        //console.log(this.props)
        //const { ArScreen } = this.props.navigation._childrenNavigation;
        this.setState({ isRecording: !this.state.isRecording });
        if (this.state.isRecording) {
            this.props.onRecordStop();
        }
        else {
            this.props.onRecordStart();
        }

        // Alert.alert('RECORD');  
    }
    componentDidMount = () => {

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            //console.log('didFocus');
            this.animate(1);
        });
        this.blurListener = navigation.addListener("willBlur", () => {
            //console.log('willBlur');

            this.animateReverse(0);
        });
    }
    render() {
        return (
            <View style={styles.ctn_smallButons}>
                <TouchableWithoutFeedback onPress={this._handlePressRecord}>
                    <Animated.View
                        style={[
                            styles.smallBubble,
                            {
                                position: 'absolute',
                                transform: [
                                    {
                                        translateX: this.topLeftValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [center.left, topLeft.left],
                                        }),
                                    },
                                    {
                                        translateY: this.topLeftValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [center.top, topLeft.top],
                                        }),
                                    },
                                    {
                                        rotateZ: this.topLeftValue.interpolate({
                                            inputRange: [0, 0.6, 1],
                                            outputRange: ['-90deg', '-45deg', '0deg'],
                                        }),
                                    },
                                    {
                                        scaleY: this.topLeftValue.interpolate({
                                            inputRange: [0, 0.8, 0.9, 1],
                                            outputRange: [1, 1.5, 1.5, 1],
                                        }),
                                    },
                                ],
                                opacity: this.topLeftValue,
                                zIndex: 1,
                            },
                        ]}
                    >
                        <Icon
                            name={this.state.isRecording ? "ios-square" : "ios-videocam"}
                            size={20}
                            color="#FFF"
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this._handlePressPhoto}>
                    <Animated.View
                        style={[
                            styles.smallBubble,
                            {
                                position: 'absolute',
                                transform: [
                                    {
                                        translateX: this.topCenterValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [center.left, topCenter.left],
                                        }),
                                    },
                                    {
                                        translateY: this.topCenterValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [center.top, topCenter.top],
                                        }),
                                    },
                                    {
                                        scaleY: this.topCenterValue.interpolate({
                                            inputRange: [0, 0.8, 0.9, 1],
                                            outputRange: [1, 1.5, 1.5, 1],
                                        }),
                                    },
                                ],
                                opacity: this.topCenterValue,
                                zIndex: 1,
                            },
                        ]}
                    >
                        <Icon
                            name="ios-image"
                            size={20}
                            color="#FFF"
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this._handlePressTorch}>
                    <Animated.View

                        style={[
                            styles.smallBubble,
                            {
                                position: 'absolute',
                                transform: [
                                    {
                                        translateX: this.topRightValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [center.left, topRight.left],
                                        }),
                                    },
                                    {
                                        translateY: this.topRightValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [center.top, topRight.top],
                                        }),
                                    },
                                    {
                                        rotateZ: this.topRightValue.interpolate({
                                            inputRange: [0, 0.6, 1],
                                            outputRange: ['90deg', '45deg', '0deg'],
                                        }),
                                    },
                                    {
                                        scaleY: this.topRightValue.interpolate({
                                            inputRange: [0, 0.8, 0.9, 1],
                                            outputRange: [1, 1.5, 1.5, 1],
                                        }),
                                    },
                                ],
                                opacity: this.topRightValue,
                                zIndex: 1,
                            },
                        ]}
                    >
                        <Icon
                            //name={this.state.isTorchOn === true ? "ios-flash-off" : "ios-flash"}
                            name={!this.state.isTorchOn ? "ios-flash-off" : "ios-flash"}
                            size={20}
                            color="#FFF"
                            style={{ position: 'absolute', zIndex: 5 }}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    smallBubble: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bubbleColor,
        height: smallBubbleSize,
        width: smallBubbleSize,
        borderRadius: smallBubbleSize / 2,
        top: -20,
    },
    ctn_smallButons: {
        position: 'absolute', flex: 1, flexDirection: 'row', right: 0, left: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'
        //justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'
    }
});

export default withNavigation(SmallBubbles)