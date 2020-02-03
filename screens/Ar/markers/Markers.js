
import React, { Component } from 'react';

import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  WebView,
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
  ViroMaterialVideo,
  ViroAnimations,
  ViroNode,
  ViroVideo,
  ViroGeometry,
  Viro3DObject,
  ViroQuad,
  ViroButton,
  ViroSurface,
  ViroARPlaneSelector
} from 'react-viro';
import { withNavigation, NavigationEvents, NavigationActions } from 'react-navigation';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import renderIf from '../helpers/renderIf';
import axios from 'axios';
import TimerMixin from 'react-timer-mixin';


var {
  width,
  height
} = Dimensions.get('window');
var functions = {};
const webUrl = 'http://pierregagliardi.com/reactapp/';
var buttonSize = 0.05;
var VIDEO_REF = "videoref";
//type Props = {};
export default class Markers extends Component  {
  //mixins: [TimerMixin],
  constructor(props) {
    super(props);
// bind 'this' to functions
this.getARScene = this.getARScene.bind(this);
this._onAnchorFound = this._onAnchorFound.bind(this);
this._onAnchorRemoved = this._onAnchorRemoved.bind(this);
this._onAnchorUpdated = this._onAnchorUpdated.bind(this);
this._onTrackingInit = this._onTrackingInit.bind(this);
this._loadAllMarkers = this._loadAllMarkers.bind(this);
this._createAllMarkersTargets = this._createAllMarkersTargets.bind(this);
this._createAllMaterials = this._createAllMaterials.bind(this);
this._createAllAnimations = this._createAllAnimations.bind(this);
//this._createMaterial = this._createMaterial.bind(this);
this._onClickUrl = this._onClickUrl.bind(this);
this._onClickVideo = this._onClickVideo.bind(this);
this._onVideoTapped = this._onVideoTapped.bind(this);
//this._renderVideoControl = this._renderVideoControl.bind(this);
this._togglePauseVideo = this._togglePauseVideo.bind(this);
this._toggleFullscreenVideo = this._toggleFullscreenVideo.bind(this);
//this._getQuad = this._getQuad.bind(this);
this._getTexts = this._getTexts.bind(this);
this._getVideos = this._getVideos.bind(this);
this._getImages = this._getImages.bind(this);
this._getGeometries = this._getGeometries.bind(this);
this._getObjects3d = this._getObjects3d.bind(this);
this._getFlexViews = this._getFlexViews.bind(this);
this._onResetArScene = this._onResetArScene.bind(this);
this._renderVideoControl = this._renderVideoControl.bind(this);
this._renderPlayControl = this._renderPlayControl.bind(this);
this._animateFinished = this._animateFinished.bind(this);
this._setARVideoRef = this._setARVideoRef.bind(this);

//this._onDisplayDialog = this._onDisplayDialog.bind(this);

    // Set initial state here
    this.state = {
      data: [],
      materials: [],
      animations: [],
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
      error: null,
      text: "test",
      totalItemNumber: 0,
      loading: false, 
      isLoading: false,
      foundAnchor : '',
      pauseUpdates : false,
      activeScene: null,
      videoPauseds: true,
      videoControlsAnimation:"fadeIn",
      videoPaused: [{
        default: true,
      }],
      playAnim: false,
      loadingData: true,
    };  
  }

  componentWillUnmount() {
  this.setState({
    isLoading: true,
  })
  console.log('unmount')
}
componentWillMount() {

  
  //this.makeRemoteRequest();
  /* console.log(this.props.data);
   this.setState({
    isFetching: true,
    initialized: true,
    loading: false,
    isLoading: false,
    data: this.props.data.markers,
    materials: this.props.data.materials,
    animations: this.props.data.animations,

    totalItemNumber: this.props.data.markers.length
  }, function() { 
    //Alert.alert("Récupération des markers terminée. Amusez-vous bien! :-)");
    
    this.setState({
     isFetching: false
    });
   this._createAllMarkersTargets();
   this._createAllMaterials();
   this._createAllAnimations();
   this.props.sceneNavigator.viroAppProps._onLoadEnd();
  });*/

    
}


componentDidMount() {
  const { navigation } = this.props;
  this.focusListener = navigation.addListener("didFocus", () => {
    console.log('didFocus2');
    this.setState({

      isLoading: true,

    })
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
    console.log('didBlur2');
    this.setState({

      isLoading: true,

    })
   /* this.setState({
      loading: true,
      isLoading: true,
      animationScanLine: false,
      resetScene: true
    })*/
    // The screen is focused
    // Call any action
  });
  console.log(this.state.isLoading);
 // console.log(this.props.products);
  this.setState({ loading: true, isLoading: true,isFetching: true, loadingData: true });
  //this._isMounted = true;
    if(this.state.loadingData) {

      //this.makeRemoteRequest();
      this.setState({          
        data: this.props.data.markers,
       materials: this.props.data.materials,
       animations: this.props.data.animations,
       totalItemNumber: this.props.data.markers.length,
        isFetching: false,
       initialized: true,
       //isLoading: false,      
        //error: res.error || null,          
        loading: false, 
        loadingData: false,        
      });   
      //const item_name = this.state.data['jsonRender'][1]['url'];
     /* Object.keys(this.state.data).forEach(function(prop) {
        // `prop` is the property name
        // `data[prop]` is the property value
        console.log(prop);
      });*/
      //console.log(this.props.data.markers.length);
      for (let y = 0; y < this.props.data.markers.length; y++){

         if(this.props.data.markers[y].jsonRender.ViroVideos) {
          if(this.props.data.markers[y].jsonRender.ViroVideos[0].paused === true) {
            this.setState(prevState => ({
              videoPaused: [...prevState.videoPaused, {[this.props.data.markers[y].name]: this.props.data.markers[y].jsonRender.ViroVideos[0].paused}]
              //videoPaused: [finalVideoPaused],
            }))
          }
         }
         if(this.props.data.markers[y].jsonRender.ViroObjects3d) {
          if(this.props.data.markers[y].jsonRender.ViroObjects3d[0].paused === true) {
         // console.log(this.props.data.markers[y].name);
          //console.log(this.props.data.markers[y].jsonRender.ViroObjects3d[0].paused);
          //const videoPausedInit = {[this.props.data.markers[y].name]: this.props.data.markers[y].jsonRender.ViroObjects3d[0].paused}
          //let finalVideoPaused = { ...this.state.videoPaused, {[this.props.data.markers[y].name]: this.props.data.markers[y].jsonRender.ViroObjects3d[0].paused} }
          this.setState(prevState => ({
            videoPaused: [...prevState.videoPaused, {[this.props.data.markers[y].name]: this.props.data.markers[y].jsonRender.ViroObjects3d[0].paused} ]
            //videoPaused: [finalVideoPaused],
          }))
         }
         }
      }
      
     //this.arrayholder = res.results;  
     this._createAllMarkersTargets();
      this._createAllMaterials();
      this._createAllAnimations();

      this.props.sceneNavigator.viroAppProps._onLoadEnd();   
      setTimeout(() => {
        //Alert.alert('I am appearing...','After 5 second!')
         this.setState({
           isLoading: false,
         })
         }, 5000);
    }
/*  const a = setTimeout(() => {
    this.makeRemoteRequest();
    // do some stuff here

  }, 2000);*/
 /* this.setTimeout(() => {
    this.makeRemoteRequest();
  }, 2000);*/
}

componentDidUpdate() {

}

makeRemoteRequesttest(){
 
  const jsonFile = webUrl + 'ice.json';
  this.setState({ loading: true, isLoading: true,isFetching: true, });


  axios.get(jsonFile)
      .then(res => {
          // const persons = res.data;
            //this.setState({ persons });
            this.setState({
              
              isFetching: false,
            initialized: true,
            loading: false,
            isLoading: true,
            data: res.markers,
            materials: res.materials,
            animations: res.animations,
            totalItemNumber: res.markers.length,
            loadingData: false,
          })//, function() { 
            //Alert.alert("Récupération des markers terminée. Amusez-vous bien! :-)");
            //console.log(res.markers);
            //console.log(res.markers.length);
            this._createAllMarkersTargets();
            this._createAllMaterials();
            this._createAllAnimations();
            /*this._createAllMarkersTargets();
            this._createAllMaterials();
            this._createAllAnimations();*/
            this.props.sceneNavigator.viroAppProps._onLoadEnd();
            //return null;
      })
      .catch((e) => {
        console.log('error', e)
    })
  //this.makeRemoteRequest();
 /* var self = this;
  setInterval(function() {
    self.makeRemoteRequest();
}, 1000);*/
  
    /*.catch(error => {
    Alert.alert("ERREUR DE RECUPERATION DES MARKERS. VEUILLEZ ESSAYER ULTERIEUREMENT!");
    //alert(error);
    console.error(error);
      this.setState({ error, loading: false });
    });*/
 }

makeRemoteRequest = () => {   
  //console.log("call json");
  const jsonFile = webUrl + 'ice.json';
  const url = `https://randomuser.me/api/?&results=20`;
  this.setState({ loading: true, isLoading: true,isFetching: true, loadingData: true });
  fetch(jsonFile)      
    .then(res => res.json())      
    .then(res => {        
      this.setState({          
        data: res.markers,
       materials: res.materials,
       animations: res.animations,
       totalItemNumber: res.markers.length,
        isFetching: false,
       initialized: true,
       isLoading: true,      
        error: res.error || null,          
        loading: false, 
        loadingData: false,        
      });        
     this.arrayholder = res.results;  
     this._createAllMarkersTargets();
      this._createAllMaterials();
      this._createAllAnimations();
      /*this._createAllMarkersTargets();
      this._createAllMaterials();
      this._createAllAnimations();*/
      this.props.sceneNavigator.viroAppProps._onLoadEnd();    
   })      
   .catch(error => {        
     this.setState({ error, loading: false });      
   });  
};

makeRemoteRequestold(){
 
 const jsonFile = webUrl + 'ice.json';
 this.setState({ loading: true, isLoading: true,isFetching: true,loadingData: true, });

 fetch(jsonFile, {
   headers: {
     'Cache-Control': 'no-cache'
   }
 })
   .then(res => res.json())
   .then(res => {
      this.setState({
        data: res.markers,
       materials: res.materials,
       animations: res.animations,
       totalItemNumber: res.markers.length,
        isFetching: false,
       initialized: true,
       loading: false,
       isLoading: false,
       
       loadingData: false,
     });//, function() { 
       //Alert.alert("Récupération des markers terminée. Amusez-vous bien! :-)");
       
       this._createAllMarkersTargets();
      this._createAllMaterials();
      this._createAllAnimations();
      /*this._createAllMarkersTargets();
      this._createAllMaterials();
      this._createAllAnimations();*/
      this.props.sceneNavigator.viroAppProps._onLoadEnd();
     })//);
   //})
   .catch(error => {
   Alert.alert("ERREUR DE RECUPERATION DES MARKERS. VEUILLEZ ESSAYER ULTERIEUREMENT!");
   //alert(error);
   console.error(error);
     this.setState({ error, loading: false });
   });
}

/* CREATION DES ANIMATIONS */

_createAllAnimations() {
  var AnimationsArray = this.state.animations;
  if (!this.state.addImageMarker) {
    return;
  }
  let animations = {};
  for (let z = 0; z < this.state.animations.length; z++){
     // Iterate through your marker data here to 
     //var key = this.state.data[x].name.toString();
     var key = this.state.animations[z].name.toString();
    animations[key] = {
      properties: {
        opacity: this.state.animations[z].properties.opacity,
        positionX: this.state.animations[z].properties.positionX,
        positionZ: this.state.animations[z].properties.positionZ,
        scaleX: this.state.animations[z].properties.scaleX,
        scaleY: this.state.animations[z].properties.scaleY,
        scaleZ: this.state.animations[z].properties.scaleZ
      },
      duration: this.state.animations[z].duration,
      easing: this.state.animations[z].easing
    }
  }
  return ViroAnimations.registerAnimations(animations);
}

_animateFinished(){
  this.setState({
    playAnim: false,

  })
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
/*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
_createAllMaterials() {
  var MaterialsArray = this.state.materials;
  if (!this.state.addImageMarker) {
    return;
  }
  let materials = {};
  for (let w = 0; w < this.state.materials.length; w++){
     // Iterate through your marker data here to 
     //var key = this.state.data[x].name.toString();
     var key = this.state.materials[w].name.toString();
     materials[key] = {
      diffuseTexture: {
        uri :  `${this.state.materials[w].properties.diffuseTextureUrl}`
       },
      shininess: this.state.materials[w].properties.shininess,
      diffuseColor: this.state.materials[w].properties.diffuseColor,
      lightingModel: this.state.materials[w].properties.lightingModel,
      diffuseColor: this.state.materials[w].properties.diffuseColor,
      wrapS: this.state.materials[w].properties.wrapS,
      wrapT: this.state.materials[w].properties.wrapT,
      chromaKeyFilteringColor: this.state.materials[w].properties.chromaKeyFilteringColor
    }
  }
  return ViroMaterials.createMaterials(materials);
}

/*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
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
  var values = [];

  for (let x = 0; x < this.state.totalItemNumber; x++){
     // Iterate through your marker data here to 
     imageMarkers = webUrl + this.state.data[x].folderName + this.state.data[x].name + '/res/' + this.state.data[x].imageMarker;
     //console.log(imageMarkers);
     imageMarkersNames = this.state.data[x].name.toString();
     physicalWidths = this.state.data[x].physicalWidth;
    // console.log(this.state.data[x].type);
     var key = this.state.data[x].name.toString();
    ARImageMarkersTargets[key] = {
        source: {
          uri :  `${this.state.data[x].imageMarker}`
         },
         orientation : this.state.data[x].orientation,
         physicalWidth : parseFloat(this.state.data[x].physicalWidth),
         type: this.state.data[x].type
    };

  }
  return ViroARTrackingTargets.createTargets(ARImageMarkersTargets);
}

/*CREATION DES DIFFERENTES SCENE AR*/

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
      //console.log("image " + this.state.data[i].type + " " + this.state.data[i].name);
      views.push((
        <ViroNode position={[0, 0, 0]} key={i} >
          <ViroARImageMarker target={this.state.data[i].name.toString()} 
          pauseUpdates={this.state.data[i].pauseUpdates} 
          onAnchorFound={anchor  => this._onAnchorFound(anchor, this.state.data[i].name.toString())} 
         // onAnchorFound={this._onAnchorFound}
          onAnchorRemoved={this._onAnchorRemoved}
          onAnchorUpdated={this._onAnchorUpdated}
          key={i}
          >
            {this.getARScene(this.state.data[i].jsonRender, this.state.data[i].name.toString())}
          </ViroARImageMarker>
        </ViroNode>
      ));
    }
    else
    {
      //console.log("object " + this.state.data[i].type + " " + this.state.data[i].name);

      views.push((
        <ViroNode position={[0, 0, 0]} key={i} >
          <ViroARObjectMarker target={this.state.data[i].name.toString()} 
          pauseUpdates={this.state.data[i].pauseUpdates} 
          onAnchorFound={anchor  => this._onAnchorFound(anchor, this.state.data[i].name.toString())} 
         // onAnchorFound={(e) =>  this._onAnchorFound(e, i)}
         // onAnchorFound={this._onAnchorFound}
          onAnchorRemoved={this._onAnchorRemoved}
          onAnchorUpdated={this._onAnchorUpdated}
          key={i}
          >
            {this.getARScene(this.state.data[i].jsonRender, this.state.data[i].name.toString())}
          </ViroARObjectMarker>
        </ViroNode>
      ));
    }
  }
  return views;
}

/*OBTENTON DE LA SCENE ET LANCEMENTS DES DIFFERENTES FUNCTION DE CONSTRUCTION*/
getARScene(jsonRender, markerName) {
  var visibility = false;
  if(this.state.activeScene === markerName){
    visibility = true
  }
  //visible={visibility}
  return (
    <ViroNode position={[0, 0, 0]} >
          {this._getImages(jsonRender.ViroImages)}
          {this._getVideos(jsonRender.ViroVideos, markerName)}
          {this._getTexts(jsonRender.ViroTexts)}
          {this._getGeometries(jsonRender.ViroGeometries)}
          {this._getObjects3d(jsonRender.ViroObjects3d, markerName)}
          {this._getFlexViews(jsonRender.ViroFlexViews)}
    </ViroNode>
  )
}

/*FONCTIONS EVENTS*/

_onClickUrl(urlLink) {
  //Alert.alert("clicked");
  Linking.openURL("http://"+urlLink);
  
}
_onVideoTapped(){
  var videoControlsAnimationState = this.state.videoControlsAnimation;
  if (videoControlsAnimationState=="fadeIn"){
    videoControlsAnimationState="fadeOut";
  } else {
    videoControlsAnimationState="fadeIn";
  }

  this.setState({
    videoControlsAnimation:videoControlsAnimationState,
    runAnimation:true,
  });
}


_onClickVideo(VideoLink) {
  //this._togglePauseVideo();
  this.setState({
    videoPaused: {[VideoLink]:!this.state.videoPaused[VideoLink]},
  });
  
  //Alert.alert('okVideo ' + VideoLink);
  //this.props.sceneNavigator.viroAppProps._onLoadVideo(VideoLink);
 /* this.setState({
    videoPaused: !this.state.videoPaused,
  });*/
}
/*_togglePauseVideo() {
        this.setState({
          videoPaused: !this.state.videoPaused,
        })
}*/
_setARVideoRef(component) {
  this.arVideoRef = component;
  //Alert.alert(JSON.stringify(this.arVideoRef));
}

/*DEFINITION DE LA FUCTION DES TEXTS VIRO*/
_getTexts(viroTxts) {
  var arrayTxts = [];
  if (viroTxts) {
    var root = this;
    Object.keys(viroTxts).forEach((currentKey, index) => {
      if(viroTxts[currentKey] != null && viroTxts[currentKey] != undefined) {
        var boundTxtsClick = () => {};
        if (viroTxts[currentKey].linkUrl) {
          boundTxtsClick = this._onClickUrl.bind(this ,viroTxts[currentKey].linkUrl);
        }
        arrayTxts.push(
          <ViroText 
           key={currentKey} 
           textClipMode={viroTxts[currentKey].textClipMode}
           text={viroTxts[currentKey].text}
           position={viroTxts[currentKey].position}
           scale={viroTxts[currentKey].scale}
           rotation={viroTxts[currentKey].rotation}
           style={viroTxts[currentKey].style}
           onClick={boundTxtsClick} 
           animation={
            {name:viroTxts[currentKey].animationName, 
            run:this.state.playAnim,
            loop:viroTxts[currentKey].animationLoop,
            onFinish:this._animateFinished}
          }
          />
        );
      }
    });
  }
  return arrayTxts;
}
/*            &&
{viroVids[currentKey].controls?this._renderVideoControl(viroVids[currentKey].position, viroVids[currentKey].rotation): null}*/
/* DEFINIT VIDEOS */
_getVideos(viroVids, markerName) {
  var arrayVids = [];
  if (viroVids) {
    var root = this;
    Object.keys(viroVids).forEach((currentKey, index) => {
      if(viroVids[currentKey] != null && viroVids[currentKey] != undefined) {
        var boundVidsClick = () => {};
        var controlPosition = [0,0.001,0];
        if (viroVids[currentKey].url !== undefined) {
          boundVidsClick = this._onClickVideo.bind(this ,viroVids[currentKey].url);
        }
        let paused = true;
        if(this.state.activeScene === markerName){
          paused = false;
        }
        else {
          paused = true
        }
       /* this.state.videoPaused.map( item => {
          if(item[markerName]){
           paused = true;
          }
        });*/
        arrayVids.push(
          <ViroNode key={currentKey}
          position={[0,0,0]} 
          rotation={[0, 0, 0]} 
          >
           <ViroVideo 
            key={currentKey} 
            ref={this._setARVideoRef} 
            //paused={true} 
            loop={viroVids[currentKey].loop} 
            volume={viroVids[currentKey].volume} 
            resizeMode={ 'cover' } 
            height={viroVids[currentKey].height/7} 
            width={viroVids[currentKey].width/7}  
            muted={viroVids[currentKey].muted} 
            source={{uri:viroVids[currentKey].url}} 
            onClick={this._onVideoTapped} 
            reticleEnabled={this.state.videoControlsAnimation=="fadeIn"} 
            materials={viroVids[currentKey].materials} 
            //paused={this.state.videoPaused} 
            paused={paused} 
            //paused={this.state.videoPaused.map(value => value[markerName])}
            //paused={this.state.videoPaused[markerName]}
            //paused={this.state.videoPaused[markerName+"_"+index]?this.state.videoPaused[markerName+"_"+index]:true}
            //paused={this.state.videoPaused[markerName]?this.state.videoPaused[markerName]:true}
            //paused={this.state['videopaused'+markerName]} 

           seekToTime = {0} 
           // transformBehaviors={viroVids[currentKey].transformBehaviors}
            position={viroVids[currentKey].position}
            scale={viroVids[currentKey].scale}
            fullscreen={true} 
            rotation={viroVids[currentKey].rotation} 
            //onClick={boundVidsClick} 
            animation={
              {name:viroVids[currentKey].animationName, 
              run:this.state.playAnim,
              loop:viroVids[currentKey].animationLoop,
              onFinish:this._animateFinished}
            }
            //onClick={this._onClickVideo} 
            />
            {viroVids[currentKey].controls &&this._renderVideoControl(viroVids[currentKey].controlsPosition, viroVids[currentKey].rotation, viroVids[currentKey].scale, markerName, viroVids[currentKey].url)}
          </ViroNode>
        );
      }
    });
  }
  return arrayVids;
}

/* DEFINIT IMAGES */
_getImages(viroImgs) {
  var arrayImgs = [];
  if (viroImgs) {
    var root = this;
    Object.keys(viroImgs).forEach((currentKey, index) => {
      if(viroImgs[currentKey] != null && viroImgs[currentKey] != undefined) {
        var boundImgsClick = () => {};
        if (viroImgs[currentKey].linkUrl) {
          boundImgsClick = this._onClickUrl.bind(this ,viroImgs[currentKey].linkUrl);
        }
        arrayImgs.push(
          <ViroImage 
          key={currentKey} 
          loadingIndicatorSource={require('./res/local_spinner.jpg')} 
          source={{uri:viroImgs[currentKey].url}} 
          scale={viroImgs[currentKey].scale}
          rotation={viroImgs[currentKey].rotation}
          height={viroImgs[currentKey].height/12}
          width={viroImgs[currentKey].width/12}
          position={viroImgs[currentKey].position}
          onClick={boundImgsClick} 
          animation={
            {name:viroImgs[currentKey].animationName, 
            run:this.state.playAnim,
            loop:viroImgs[currentKey].animationLoop,
            onFinish:this._animateFinished}
          }
          />
        );
      }
    });
  }
  return arrayImgs;
}

/* DEFINIT GEOMETRIES */
_getGeometries(viroGeos) {
  var arrayGeos = [];
  if (viroGeos) {
    var root = this;
    Object.keys(viroGeos).forEach((currentKey, index) => {
      if(viroGeos[currentKey] != null && viroGeos[currentKey] != undefined) {
        arrayGeos.push(
          <ViroGeometry 
            key={currentKey} 
            scale={viroGeos[currentKey].scale} 
            rotation={viroGeos[currentKey].rotation} 
            position={viroGeos[currentKey].position}
            materials={viroGeos[currentKey].materials}
            vertices={viroGeos[currentKey].vertices}
            normals={viroGeos[currentKey].normals}
            texcoords={viroGeos[currentKey].texcoords}
            triangleIndices={viroGeos[currentKey].triangleIndices} 
            animation={
              {name:viroGeos[currentKey].animationName, 
              run:this.state.playAnim,
              loop:viroGeos[currentKey].animationLoop,
              onFinish:this._animateFinished}
            }
              />
        );
      }
    });
  }
  return arrayGeos;
}
/*          <ViroMaterialVideo ref={"VIDEO_1141_REF"} material={viroObjs[currentKey].materials} paused={this.state.videoPaused} loop={false}></ViroMaterialVideo>
*/
/* DEFINIT OBJET 3D */
_getObjects3d(viroObjs, markerName) {
  var arrayObjs = [];
  //console.log(markerName);
  if (viroObjs) {
    var root = this;
    var controlPosition = [0,0.001,0];
  /* this.setState({
     videoPaused: { ...this.state.videoPaused, [markerName]: true }
    });*/
    //let array = this.state.videoPaused;
    //alert(markerName);
    //alert(JSON.stringify(this.state.videoPaused[markerName]));
    //console.log(this.state.videoPaused[markerName]);
    Object.keys(viroObjs).forEach((currentKey, index) => {
      if(viroObjs[currentKey] != null && viroObjs[currentKey] != undefined) {
        let paused = true;
        if(this.state.activeScene === markerName){
          paused = false;
        }
        else {
          paused = true
        }
       /* var paused = null;
        this.state.videoPaused.map( item => {
          if(item[markerName]){
           paused = true;
          }
        });*/
        /*this.state.videoPaused.filter(markerPaused => {
          // console.log(markerName );
           if(markerPaused[markerName]) {
             paused= markerPaused[markerName];  
           }
         }) ; */
        arrayObjs.push(
          <ViroNode key={currentKey}
          position={[0,0,0]} 
          rotation={[0, 0, 0]} 
          >
          <Viro3DObject
            key={currentKey}
            source={{uri:viroObjs[currentKey].url}}
            /*resources={[require('./res/spaceship.mtl'),
                require('./res/texture1.jpg'),
                require('./res/texture2.jpg'),
                 require('./res/texture3.jpg')]}*/
            highAccuracyEvents={viroObjs[currentKey].accuracy}
            scale={viroObjs[currentKey].scale} 
            rotation={viroObjs[currentKey].rotation}
            position={viroObjs[currentKey].position} 
            type={viroObjs[currentKey].type} 
            materials={viroObjs[currentKey].materials} 
            //transformBehaviors={viroObjs[currentKey].transformBehaviors}
            animation={
              {name:viroObjs[currentKey].animationName, 
              run:this.state.playAnim,
              loop:viroObjs[currentKey].animationLoop,
              onFinish:this._animateFinished}
            }
            />
          {viroObjs[currentKey].materialVideo &&
          <ViroMaterialVideo 
            //key={currentKey}
            ref={this._setARVideoRef}  
            material={viroObjs[currentKey].materials} 
            paused={paused}
            //paused={this.state.videoPaused[markerName]}
           // paused={this.state.videoPaused[markerName]?this.state.videoPaused[markerName]:true}
            //paused={this.state.videoPaused[markerName]}
            //paused={true}
           // paused={this.state.videoPaused[markerName+"_"+index]?this.state.videoPaused[markerName+"_"+index]:true}
            //paused={this.state.videoPaused} 
            //paused={this.state.videoPaused.bouteille?this.state.videoPaused.bouteille:true}
            //paused={this.state['videopaused'+markerName]}
            //paused={this.state + ".videopaused_" + markerName} 
            loop={viroObjs[currentKey].materialsLoop}>
          </ViroMaterialVideo> }
          {viroObjs[currentKey].controls &&this._renderVideoControl(viroObjs[currentKey].controlsPosition, [-90, 0, 0] ,viroObjs[currentKey].scale, markerName, viroObjs[currentKey].videoUrl)}

          </ViroNode>
        );
      }
    });
  }
  return arrayObjs;
}
/* DEFINIT FLEXVIEW */
_getFlexViews(viroFlexs) {
  var arrayFlexs = [];
  if (viroFlexs) {
    var root = this;
    Object.keys(viroFlexs).forEach((currentKey, index) => {
      if(viroFlexs[currentKey] != null && viroFlexs[currentKey] != undefined) {
        arrayFlexs.push(
          <ViroFlexView 
            //style={{flexDirection: 'row', padding: .1}}
            scale={viroFlexs[currentKey].scale} 
            rotation={viroFlexs[currentKey].rotation}
            position={viroFlexs[currentKey].position} 
            backgroundColor={'rgba(0,255,255,0.1)'} 
            animation={
              {name:viroFlexs[currentKey].animationName, 
              run:this.state.playAnim,
              loop:viroFlexs[currentKey].animationLoop,
              onFinish:this._animateFinished}
            }
          >
            <ViroImage 
              source={{uri:viroFlexs[currentKey].url}} 
              height={viroFlexs[currentKey].height/12}
              width={viroFlexs[currentKey].width/12}
              style={{flex: .5}} 
            />
          </ViroFlexView>
        );
      }
    });
  }
  return arrayFlexs;
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
this.setState({
  playAnim: false,
  //videoPaused: true
})
//this.props.sceneNavigator.viroAppProps._onResetScanAr();

}
_onAnchorFound(anchor, markerName) {
  //Alert.alert(anchor.anchorId);
  //Alert.alert(markerName);
  //Alert.alert(this.state.videoPaused[markerName]);
  //if(name == "chocolat") 
  /*this.setState({
    videoPaused: {
      [markerName]: true
    }
  })*/
  /*videoPaused: {
    default: true,
  },*/
  //const bouteille = "bouteille";
 /* let obj = {
    [markerName]: true,
  }*/
  //alert(JSON.stringify(obj));
  //let finalData = { ...this.state.videoPaused, ...obj }

  // Create a new array based on current state:
let VidePausedVal = [...this.state.videoPaused];
//let newState = Object.assign({}, this.state.videoPaused);


/*this.setState(prevState => ({
  videoPaused: prevState.videoPaused.map(
  obj => (obj._id === [markerName] ? Object.assign(obj, { description: "New Description" }) : obj)
)
}));*/
/*let filteredArray = VidePausedVal.filter(item => item !== [markerName]);
let filteredArray2 = VidePausedVal.filter(item => item !== markerName);*/
/*this.setState(prevState => ({
  videoPaused: prevState.videoPaused.map(
  obj => (obj[markerName] === [markerName] ? Object.assign(obj, { [markerName]: false }) : obj)
)
}));*/

const newState = {};

/*Object.keys(this.state.videoPaused).forEach(key => {
    if (key.endsWith(markerName)) {
      newState[key] = false;
    }
    else {
      newState[key] = true;
    }
});*/
//alert(this.state.videoPaused[markerName])
/*const { user } = { ...this.state.videoPaused };
const currentState = user;*/
  //const { name, value } = e.target;
const newResults = this.state.videoPaused.map( (item, index) => {
  
  //item["two"] = true;
  //console.log(item["two"]);
  if(item[markerName]){
    //console.log(item);
   item[markerName] = false;
  }
 /* else {
    item[0] = true;
  }*/
  return item;
});


   this.setState({ 
    //videoPaused: newResults,
    activeScene: markerName,
    foundAnchor : anchor,
    playAnim: true,
    });
   

  this.props.sceneNavigator.viroAppProps._changeStateScanline();
}
_onResetArScene() {
  /*this.setState({
    playAnim: false,
    videoPaused: true,
  });*/
  if (this.props.sceneNavigator.viroAppProps.resetScene){
    Alert.alert("update");
    //this.props.sceneNavigator.resetARSession(true, true);
    
    this.props.sceneNavigator.viroAppProps._onResetScanAr();
    this.makeRemoteRequest();
  }
}


_togglePauseVideo(markerName) {
  //alert(markerName);
  this.setState({
    activeScene: markerName,
  });
}

_toggleFullscreenVideo(videoUrl) {
  //alert(markerName);
  this.setState({
    activeScene: null,
  });
  this.props.sceneNavigator.viroAppProps._onLoadVideo(videoUrl);
 /* this.setState({
    activeScene: markerName,
  });*/
}

  /**
   * Render a set of Video UI Controls. This includes (in the order displayed from left to right):
   * Restart, Previous Video, Play/Pause, Next Video, Volume.
   */
  _renderVideoControl(position, rotation, scale, markerName, videoUrl){
    if (this.state.activeScene !== markerName ){
      return(
          <ViroNode 
          //position={[0,0,0.05]} 
          opacity={1.0}
          position={position}
          //position={position} 
          rotation={rotation} 
        //scale={scale} 
          //opacity={1.0}
            /*animation={
              { name : this.state.videoControlsAnimation, run : this.state.runAnimation, loop : false}
            } */
            >
           {/*} <ViroImage
            //scale={scale}
            position={position}
              scale={[0.1, 0.025, 0.1]}
              //position={[0, 0.01, 0]}
              source={require("./res/controls/player_controls_container.png")} />*/}
             {this._renderPlayControl(markerName, videoUrl, position, rotation)}
          </ViroNode>
      );
    }
  }

  /**
   * Renders either the play or pause icon depending on video state.
   */
  _renderPlayControl(markerName, videoUrl, position, rotation){
    //alert(markerName)
   // if (this.state.activeScene === !markerName ){
      return (
        <ViroNode 
        opacity={1.0}
        position={position}
        //rotation={rotation} 
        >
          <ViroImage
              position={[0,0,0.002]}
              scale={[0.5, 0.5, 0.5]}
              width={buttonSize}
              height={buttonSize}
              //placeholderSource={require("./res/local_spinner.jpg")}
              source={require("./res/controls/icons-play.png")}
              onClick={() => {this._togglePauseVideo(markerName)}}
          />
          <ViroImage
              position={[0.025,0,0.002]}
              scale={[0.5, 0.5, 0.5]}
              width={buttonSize}
              height={buttonSize}
              //placeholderSource={require("./res/local_spinner.jpg")}
              source={require("./res/controls/icons-fullscreen.png")}
              onClick={() => {this._toggleFullscreenVideo(videoUrl)}}
          />
          </ViroNode>
      );
    //}
    /* else {

      <ViroButton
              position={[0,0,0.002]}
              scale={[0.5, 0.5, 0.5]}
              width={buttonSize}
              height={buttonSize}
              source={require("./res/controls/icons-play.png")}
              hoverSource={require("./res/controls/icons-play.png")}
              clickSource={require("./res/controls/icons-play.png")}
              onClick={() => {this._togglePauseVideo(markerName)}}
              //onClick={this._togglePauseVideo(markerName)}
      />
      return (
          <ViroButton
              position={[0,0,0.01]}
              scale={[0.5, 0.5, 0.5]}
              width={buttonSize}
              height={buttonSize}
              source={require("./res/controls/pause.png")}
              hoverSource={require("./res/controls/pause_hover.png")}
              clickSource={require("./res/controls/pause_hover.png")}
              onClick={() => {this._togglePauseVideo(markerName)}}
              />
      );
    }*/
  }

render() {
  //console.log('render Markers');
  //alert(JSON.stringify(this.state.activeScene["chocolat"]));
  //alert(JSON.stringify(this.state.videoPaused));
/*  console.log(this.state.videoPaused[1]);
  const choc = "chocolat";
 // var test = this.state.videoPaused.map(value => 
 //   value["chocolat"]);
  console.log(this.state.videoPaused.map(value => 
    {if(value["chocolat"]){
      console.log(value["chocolat"])
    }}
    ));*/


    //var test = this.state.items.filter(item => item == choc );
    //const test = this.state.videoPaused.find(task => (task[0] === choc), this);
   // console.log(test);

  
    //this._onResetArScene();
    let loadMarkersTargets = this._createAllMarkersTargets();
    let loadMaterials =  this._createAllMaterials();
    let loadAnimations =  this._createAllAnimations();
    let loadMarkers = this._loadAllMarkers();
  //  this._createAllMarkersTargets();
  //  this._createAllMaterials();
   // this._createAllAnimations();
   if (!this.state.loadingData && !this.state.isLoading ) {
    //console.log(this.props)
    // console.log(this.props.arSceneNavigator.viroAppProps.resetScene)
     console.log(this.state.loadingData)
     console.log(this.state.isLoading)
   return (
    
    <ViroARScene onTrackingUpdated={this._onInitialized} 
    //anchorDetectionTypes={'PlanesHorizontal'} 
    >
    {loadMarkersTargets}
    {loadMaterials}
    {loadAnimations}
    {loadMarkers}
      
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
    </ViroARScene>
    );
   } else {
    return null;
  }
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
backgroundVideo: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},
});
ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
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

/*ViroMaterials.createMaterials({
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
video_material: {
  shininess: 2.0,
  lightingModel: "Lambert",
  diffuseTexture: {uri:"http://pierregagliardi.com/reactapp/js/ice/video/realite-ice-2.mp4"},
},
});*/

/*ViroAnimations.registerAnimations({
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
  },
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
});*/
//export default connect(selectProps, mapDispatchToProps)(withNavigation(ArScreen));
module.exports = withNavigation(Markers);
