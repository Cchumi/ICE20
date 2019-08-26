'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
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
  Button,
  Linking,
  Easing} from 'react-native';

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroSpotLight,
  ViroOmniLight,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  ViroVideo,
  Viro3DObject,
  ViroQuad,
  ViroSurface,
  ViroARPlaneSelector
} from 'react-viro';

import renderIf from '../helpers/renderIf';



var {
  width,
  height
} = Dimensions.get('window');
const webUrl = 'http://pierregagliardi.com/reactapp/';

//type Props = {};
export default class Markers extends Component  {
  constructor(props) {
    super(props);
// bind 'this' to functions
this._onClickState = this._onClickState.bind(this);
this.getARScene = this.getARScene.bind(this);
this._onAnchorFound = this._onAnchorFound.bind(this);
this._onAnchorRemoved = this._onAnchorRemoved.bind(this);
this._onAnchorUpdated = this._onAnchorUpdated.bind(this);
this._onTrackingInit = this._onTrackingInit.bind(this);
this._loadAllMarkers = this._loadAllMarkers.bind(this);
this._createAllMarkersTargets = this._createAllMarkersTargets.bind(this);
//this._createMaterial = this._createMaterial.bind(this);
this._onClickUrl = this._onClickUrl.bind(this);
this._onClickVideo = this._onClickVideo.bind(this);
this._onClick = this._onClick.bind(this);
//this._renderVideoControl = this._renderVideoControl.bind(this);
//this._togglePauseVideo = this._togglePauseVideo.bind(this);
//this._getQuad = this._getQuad.bind(this);
this._getTexts = this._getTexts.bind(this);
this._getVideos = this._getVideos.bind(this);
this._getImages = this._getImages.bind(this);
this._onResetArScene = this._onResetArScene.bind(this)
this.testClick = this.testClick.bind(this);
//this._linkPressed = this._linkPressed.bind(this);
//this._getBoxs = this._getBoxs.bind(this);
//this._onClickLink = this._onClickLink.bind(this,urlLink);
//this._onClickUrl = this._onClickUrl.bind(this);

//this._onDisplayDialog = this._onDisplayDialog.bind(this);

    // Set initial state here
    this.state = {
      data: [],
      jsonRender: [],
      //dataMarker: this.state.data.markers,
      trackingInitialized: false,
      text : "Initializing AR...",
      top: height,
      isFetching: false,
      isTracking: false,
      initialized: false,
      runAnimation: false,
      addImageMarker : true,
      text: "test",
      totalItemNumber: 0,
      loading: false, 
      isLoading: false,
      foundAnchor : '',
      pauseUpdates : false,
      videoPaused: false,
    };

   
    
  }

componentWillMount() {
    
    this.makeRemoteRequest();
    
}


componentDidMount() {

}

componentDidUpdate() {

}


makeRemoteRequest(){
 
 const jsonFile = webUrl + 'ice.json';
 this.setState({ loading: true, isLoading: true, });

 fetch(jsonFile)
   .then(res => res.json())
   .then(res => {
   ;
  
     this.setState({

       isFetching: true,
       initialized: true,
       loading: false,
       isLoading: false,
       data: res.markers,

       totalItemNumber: res.markers.length
     }, function() { 
      this._createAllMarkersTargets();
      /*this.state.data.forEach(function(item, i) {
        Alert.alert(i);
      });*/
          // In this block you can do something with new state.
     });
   })
   .catch(error => {
   //Alert.alert(error);
   console.error(error);
     this.setState({ error, loading: false });
   });
}

/* DEFINED MATERIALS */
/*_createMaterial(texture, name) {
  let materialName = name;
  let materials = {};
  materials[materialName] = {
    diffuseTexture: texture
  }
  ViroMaterials.createMaterials(materials);
  return name;
}*/


_onClickImages(url) {
    //Alert.alert("clicked");
      //Linking.openURL("http://"+url);
    
      }
/*_onClickUrl(url) {
    Alert.alert("clicked");
      //return Linking.openURL("http://"+url);
    
}*/
_onClick() {
  Alert.alert("We just Clicked the image!");
}
_onClickUrl(urlLink) {
  //Alert.alert("clicked");
    return Linking.openURL("http://"+urlLink);
  
}
      
    _onClickVideo() {
      Alert.alert('okVideo');
        this.setState({
        
          videoPaused: !this.state.videoPaused,
        });
      }
    _togglePauseVideo() {
        this.setState({
          videoPaused: !this.state.videoPaused,
        })
      }


_createAllMarkersTargets() {

  var imageMarkers = '';
  var imageMarkersNames  = '';
  var ARImageMarkersTargets = {};
  var physicalWidths  = '';
  if (!this.state.addImageMarker) {
    return;
  }
  var objarray = {};
  var test = {};
 //Alert.alert(this.state.data);
 var values = [];

  for (let x = 0; x < this.state.totalItemNumber; x++){
     // Iterate through your marker data here to 
     imageMarkers = webUrl + this.state.data[x].folderName + this.state.data[x].name + '/res/' + this.state.data[x].imageMarker;
     console.log(imageMarkers);
     imageMarkersNames = this.state.data[x].name.toString();
     physicalWidths = this.state.data[x].physicalWidth;
     console.log(this.state.data[x].type);
     var key = this.state.data[x].name.toString();
    ARImageMarkersTargets[key] = {
        source: {
          uri :  `${imageMarkers}`
         },
         orientation : this.state.data[x].orientation,
         physicalWidth : this.state.data[x].physicalWidth,
         type: this.state.data[x].type
    };

}
//console.log(ARImageMarkersTargets);

return ViroARTrackingTargets.createTargets(ARImageMarkersTargets);

}

_loadAllMarkers(){
  var views = [];

  var marker = this.state.data;
  var y = 0;

  if (!this.state.addImageMarker) {
    return;
  }

for (let i = 0; i < this.state.totalItemNumber; i++){

      // Iterate through your marker data here to
      if (this.state.data[i].type === "Image") {
        console.log("image " + this.state.data[i].type + " " + this.state.data[i].name);
        views.push((
          <ViroNode position={[0, 0, 0]} key={i} >
        <ViroARImageMarker target={this.state.data[i].name.toString()} 
        //pauseUpdates={this.state.pauseUpdates} 
        onAnchorFound={this._onAnchorFound}
        onAnchorRemoved={this._onAnchorRemoved}
        onAnchorUpdated={this._onAnchorUpdated}
        key={i}
        >
         {this.getARScene(this.state.data[i].jsonRender)}
        </ViroARImageMarker>
        </ViroNode>
  ));

      }
      else  {
        console.log("object " + this.state.data[i].type + " " + this.state.data[i].name);
        views.push((
          <ViroNode position={[0, 0, 0]} key={i} >
        <ViroARObjectMarker target={this.state.data[i].name.toString()} 
        //pauseUpdates={this.state.pauseUpdates} 
        onAnchorFound={this._onAnchorFound}
        onAnchorRemoved={this._onAnchorRemoved}
        onAnchorUpdated={this._onAnchorUpdated}
        key={i}
        >
         {this.getARScene(this.state.data[i].jsonRender)}
        </ViroARObjectMarker>
        </ViroNode>
  ));
      }

     console.log(this.state.data[i].jsonRender);
    // Alert.alert(this.state.data[i].jsonRender.ViroTexts.text);
  }
  return views;

}

getARScene(jsonRender) {
  /*if (jsonRender)
  {
Alert.alert("jsonrender");
  }*/
  return (
    <ViroNode position={[0, 0, 0]} >
          {this._getTexts(jsonRender.ViroTexts)}
          {this._getVideos(jsonRender.ViroVideos)}
          {this._getImages(jsonRender.ViroImages)}
    </ViroNode>
  )
}


/* DEFINED QUAD SHAPE */
_getTexts(viroTxt) {
    if (viroTxt != null) {
      console.log("ViroTexts");
      console.log(viroTxt);
      const self = this;
      var arrayTxts = [];

      viroTxt.forEach(function(txt, i){
       let boundTxtsClick = '';
       console.log(txt.position);
       if(txt.linkUrl !== undefined) {
        console.log(txt.linkUrl);
       //boundTxtsClick = this._onClickLink(txt.linkUrl);
       //boundTxtsClick = return Linking.openURL("http://" + txt.linkUrl);
       }
       //console.log(viroTxt[key].text);
       arrayTxts.push((


           <ViroText key={i} textClipMode="None"
           text={txt.text}
           position={txt.position}
           scale={txt.scale}
           rotation={txt.rotation}
           style={txt.style}
          /* onClick = {boundTxtsClick}*/ />
        ));
         });
         

         if (!this.state.foundAnchor) {
             return null
         }
         return (
         arrayTxts
         )
          }
}


_getVideos(viroVids) {
   if (viroVids != null) {
   
    var arrayVids = [];
    viroVids.forEach(function(vid, i){
  //Object.keys(viroVids).forEach(key => {

  let boundVidsClick = '';
  /*if(viroTxt[key].linkUrl !== undefined) {

  boundVidsClick = this._onClickUrl.bind(this,  viroTxt[key].linkUrl);
  {vid.controls && this._renderVideoControl() }
  height={vid.height} width={vid.width} 
  }*/
  arrayVids.push((
            <ViroVideo key={i}  paused={vid.paused} loop={vid.loop} volume={vid.volume} resizeMode={ 'cover' } height={vid.height/7} width={vid.width/7}  muted={vid.muted} source={{uri:vid.url}} paused={vid.paused} transformBehaviors={vid.transformBehaviors}
           position={vid.position}
           //scale={vid.scale}
           rotation={vid.rotation}
           // onClick={this._onClickVideo} 
            />
));
    });

    if (!this.state.foundAnchor) {
        return
    }
    return (
    arrayVids
    )
     }
}
/*testClick = (linkUrl) => {
  Alert.alert("We just Clicked the image!");
}*/
testClick(id, linkUrl) {
  return (
Alert.alert("We just Clicked the image!")

  )
  
}
_onClickState(uuid) {
  return (clickState, position, source)=> {
    if (clickState == 1) { 
      Alert.alert("We just Clicked the image!");
      // clickState == 1 -> "ClickDown", we set the state itemClickedDown = true here,
      // which gets "reset" in 200 miliseconds. If a "ClickUp" happens in these 200 ms then
      // the user most likely just wanted to click the model (handled in the clickState == 2). 
      //After 200 ms, most likely the user intended to "drag" the object.
    /*  this.setState({
        itemClickedDown : true,
      });
      TimerMixin.setTimeout(
        () => {
          this.setState({
            itemClickedDown: false,
          });
        },
        200
      );*/
    }

    if (clickState == 2) { // clickstate == 2 -> "ClickUp"
    Alert.alert("We just Clicked the image!");
      // As explained above, within 200 ms, the user's intention is to "tap" the model -> toggle the animation start/stop
      /*if (this.state.itemClickedDown) {
        {this._onItemClicked()}
      }*/
      // Irrespective of 200 ms, we call the callback provided in props -> this brings up the context menu on top right
      //this.props.onClickStateCallback(uuid, clickState, UIConstants.LIST_MODE_MODEL);
    }
  }
}

_getImages(viroImgs) {
  var arrayImgs = [];
  if (viroImgs) {
    var root = this;
    //Object.keys(viroImgs).forEach(function(currentKey) {
      Object.keys(viroImgs).forEach((currentKey, index) => {
      if(viroImgs[currentKey] != null && viroImgs[currentKey] != undefined) {
        var boundImgsClick = '';
        if (viroImgs[currentKey].linkUrl !== undefined) {
          // this._onClick();
         //Linking.openURL("http://www.pierregagliardi.com");
         //boundImgsClick = Linking.openURL("http://www.pierregagliardi.com");//this._linkPressed("http://www.pierregagliardi.com");
         //boundImgsClick = this._onClick.bind(this, i);
         boundImgsClick = this._onClickUrl.bind(this ,viroImgs[currentKey].linkUrl);
         //boundImgsClick = root.testClick.bind(root);
         //boundImgsClick = root.testClick;
         //boundImgsClick = root._onClickUrl.bind(root,  viroImgs[currentKey].linkUrl);
         //Alert.alert(viroImgs[currentKey].linkUrl);
         }
        arrayImgs.push(
          <ViroImage 
          key={viroImgs[currentKey].id}  
          height={viroImgs[currentKey].height/12}
          width={viroImgs[currentKey].width/12}
          source={{uri:viroImgs[currentKey].url}}
          position={viroImgs[currentKey].position}
          //scale={vid.scale}
          rotation={viroImgs[currentKey].rotation}
          //onPress=this._onClickLink.bind(this, img.linkUrl)
          //onPress={this.testClick(index)} 
          //onTouch={this.testClick(index)} 
          //onClick={()=>{Alert.alert("We just Clicked the image!");}} 
          onClick={boundImgsClick} 
          //onClickState={root._onClickState(viroImgs[currentKey].id)}
          //onClick={this._onClickUrl.bind(this,  img.linkUrl)}
          />
        );
      }
//      objBitMask++;
    });

   /* const ImgList = (viroImgs.map((img, index) => 
        <ViroImage 
        key={index}  
        height={img.height/12}
        width={img.width/12}
        source={{uri:img.url}}
        position={img.position}
        //scale={vid.scale}
        rotation={img.rotation}
        //onPress=this._onClickLink.bind(this, img.linkUrl)
        //onPress={this.testClick(index)} 
        //onTouch={this.testClick(index)} 
        onClick={this.testClick.bind(this,  img.linkUrl)} 
        //onClick={this._onClickUrl.bind(this,  img.linkUrl)}
        />

        ));*/
     /*   return(

          arrayImgs

        )*/
  }
  return arrayImgs;
}


_getImagesqq(viroImgs) {
  if (viroImgs != null) {

    var arrayImgs = [];
    var boundImgsClick = '';
    viroImgs.forEach(function(img, i){
      if (img.linkUrl !== undefined) {
       // this._onClick();
      //Linking.openURL("http://www.pierregagliardi.com");
      //boundImgsClick = Linking.openURL("http://www.pierregagliardi.com");//this._linkPressed("http://www.pierregagliardi.com");
      //boundImgsClick = this._onClick.bind(this, i);
      //boundImgsClick = this._onClickUrl(0,img.linkUrl);
      //boundImgsClick = this._onClickUrl.bind(this,  img.linkUrl);
      }
      arrayImgs.push((

          <ViroImage 
          key={i}   
          height={img.height/12} 
          width={img.width/12} 
          source={{uri:img.url}} 
          position={img.position} 
          //scale={vid.scale}
          rotation={img.rotation} 
          //onPress={this._onClickUrl(this)}
          //onClick={boundImgsClick}
          //onPress={boundImgsClick} 
          //onTouch={boundImgsClick} 
          //onClick={this._onClickUrl(img.linkUrl)}
          //onClick={() => this._onClickUrl.bind(this)}
          //onClick={this._onInitialized} 
          />

      ));
    });

    if (!this.state.foundAnchor) {
        return
    }
    return (
    arrayImgs
    )
     }
}

getNoTrackingUI(){
  const { isTracking, initialized } = this.state;
    this.setState({
      animationScanLine : true
      
  })

  return (
    
    <ViroText text={
      initialized ? 'Initializing AR...'
        : "No Tracking"
    }/>
  )
}



_onAnchorUpdated(anchor) {


}
_onAnchorRemoved(anchor) {

  //console.log("uremove " + anchor.position);
//Alert.alert("remove");
this.props.sceneNavigator.viroAppProps._changeStateScanline();
//this.props.sceneNavigator.viroAppProps._onResetScanAr();

}

_onAnchorFound(anchor) {
  this.setState({
    foundAnchor : anchor,
  });

  this.props.sceneNavigator.viroAppProps._changeStateScanline();
  this.props.sceneNavigator.viroAppProps._onLoadEnd();


}

_onResetArScene() {
  if (this.props.arSceneNavigator.viroAppProps.resetScene){
    //Alert.alert("update");
    this.props.sceneNavigator.resetARSession(true, true);
    //this.makeRemoteRequest();
    this.props.sceneNavigator.viroAppProps._onResetScanAr();
  }
}

      /*<ViroARScene onTrackingUpdated={this._onInitialized} 
      //anchorDetectionTypes={'PlanesHorizontal'}
      >*/
  render() {
    this._onResetArScene();
    let loadMarkers = this._loadAllMarkers();
    
   return (
    <ViroARScene>

{loadMarkers}

   { /*this.state.isTracking ? this.getNoTrackingUI() : this._loadAllMarkers()*/ }
       <ViroOmniLight
            intensity={300}
            position={[-10, 10, 1]}
            color={"#FFFFFF"}
            attenuationStartDistance={20}
            attenuationEndDistance={30} />

        <ViroOmniLight
            intensity={300}
            position={[10, 10, 1]}
            color={"#FFFFFF"}
            attenuationStartDistance={20}
            attenuationEndDistance={30} />

        <ViroOmniLight
            intensity={300}
            position={[-10, -10, 1]}
            color={"#FFFFFF"}
            attenuationStartDistance={20}
            attenuationEndDistance={30} />

        <ViroOmniLight
            intensity={300}
            position={[10, -10, 1]}
            color={"#FFFFFF"}
            attenuationStartDistance={20}
            attenuationEndDistance={30} />

        <ViroSpotLight
          position={[0, 8, -2]}
          color="#ffffff"
          direction={[0, -1, 0]}
          intensity={50}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
          castsShadow={true}
        />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -1.6, 0]}
          width={5} height={5}
          arShadowReceiver={true}
          />
          {/*this._createAllMarkersTargets()*/}
      </ViroARScene>

    );
  }

 _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }




_onTrackingInit() {
   
     this.setState({
        trackingInitialized: true,
        viroAppProps:{...this.state.viroAppProps, animationScanLine: true}
        
      });
    }

  
}


var styles = StyleSheet.create({
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5,
    backgroundColor: '#F5FCFF'
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  },
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
  lineStyle:{
    borderWidth: 4,
    borderColor:'red',
    margin:0,
    top: 0,
    width: width,
    shadowOffset:{ width: 0, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 1.0
    
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

/*ViroARTrackingTargets.createTargets({
  chocolate : {
    source : {
      uri : 'http://www.pierregagliardi.com/reactapp/js/ice/chocolat/res/marker1.jpg',
    },
    //source : require('./res/mi_2.png'),
    orientation : 'Up',
    physicalWidth : 0.1, // 27" poster
  }
});*/

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  },
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  green_plane: {
    lightingModel: "Constant",
    diffuseColor: "#00ff0050"
},
});

ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing:"Bounce",
      duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing:"Bounce",
    duration: 500
  }
});

module.exports = Markers;
