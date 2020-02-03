'use strict';

import React, { Component } from 'react';

import { StyleSheet, Alert, View, StatusBar, Dimensions, Linking, Animated } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
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
  ViroSpinner,
  ViroQuad,
  ViroButton,
  ViroSurface,
  ViroARPlaneSelector
} from 'react-viro';

//import ViroARPlaneSelectorCustom from '../../../ViroComponents/ViroARPlaneSelectorCustom'
import {
  _getVideos,
  _getTexts,
  _getImages,
  _getGeometries,
  _getObjects3D,
  _getFlexViews,
  createState,
  _createAllMaterials,
  _createAllAnimations
} from '../../../utils/viro'
//import Intro from '../Intro/Intro';
var {
  width,
  height
} = Dimensions.get('window');
class DemoAr extends Component {
  constructor(props) {
    super(props)
    this.createState = createState.bind(this)
    const stateViro = this.createState()
    //console.log(stateViro)
    this.state = {
      ...stateViro,
      plane: [0, 0, 0],
      paused: false,
      //data: [],
      //materials: [],
      //animations: [],
      data: this.props.arSceneNavigator.viroAppProps.data,
      materials: this.props.arSceneNavigator.viroAppProps.materials,
      animations: this.props.arSceneNavigator.viroAppProps.animations,
      jsonRender: [],
      loadVideo: true,
      //dataMarker: this.state.data.markers,
      trackingInitialized: false,
      text: "Initializing AR...",
      top: height,
      isFetching: false,
      isTracking: false,
      initialized: false,
      runAnimation: false,
      addImageMarker: true,
      text: "test",
      totalItemNumber: 0,
      loading: false,
      isLoading: false,
      foundAnchor: '',
      pauseUpdates: false,
      videoPaused: [],
      playAnim: [],
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
      buffering: true,
      animated: new Animated.Value(0),
    }

    var lastTap = null;
    //this.checkInput = checkInput.bind(this)
    this._planeSelected = this._planeSelected.bind(this);
    this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
    //this._createAllMaterials = this._createAllMaterials.bind(this);
    //this._createAllAnimations = this._createAllAnimations.bind(this);
    this._loadAllMarkers = this._loadAllMarkers.bind(this);
    this._setARNodeRef = this._setARNodeRef.bind(this);
    this._setARVideoRef = this._setARVideoRef.bind(this);
    //this._onClickVideo = _onClickVideo.bind(this);
    this._getVideos = _getVideos.bind(this);
    this._getTexts = _getTexts.bind(this);
    this._getImages = _getImages.bind(this);
    //this.handleDoubleTap = handleDoubleTap.bind(this);
    //this._createMaterial = this._createMaterial.bind(this);
    /*this._onClickUrl = this._onClickUrl.bind(this);
    this._onClickVideo = this._onClickVideo.bind(this);*/
    //this._renderVideoControl = this._renderVideoControl.bind(this);
    //this._togglePauseVideo = this._togglePauseVideo.bind(this);
    //this._getQuad = this._getQuad.bind(this);
    this._onClickUrl = this._onClickUrl.bind(this);
    this._onClickVideo = this._onClickVideo.bind(this);
    //this._getTexts = this._getTexts.bind(this);
    //this._getVideos = this._getVideos.bind(this);
    //this._getImages = this._getImages.bind(this);
    this._getGeometries = _getGeometries.bind(this);
    this._getObjects3d = _getObjects3D.bind(this);
    this._getFlexViews = _getFlexViews.bind(this);
    this.getARScene = this.getARScene.bind(this);
    this._onVideoFinished = this._onVideoFinished.bind(this);
    //this._onUpdateTime = this._onUpdateTime.bind(this);
    this._onVideoError = this._onVideoError.bind(this);
    //this._onVideoBufferStart = this._onVideoBufferStart.bind(this);
    //this._onVideoBufferEnd = this._onVideoBufferEnd.bind(this);
    this._onPinch = this._onPinch.bind(this);
    this._onRotate = this._onRotate.bind(this);
    //this.handleDoubleTap = this.handleDoubleTap.bind(this);

    /*this.setState({
      data: this.props.arSceneNavigator.viroAppProps.data,
      materials: this.props.arSceneNavigator.viroAppProps.materials,
    animations: this.props.arSceneNavigator.viroAppProps.animations,
    // totalItemNumber: this.props.arSceneNavigator.viroAppProps.item.markers.length,
    //jsonRender: this.props.arSceneNavigator.viroAppProps.item.jsonRender,
    });*/
  }

  /*componentWillMount() {
      this.setState({
          data: this.props.arSceneNavigator.viroAppProps.data,
          materials: this.props.arSceneNavigator.viroAppProps.materials,
        animations: this.props.arSceneNavigator.viroAppProps.animations,
       // totalItemNumber: this.props.arSceneNavigator.viroAppProps.item.markers.length,
        //jsonRender: this.props.arSceneNavigator.viroAppProps.item.jsonRender,
      });
      //alert(this.state.data);

  }*/
  componentDidMount = () => {
    //console.log(this.props.arSceneNavigator.viroAppProps.materials)
    //console.log(this.state.data)
    //console.log(this.props.arSceneNavigator.viroAppProps.data)
    _createAllMaterials(this.state.materials);
    _createAllAnimations(this.state.animations);
    this.setState(prevState => ({
      videoPaused: { ...prevState.videoPaused, [this.state.data.nom]: true },
      playAnim: { ...prevState.playAnim, [this.state.data.nom]: false }
    }));
  }

  handleDoubleTap = (markerName, index) => {

    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      //this.toggleLike();
      alert("double")
    } else {
      this.lastTap = now;
      this._onClickVideo(markerName, index);

    }
  }
  /* CREATION DES ANIMATIONS */
  /*FONCTIONS EVENTS*/

  _onClickUrl(urlLink) {
    //Alert.alert("clicked");
    Linking.openURL("http://" + urlLink);

  }
  _onClickVideo(markerName, index) {
    //_onClickVideo(VideoLink) {
    //this._togglePauseVideo();
    //alert(index);
    //console.log(index)
    //console.log(markerName)
    this.setState({
      videoPaused: { [markerName.nom + "_" + index]: !this.state.videoPaused[markerName.nom + "_" + index] },
    });
    //console.log(this.state)

  }
  handleLoadStart = () => {
    this.triggerBufferAnimation();
  };

  triggerBufferAnimation = () => {
    alert('ok')
    this.loopingAnimation && this.loopingAnimation.stopAnimation();
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
      })
    ).start();
  };

  handleBuffer = meta => {
    meta.isBuffering && this.triggerBufferAnimation()

    if (this.loopingAnimation && !meta.isBuffering) {
      this.loopingAnimation.stopAnimation();
    }

    this.setState({
      buffering: meta.isBuffering,
    });
  };

  /*
 Pinch scaling should be relative to its last value *not* the absolute value of the
 scale factor. So while the pinching is ongoing set scale through setNativeProps
 and multiply the state by that factor. At the end of a pinch event, set the state
 to the final value and store it in state.
 */
  _onPinch(pinchState, scaleFactor, source) {

    var newScale = this.state.scale.map((x) => { return x * scaleFactor })

    if (pinchState == 3) {
      this.setState({
        scale: newScale
      });
      //this.props.onClickStateCallback(this.props.modelIDProps.uuid, pinchState, UIConstants.LIST_MODE_MODEL);
      return;
    }

    this.arNodeRef.setNativeProps({ scale: newScale });
    /*  this.arVideoRef.setNativeProps({paused:!this.state.videoPaused});
      this.setState({
        videoPaused: !this.state.videoPaused,
      })*/
    //this.spotLight.setNativeProps({shadowFarZ: 6 * newScale[0]});
  }


  /*
   Rotation should be relative to its current rotation *not* set to the absolute
   value of the given rotationFactor.
   */
  _onRotate(rotateState, rotationFactor, source) {

    if (rotateState == 3) {
      this.setState({
        rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      });
      //this.props.onClickStateCallback(this.props.modelIDProps.uuid, rotateState, UIConstants.LIST_MODE_MODEL);
      return;
    }

    this.arNodeRef.setNativeProps({ rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]] });

  }
  _setARVideoRef = (component) => {
    this.arVideoRef = component;
    //Alert.alert(JSON.stringify(this.arVideoRef));
  }
  _onVideoFinished = () => {
    //console.log("Video finished!");
  }
  _onUpdateTime = (current, total) => {
    //console.log("Video time update, current: " + current + ", total: " + total);
    /*if(current>10) {
      this.setState({loadVideo: false})
      //console.log('state load video' , this.state.loadVideo)
    }*/
  }
  _onVideoError = (event) => {
    //console.log("Video loading failed with error: " + event.nativeEvent.error);
  }
  _onVideoBufferStart = () => {
    //console.log('buffer video start')
    //this.setState({loadVideo: true})
    //Alert.alert(JSON.stringify(this.arVideoRef));
  }
  _onVideoBufferEnd = () => {
    //console.log('buffer video end')
    this.setState({ loadVideo: false })
    // Alert.alert(JSON.stringify(this.arVideoRef));
  }
  /*_restartVideo() {
    this.refs[VIDEO_REF].seekToTime(0);
  }*/
  _createAllAnimations() {
    //var AnimationsArray = this.state.data;
    /*if (!this.state.addImageMarker) {
      return;
    }*/
    let animations = {};
    ////console.log(this.props.arSceneNavigator.viroAppProps);
    for (let z = 0; z < this.state.animations.length; z++) {
      // Iterate through your marker data here to 
      //var key = this.state.data[x].name.toString();
      ////console.log(this.state.animations[z].name);
      var key = this.state.animations[z].name;
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


  _animateFinished = (markerName) => {
    //console.log('onanimated finish')
    this.setState(prevState => ({
      //videoPaused: { ...prevState.videoPaused, [this.state.data.nom]: !this.state.videoPaused[this.state.data.nom] },
      playAnim: { ...prevState.playAnim, [markerName]: false }
    }));
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
    for (let w = 0; w < this.state.materials.length; w++) {
      // Iterate through your marker data here to 
      //var key = this.state.data[x].name.toString();
      var key = this.state.materials[w].name.toString();
      materials[key] = {
        diffuseTexture: {
          uri: `${this.state.materials[w].properties.diffuseTextureUrl}`
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
  /*CREATION DES DIFFERENTES SCENE AR*/

  _loadAllMarkers() {
    var views = [];

    var marker = this.state.data;
    var y = 0;

    /*if (!this.state.addImageMarker) {
       return;
     }*/
    //console.log(this.state.data)

    //for (let i = 0; i < this.state.totalItemNumber; i++) {
    // Iterate through your marker data here to
    if (this.state.data.type === "Image") {
      //console.log("image " + this.state.data.type + " " + this.state.data.nom);
      views.push((
        <ViroNode position={[0, 0, 0]} key={this.state.data.nom} >
          <ViroARImageMarker target={this.state.data.nom}
            pauseUpdates={this.state.data.pauseUpdates}
            //onAnchorFound={anchor => this._onAnchorFound(anchor, this.state.data.nom)}
            // onAnchorFound={this._onAnchorFound}
            //onAnchorRemoved={this._onAnchorRemoved}
            //onAnchorUpdated={this._onAnchorUpdated}
            key={this.state.data.nom}
          >
            {this.getARScene(this.state.data.jsonRender, this.state.data.nom)}
          </ViroARImageMarker>
        </ViroNode>
      ));
    }
    else {
      //console.log("object " + this.state.data.type + " " + this.state.data.nom);

      views.push((
        <ViroNode position={[0, 0, 0]} key={this.state.data.nom} >
          <ViroARObjectMarker target={this.state.data.nom}
            pauseUpdates={this.state.data.pauseUpdates}
            onAnchorFound={anchor => this._onAnchorFound(anchor, this.state.data.nom)}
            // onAnchorFound={(e) =>  this._onAnchorFound(e, i)}
            // onAnchorFound={this._onAnchorFound}
            onAnchorRemoved={this._onAnchorRemoved}
            onAnchorUpdated={this._onAnchorUpdated}
            key={this.state.data.nom}
          >
            {this.getARScene(this.state.data.jsonRender, this.state.data.nom)}
          </ViroARObjectMarker>
        </ViroNode>
      ));
    }
    // }
    return views;
  }

  _setARNodeRef(component) {
    this.arNodeRef = component;
  }
  /*OBTENTON DE LA SCENE ET LANCEMENTS DES DIFFERENTES FUNCTION DE CONSTRUCTION*/
  getARScene(jsonRender, markerName) {
    //console.log(jsonRender)
    //console.log(markerName)
    return (
      <ViroNode position={[0, 0, 0]} scale={[2, 2 , 2]} >
        {this._getImages(jsonRender.ViroImages, markerName, this)}
        {this._getVideos(jsonRender.ViroVideos, markerName, this)}
        {//this._getTexts(jsonRender.ViroTexts, markerName, this)
        }
        {//this._getGeometries(jsonRender.ViroGeometries, markerName, this)
        }
        {this._getObjects3d(jsonRender.ViroObjects3d, markerName, this)}
        {//this._getFlexViews(jsonRender.ViroFlexViews, markerName, this)
        }
      </ViroNode>
    )
  }

  /*            &&
  {viroVids[currentKey].controls?this._renderVideoControl(viroVids[currentKey].position, viroVids[currentKey].rotation): null}*/
  /* DEFINIT VIDEOS */
  /*_getVideoss(viroVids, markerName) {
    //console.log(viroVids)
    var arrayVids = [];
    if (viroVids) {
      var root = this;
      Object.keys(viroVids).forEach((currentKey, index) => {
        if (viroVids[currentKey] != null && viroVids[currentKey] != undefined) {
          var boundVidsClick = () => { };
          // let pausedValue = markerName+"_"+index;
          //alert(index);
          if (viroVids[currentKey].url !== undefined) {
            boundVidsClick = this._onClickVideo.bind(this, markerName + "_" + index);
          }
          arrayVids.push(
            <ViroNode key={currentKey}>
              <ViroVideo
                key={currentKey}
                ref={this._setARVideoRef}
                name={markerName + index}
                paused={viroVids[currentKey].paused}
                loop={viroVids[currentKey].loop}
                volume={viroVids[currentKey].volume}
                //resizeMode={ 'cover' } 
                height={viroVids[currentKey].height / 7}
                width={viroVids[currentKey].width / 7}
                muted={viroVids[currentKey].muted}
                source={{ uri: viroVids[currentKey].url }}
                paused={this.state.videoPaused[markerName + "_" + index]}
                //paused={this.state.videoPaused} 
                // transformBehaviors={viroVids[currentKey].transformBehaviors}
                position={[viroVids[currentKey].position.x, viroVids[currentKey].position.y, viroVids[currentKey].position.z]}
                scale={[1, 1, 1]}
                //scale={viroVids[currentKey].scale}
                //fullscreen={true} 
                rotation={[viroVids[currentKey].rotation.x, viroVids[currentKey].rotation.y, viroVids[currentKey].rotation.z]}
                onClick={() => { this.handleDoubleTap(markerName, index) }}
                materials={viroVids[currentKey].materials}
                //materials={["chromaKeyFilteredVideo"]}
                //onClick={boundVidsClick} 
                animation={
                  {
                    name: viroVids[currentKey].animationName,
                    run: this.state.playAnim,
                    loop: viroVids[currentKey].animationLoop,
                    onFinish: this._animateFinished
                  }
                }
                onFinish={this._onVideoFinished}
                onUpdateTime={this._onUpdateTime}
                onError={this._onVideoError}
                onBufferStart={this._onVideoBufferStart}
              //onLoadStart={this.handleLoadStart}
              //onBuffer={this.handleBuffer}
              //onClick={this._onClickVideo} 
              >
              </ViroVideo>

              {this.state.videoPaused &&
                <ViroNode>
                  <ViroFlexView style={{ flexDirection: 'column', padding: .1 }}
                    width={5.0} height={5.0}
                    position={[-5.0, 0.0, -2.0]}
                    rotation={[0, 45, 0]} >
                    <ViroSpinner
                      type='Light'
                      position={[0, 0, -2]}
                      style={{ flex: .5 }}
                    />

                  </ViroFlexView>
                </ViroNode>
              }
            </ViroNode>


          );
        }
      });
    }
    return arrayVids;
  }*/

  /* DEFINIT IMAGES */
  /*_getImagess(viroImgs) {
    //console.log(viroImgs);
    var arrayImgs = [];
    if (viroImgs) {
      var root = this;
      Object.keys(viroImgs).forEach((currentKey, index) => {
        if (viroImgs[currentKey] != null && viroImgs[currentKey] != undefined) {
          var boundImgsClick = () => { };
          if (viroImgs[currentKey].linkUrl) {
            boundImgsClick = this._onClickUrl.bind(this, viroImgs[currentKey].linkUrl);
          }
          arrayImgs.push(
            <ViroImage
              key={currentKey}
              //loadingIndicatorSource={require('./res/local_spinner.jpg')} 
              source={{ uri: viroImgs[currentKey].url }}
              scale={[1, 1, 1]}
              //scale={viroImgs[currentKey].scale}
              rotation={[viroImgs[currentKey].rotation.x, viroImgs[currentKey].rotation.y, viroImgs[currentKey].rotation.z]}
              height={viroImgs[currentKey].height / 12}
              width={viroImgs[currentKey].width / 12}
              position={[viroImgs[currentKey].position.x, viroImgs[currentKey].position.y, viroImgs[currentKey].position.z]}
              onClick={boundImgsClick}
              animation={
                {
                  name: viroImgs[currentKey].animationName,
                  run: this.state.playAnim,
                  loop: viroImgs[currentKey].animationLoop,
                  onFinish: this._animateFinished
                }
              }
            />
          );
        }
      });
    }
    return arrayImgs;
  }*/

  /* DEFINIT GEOMETRIES */
  /*_getGeometries(viroGeos) {
    var arrayGeos = [];
    if (viroGeos) {
      var root = this;
      Object.keys(viroGeos).forEach((currentKey, index) => {
        if (viroGeos[currentKey] != null && viroGeos[currentKey] != undefined) {
          arrayGeos.push(
            <ViroGeometry
              key={currentKey}
              scale={[1, 1, 1]}
              // scale={viroGeos[currentKey].scale} 
              rotation={viroGeos[currentKey].rotation}
              position={viroGeos[currentKey].position}
              materials={viroGeos[currentKey].materials}
              vertices={viroGeos[currentKey].vertices}
              normals={viroGeos[currentKey].normals}
              texcoords={viroGeos[currentKey].texcoords}
              triangleIndices={viroGeos[currentKey].triangleIndices}
              animation={
                {
                  name: viroGeos[currentKey].animationName,
                  run: this.state.playAnim,
                  loop: viroGeos[currentKey].animationLoop,
                  onFinish: this._animateFinished
                }
              }
            />
          );
        }
      });
    }
    return arrayGeos;
  }*/
  /*          <ViroMaterialVideo ref={"VIDEO_1141_REF"} material={viroObjs[currentKey].materials} paused={this.state.videoPaused} loop={false}></ViroMaterialVideo>
  */
  /* DEFINIT OBJET 3D */
  /* _getObjects3d(viroObjs, markerName) {
     var arrayObjs = [];
     if (viroObjs) {
       var root = this;
       Object.keys(viroObjs).forEach((currentKey, index) => {
         if (viroObjs[currentKey] != null && viroObjs[currentKey] != undefined) {
           var boundVidsClick = () => { };
           // let pausedValue = markerName+"_"+index;
           //alert(index);
           if (viroObjs[currentKey].url !== undefined) {
             boundVidsClick = this._onClickVideo.bind(this, markerName + "_" + index);
           }
           arrayObjs.push(
             <ViroNode key={currentKey}
               position={[0, 0, 0]}
               rotation={[0, 0, 0]}
             >
               <Viro3DObject
                 key={currentKey}
                 source={{ uri: viroObjs[currentKey].url }}
                 /*resources={[require('./res/spaceship.mtl'),
                     require('./res/texture1.jpg'),
                     require('./res/texture2.jpg'),
                      require('./res/texture3.jpg')]}*/
  /*highAccuracyEvents={viroObjs[currentKey].accuracy}
  scale={[1, 1, 1]}
  //scale={viroObjs[currentKey].scale} 
  rotation={viroObjs[currentKey].rotation}
  position={viroObjs[currentKey].position}
  type={viroObjs[currentKey].type}
  materials={viroObjs[currentKey].materials}
  transformBehaviors={viroObjs[currentKey].transformBehaviors}
  animation={
    {
      name: viroObjs[currentKey].animationName,
      run: this.state.playAnim,
      loop: viroObjs[currentKey].animationLoop,
      onFinish: this._animateFinished
    }
  }
  onClick={boundVidsClick}
/>
<ViroMaterialVideo
  //key={currentKey}
  ref={this._setARVideoRef}
  material={viroObjs[currentKey].materials}
  //paused={this.state['tapped_' + currentKey]}
  paused={this.state.videoPaused}
  paused={this.state.videoPaused[markerName + "_" + index]}
  loop={viroObjs[currentKey].materialsLoop}

>

</ViroMaterialVideo>

</ViroNode>
);
}
});
}
return arrayObjs;
}*/
  /* DEFINIT FLEXVIEW */
  /*_getFlexViews(viroFlexs) {
    var arrayFlexs = [];
    if (viroFlexs) {
      var root = this;
      Object.keys(viroFlexs).forEach((currentKey, index) => {
        if (viroFlexs[currentKey] != null && viroFlexs[currentKey] != undefined) {
          arrayFlexs.push(
            <ViroFlexView
              //style={{flexDirection: 'row', padding: .1}}
              scale={[1, 1, 1]}
              //scale={viroFlexs[currentKey].scale} 
              rotation={viroFlexs[currentKey].rotation}
              position={viroFlexs[currentKey].position}
              backgroundColor={'rgba(0,255,255,0.1)'}
              animation={
                {
                  name: viroFlexs[currentKey].animationName,
                  run: this.state.playAnim,
                  loop: viroFlexs[currentKey].animationLoop,
                  onFinish: this._animateFinished
                }
              }
            >
              <ViroImage
                source={{ uri: viroFlexs[currentKey].url }}
                height={viroFlexs[currentKey].height / 12}
                width={viroFlexs[currentKey].width / 12}
                style={{ flex: .5 }}
              />
            </ViroFlexView>
          );
        }
      });
    }
    return arrayFlexs;
  }*/



  _renderScene() {
    return (
      <ViroBox scale={[.5, 1, .1]} position={[0, .5, 0]} />
    )
  }
  _planeSelected() {
    this.setState(prevState => ({
      videoPaused: { ...prevState.videoPaused, [this.state.data.nom]: false },
      playAnim: { ...prevState.playAnim, [this.state.data.nom]: true }
    }));
  }

  // Callback fired when the app receives AR Tracking state changes from ViroARScene.
  // If the tracking state is not NORMAL -> show the user AR Initialization animation 
  // to guide them to move the device around to get better AR tracking.
  _onTrackingUpdated(state, reason) {
    var trackingNormal = false;
    if (state == ViroConstants.TRACKING_NORMAL) {
      trackingNormal = true;
    }
    // this.props.dispatchARTrackingInitialized(trackingNormal);
  }
  render() {
    //console.log(this.state)
    //this._createAllAnimations();
    //this._createAllMaterials();
    //this._onClickVideo();
    //let loadMarkers = this._loadAllMarkers();
    let getARScene = this.getARScene(this.state.data.jsonRender, this.state.data.nom)
    //let getARScene = this.getARScene() //this.state.data.jsonRender, this.state.data

    return (
      <ViroARScene
        onTrackingUpdated={this._onTrackingUpdated}
        anchorDetectionTypes={['PlanesHorizontal', 'PlanesVertical']}
      >
        {/*loadMarkers*/}
        <ViroARPlaneSelector minHeight={.05} minWidth={.05} maxPlanes={1} alignment={"Horizontal"} /*type={"image"}*/
          onPlaneSelected={() => {
            this.props.sceneNavigator.viroAppProps._hideMessage();
            this._planeSelected();
          }}
        >
          <ViroNode onPinch={this._onPinch} onRotate={this._onRotate} scale={this.state.scale} rotation={this.state.rotation} ref={this._setARNodeRef}>
            {//loadMarkers
            getARScene
            }
            {//getAllAnimations
            }
            {//getAllMaterials
            }
          </ViroNode>
        </ViroARPlaneSelector>
      </ViroARScene>
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
  videoCover: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  buffering: {
    backgroundColor: "#000",
  },
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
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5,
    backgroundColor: 'red',
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  }
});
//export default withNavigation(DemoAr);
module.exports = DemoAr;