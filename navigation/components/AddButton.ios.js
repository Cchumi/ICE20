// native
import React, { Component } from 'react';
import {
	TouchableOpacity, Animated, Easing, View, StyleSheet, TouchableWithoutFeedback, Alert, AsyncStorage, InteractionManager,
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
import { withNavigation, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

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
} from './constants.ios';
import Share from 'react-native-share';
import Torch from 'react-native-torch';
//import RNRestart from 'react-native-restart';

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
		////console.log(nextProps.navigation.state.routes[nextProps.navigation.state.index].routeName);
		//if(this.props.navigation.state.routes[this.props.navigation.state.index].routeName == "ArStack") {
		//let isFocused = this.props.navigation.isFocused();
		// alert(isFocused);
		// alert(this.props.navigation.state);
		////console.log(this.props);
		// navigation.state.index > 0 && navigation.state.routes[1].routeName === "Detailscreen"
		if (nextProps.navigation.state.routes[nextProps.navigation.state.index].routeName != "ArStackScreen") {
			//if (this.props.navigation.state.routeName != "ArScreen") {
			if (this.state.pressed) {
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
		//this.props.onRef(this);
		////console.log(this.props.navigation.state.routes[this.props.navigation.state.index].routeName);
		//this.handleAddButtonPress();
		if (this.props.navigation.state.routes[this.props.navigation.state.index].routeName != "ArStackScreen") {
			//if (this.props.navigation.state.routeName != "ArScreen") {
			if (this.state.pressed) {
				this.handleAddButtonPressClose();
			}
			//Alert.alert(this.props.navigation.state);

		}
		else {
			this.handleAddButtonPressOpenClose();
		}
		//this.handleAddButtonPressOpenClose();
		this.props.navigation.setParams({ param: "Updated value" });
		//alert('did mount');

	};
	componentDidUpdate = () => {
		//this.props.onRef(this);

	};
	componentWillMount() {
		//this.handleAddButtonPressr();
		//this.handleAddButtonPressOpenClose();
	}
	componentWillUnmount() {
		//this.props.ref(null);
		this.handleAddButtonPressOpenClose();
		// this.setState({isArScreen: false});
	}
	handleAddButtonPress = () => {
		// alert(this.screenProps.isArScreens);
		if (this.props.navigation.state.routeName != "ArStackScreen") {
			if (!this.state.pressed) {
				this.handleAddButtonPressOpenClose();
				this.props.navigation.navigate('ArStackScreen');
			}
			else {
				this._onResetScanAr();
			}
		}
	}

	handleAddButtonPressOpenClose = () => {
		// Alert.alert(this.props.activeItemKey);

		let { pressed } = this.state;
		if (pressed) {
			this.animateReverse(0);
			//this.props.navigation.navigate('ArScreenHome');
		}
		else {

			this.animate(1);
			//this.props.navigation.navigate('ArScreenHome');
		}
		this.setState({ pressed: !pressed });
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
		this.setState({ pressed: true });
	}
	handleAddButtonPressClose = () => {
		// Alert.alert(this.props.activeItemKey);

		let { pressed } = this.state;
		if (this.state.pressed) {
			this.animateReverse(0);
			//this.props.navigation.navigate('ArScreenHome');
		}
		/*else {
		    
				this.animate(1);
				this.props.navigation.navigate('ArScreenHome');
		}*/
		this.setState({ pressed: !pressed });
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
		if (this.state.isRecording) {
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
		console.log("reset")
		this.props.navigation.state.routes[1].routes[0].params.setCurrentScreen(1)
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
						style={{ zIndex: 9998, elevation: 1 }}
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

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        campagnes: state.firestore.ordered.campagnes,
        animations: state.firestore.ordered.animations,
        materials: state.firestore.ordered.materials,
    }
}
//export default withNavigation(AddButton);
export default withNavigation(compose(
    connect(mapStateToProps),
    firestoreConnect(/*props => {
        return [
            {
                collection: 'campagnes',
                where: [['disabled', '==', false]],
            },
            {
                collection: 'animations',
            },
            {
                collection: 'materials',
            },
        ]
    }*/),
    /*firestoreConnect(props => {
        return [
            {
                collection: 'campagnes',
            },
        ]
    }),*/
    firebaseConnect()
)(AddButton))
//export default AddButton;