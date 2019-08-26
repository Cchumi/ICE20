import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity ,
  Image,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import {
  ViroARSceneNavigator,
  ViroConstants,
} from 'react-viro';
import Icon from 'react-native-vector-icons/Ionicons';
var apiKey = "381814B3-73D4-4B04-B481-FB85528A89BE";
import renderIf from './js/helpers/renderIf';

var DemoARScene = require('./js/DemoAr');
var {
    width,
    height
  } = Dimensions.get('window');
// Array of 3d models that we use in this sample. This app switches between this these models.
var objArray = [
  require('./js/res/coffee_mug/object_coffee_mug.vrx'),
  require('./js/res/object_flowers/object_flowers.vrx'),
  require('./js/res/emoji_smile/emoji_smile.vrx')];

class DemoTemplate extends Component {
  static navigationOptions =({navigation}) =>( {
   // title: navigation.getParam('title', 'A Nested Details Screen').toUpperCase(),
    headerLeft: <TouchableOpacity onPress={ () => {navigation.goBack();}}><Icon name={'ios-arrow-back'} size={40} color={'rgba(230, 0, 126, 1)'}
   style={{width: 50, paddingLeft: 5}}/></TouchableOpacity>,
   /* headerStyle: {
      borderBottomWidth: 0,
      //backgroundColor: 'transparent',onPress={() => navigation.getParam('exitViro')}
    },*/
    //headerMode: 'screen',
    headerTransparent: true, 
    /*headerTintColor: 'transparent',
    headerTitleStyle: {
      fontWeight: 'bold',
    },*/
    headerStyle: {
      //position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      //top: 0,
     // left: 0,
      //right: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  });
  constructor(props) {
    super(props);
    this._exitViro = this._exitViro.bind(this);
    /*this._onShowObject = this._onShowObject.bind(this);
    this._renderTrackingText = this._renderTrackingText.bind(this);
    this._onTrackingInit = this._onTrackingInit.bind(this);
    this._onDisplayDialog = this._onDisplayDialog.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);*/

    this.state = {
      viroAppProps: { },
      trackingInitialized: false,
      isLoading: false,
      showMessage: true,
      message: "Bouger lentement la caméra pour faire apparaitre la cible puis cliquez dessus!",
    }
  }
componentDidMount() {
  //if (returnValue == ViroConstants.RECORD_ERROR_NONE) {
    this.setState({
      message: "Bouger lentement la caméra pour faire apparaitre la cible puis cliquez dessus!",
    });
//}
  this.setState({
    trackingInitialized: true,
  });
  this.props.navigation.setParams({ exitViro: this._exitViro });
  this.willBlurListener = this.props.navigation.addListener('willBlur', () => {
    this._exitViro();
  })
}
componentDidUpdate() {
  /*if ( ViroConstants.TRACKING_REASON_INSUFFICIENT_FEATURES) {
    this.setState({
      message: "Données insuffisante pour afficher la réalité augmentée !",
    });
  }
  else if( ViroConstants.TRACKING_REASON_EXCESSIVE_MOTION) {
    this.setState({
      message: "Ralentissez le mouvement de la caméra !",
    });
  }*/

}
_exitViro(){
  this.setState({
    trackingInitialized: false,
  });
  //this.props.navigation.goBack();
  //this.props.navigation.pop();
 //alert("exit");
}

_hideMessage(){
  this.setState({
    showMessage: false,
  });
}

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', '');
    const materials = navigation.getParam('materials', '');
    const animations = navigation.getParam('animations', '');
   //console.log(data);
    //alert(data);
   /* this.setState({
        viroAppProps: {data: data, materials: materials,animations: animations},
    });*/
    return (
      <View style={localStyles.outer} >
      <StatusBar hidden={true} />
      
    {this.state.trackingInitialized?
      <ViroARSceneNavigator 
      //key={1} 
      style={localStyles.arView}
      apiKey={apiKey}
      initialScene={{scene:DemoARScene}} 
      viroAppProps={{data: data, materials: materials,animations: animations, _hideMessage: this._hideMessage.bind(this)}}
      //onExit={this._exitViro}
    />
    : <Text>EXIT</Text> }
    {this.state.showMessage &&
      <View style={localStyles.message}>
      <Text style={localStyles.textmessage}>{this.state.message}</Text>
      </View>}

      </View>
    );
  }

  // Invoked when a model has started to load, we show a loading indictator.
  /*_onLoadStart() {
    this.setState({
      isLoading: true,
    });
  }*/

  // Invoked when a model has loaded, we hide the loading indictator.
  /*_onLoadEnd() {
    this.setState({
      isLoading: false,
    });
  }*/

 /* _renderTrackingText() {
    if(this.state.trackingInitialized) {
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top: 30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>Tracking initialized.</Text>
      </View>);
    } else {
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top:30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>Waiting for tracking to initialize.</Text>
        </View>);
    }
  }*/

  /*_onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }

  _onDisplayDialog() {
    Alert.alert(
    'Choose an object',
    'Select an object to place in the world!',
    [
      {text: 'Coffee Mug', onPress: () => this._onShowObject(0, "coffee_mug", 0)},
      {text: 'Flowers', onPress: () => this._onShowObject(1, "flowers", .290760)},
      {text: 'Smile Emoji', onPress: () => this._onShowObject(2, "smile_emoji", .497823)},
    ],
    );
  }

  _onShowObject(objIndex, objUniqueName, yOffset) {
    this.setState({
        viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName, objectSource:objArray[objIndex]},
    });
  }*/
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
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
  message:{
    position: 'absolute', 
    bottom: 0,
    left: 0, 
    right: 0, 
    width: '100%', 
    height: 50, 
    flexDirection:'column', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#00000066', 
  },
  textmessage: { 
    color: '#fff',
    textAlign: 'center',
  },
});
export default withNavigation(DemoTemplate);
