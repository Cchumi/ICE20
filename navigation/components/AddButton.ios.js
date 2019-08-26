// native
import React, { Component } from 'react';
import { 
	TouchableOpacity, Animated, Easing, View, StyleSheet, TouchableWithoutFeedback,Alert, AsyncStorage, InteractionManager ,
	AppRegistry,
	Text,
	PixelRatio,
	Image,
	TouchableHighlight,
	ActivityIndicator,
	ActionSheetIOS,
	CameraRoll,
	Button,
	StatusBar,
	PermissionsAndroid,
} from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';

GLOBAL = require('../../global/global');
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
} from './constants';
import Share from 'react-native-share';
import Torch from 'react-native-torch';
import RNRestart from 'react-native-restart';

// This is the add button that appears in the middle along with
// other buttons and their animations
class AddButton extends Component {
   
	constructor(props) {
        super(props);
       /* type Props = {
			dispatchTeamFetchStart: Function,
		};*/
		this.animatedValue = new Animated.Value(0);
		this.topLeftValue = new Animated.Value(0);
		this.topCenterValue = new Animated.Value(0);
		this.topRightValue = new Animated.Value(0);
		this.state = {
            pressed: false,
            isTorchOn: false,
            isArScreen: true,
            isRecording: false,
        };
        this._handlePressTorch = this._handlePressTorch.bind(this);
		this._handlePressPhoto = this._handlePressPhoto.bind(this);
		
        this._handlePressRecord = this._handlePressRecord.bind(this);
        this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
        this.handleAddButtonPressOpen = this.handleAddButtonPressOpen.bind(this);
        this.handleAddButtonPressClose = this.handleAddButtonPressClose.bind(this);
		this.handleAddButtonPressOpenClose = this.handleAddButtonPressOpenClose.bind(this);

    }
   componentWillReceiveProps(nextProps) {
	//console.log(nextProps.navigation.state.routes[nextProps.navigation.state.index].routeName);
//if(this.props.navigation.state.routes[this.props.navigation.state.index].routeName == "ArStack") {
    //let isFocused = this.props.navigation.isFocused();
   // alert(isFocused);
  // alert(this.props.navigation.state);
  //console.log(this.props);
  // navigation.state.index > 0 && navigation.state.routes[1].routeName === "Detailscreen"
  if(nextProps.navigation.state.routes[nextProps.navigation.state.index].routeName != "ArScreen") {
   //if (this.props.navigation.state.routeName != "ArScreen") {
	   if(this.state.pressed) {
		this.handleAddButtonPressClose();
	   }
	   //Alert.alert(this.props.navigation.state);
	
   }
   else {
	   //alert(this.state.pressed);
	  // alert("pas ar screen");
	//this.setState({pressed: false});
	this.handleAddButtonPressOpen();
}

   }

    componentDidMount = () => {
		this.props.onRef(this);
		//console.log(this.props.navigation.state.routes[this.props.navigation.state.index].routeName);
		//this.handleAddButtonPress();
		if(this.props.navigation.state.routes[this.props.navigation.state.index].routeName != "ArScreen") {
		//if (this.props.navigation.state.routeName != "ArScreen") {
			if(this.state.pressed) {
			 this.handleAddButtonPressClose();
			}
			//Alert.alert(this.props.navigation.state);
		 
		}
		else {
			this.handleAddButtonPressOpenClose();
		}
		//this.handleAddButtonPressOpenClose();
		this.props.navigation.setParams({param: "Updated value"});
		//alert('did mount');

    };
    componentDidUpdate = () => {
		this.props.onRef(this);

    };
    componentWillMount() {
		//this.handleAddButtonPressr();
		//this.handleAddButtonPressOpenClose();
      }
    componentWillUnmount() {
		this.props.onRef(null);
		this.handleAddButtonPressOpenClose();
       // this.setState({isArScreen: false});
      }
    handleAddButtonPress = () => {
	   // alert(this.screenProps.isArScreens);
		if (this.props.navigation.state.routeName != "ArScreen") {
			if(!this.state.pressed) {
				this.handleAddButtonPressOpenClose();
				this.props.navigation.navigate('ArScreen');  
			}
			else {
				this._onResetScanAr();
			}
		}
	}

    handleAddButtonPressOpenClose = () => {
        // Alert.alert(this.props.activeItemKey);
        
         let { pressed } = this.state;
         if(pressed) {
             this.animateReverse(0);
             //this.props.navigation.navigate('ArScreenHome');
         }
         else {
             
            this.animate(1);
                 //this.props.navigation.navigate('ArScreenHome');
         }
         this.setState({pressed: !pressed});
     }
	handleAddButtonPressOpen = () => {
       // Alert.alert(this.props.activeItemKey);
       
		//let { pressed } = this.state;
		//if(!this.state.pressed) {
           // this.animateReverse(0);
            this.animate(1);
            
		//}
		/*else {
            
                this.animate(1);
                //this.props.navigation.navigate('ArScreenHome');
		}*/
        this.setState({pressed: true});
    }
    handleAddButtonPressClose = () => {
        // Alert.alert(this.props.activeItemKey);
        
         let { pressed } = this.state;
         if(this.state.pressed) {
             this.animateReverse(0);
             //this.props.navigation.navigate('ArScreenHome');
         }
         /*else {
             
                 this.animate(1);
                 this.props.navigation.navigate('ArScreenHome');
         }*/
         this.setState({pressed: !pressed});
     }
     _handlePressTorch = () => {
        const { isTorchOn } = this.state;
        Torch.switchState(!isTorchOn);
        this.setState({ isTorchOn: !this.state.isTorchOn });
        //Alert.alert('TORCH ' + this.state.isTorchOn);  
    }
    _handlePressRecord = () => {
		const { ArScreen } = this.props.navigation._childrenNavigation;
		this.setState({ isRecording: !this.state.isRecording });
		if(this.state.isRecording) {
			ArScreen.state.params.onRecordStopClick();
		}
		else {
			ArScreen.state.params.onRecordStartClick();
		}
		
           // Alert.alert('RECORD');  
    }
    _handlePressPhoto = () => {
		const { ArScreen } = this.props.navigation._childrenNavigation;
		ArScreen.state.params.onPhotoClick();
	}

	_onResetScanAr() {
		 RNRestart.Restart();
	}
	
	

	animate = (toValue) => {
		Animated.stagger(delay,[
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
		Animated.stagger(delay,[
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

	render() {

		let springValue = Animated.add(Animated.add(this.topLeftValue, this.topRightValue), this.topCenterValue);

		return (
			<View>
				<Animated.View
					style={[
						style.bigBubble,
						{
							transform: [
								{
									rotateZ: springValue.interpolate({
										inputRange: [0, 1, 2, 3],
										outputRange: ['-45deg', '-45deg', '0deg', '0deg'],
									}),
								},
								{
									scaleY: springValue.interpolate({
										inputRange: [0, 0.65, 1, 1.65, 2, 2.65, 3],
										outputRange: [1, 1.1, 1, 1.1, 1, 1.1, 1],
									}),
								},
							],
						},
					]}
				>
					<TouchableOpacity
					 activeOpacity={0.6}
					 style={{zIndex: 99999, elevation:1}}
						hitSlop={{
							left: 20,
							right: 20,
							top: 20,
							bottom: 20,
						}}
						onPress={this.handleAddButtonPress}
					>
						<Animated.View
							style={{
								transform: [
									{
										rotateZ: springValue.interpolate({
											inputRange: [0, 1, 2, 3],
											outputRange: ['45deg', '45deg', '45deg', '360deg'],
										}),
									},
								],
							}}
						>
							<Icon
								name={this.state.pressed ? "ios-refresh-circle" : "ios-camera"}
								size={35}
								color="#FFF"
							/>
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
                <TouchableWithoutFeedback onPress={this._handlePressRecord}>
				<Animated.View
					style={[
						style.smallBubble,
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
							zIndex: -1,
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
						style.smallBubble,
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
							zIndex: -1,
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
                {/*//onPress={this._handlePressTorch}*/}
                <TouchableWithoutFeedback onPress={this._handlePressTorch}>
				<Animated.View
                
					style={[
						style.smallBubble,
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
							zIndex: -1,
						},
					]}
				>
					<Icon
                    //name={this.state.isTorchOn === true ? "ios-flash-off" : "ios-flash"}
						name={!this.state.isTorchOn ? "ios-flash-off" : "ios-flash"}
						size={20}
                        color="#FFF"
                        style={{position: 'absolute', zIndex:5}}
					/>
				</Animated.View>
                </TouchableWithoutFeedback>
			</View>
		);
	}
}

const style = StyleSheet.create({

	bigBubble: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: bubbleColor,
		height: bigBubbleSize,
		width: bigBubbleSize,
		borderRadius: bigBubbleSize / 2,
		top: -20,
		zIndex: 999,
		marginBottom: 50,
		/*marginRight: 50,
		marginLeft: 50,*/
	},
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
});
export default withNavigationFocus(AddButton);
//export default AddButton;