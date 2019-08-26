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


export default class BusinessCard extends Component {
  constructor(props) {
    super(props);
// bind 'this' to functions
this._onAnchorFound = this._onAnchorFound.bind(this);
this._onAnchorRemoved = this._onAnchorRemoved.bind(this);
this._onAnchorUpdated = this._onAnchorUpdated.bind(this);
this._onTrackingInit = this._onTrackingInit.bind(this);
this._loadAllMarkers = this._loadAllMarkers.bind(this);
this._createAllMarkersTargets = this._createAllMarkersTargets.bind(this);
this._getQuad = this._getQuad.bind(this);
this._getTexts = this._getTexts.bind(this);
this._getVideos = this._getVideos.bind(this);
this._getImages = this._getImages.bind(this);
//this._linkPressed = this._linkPressed.bind(this);
//this._getBoxs = this._getBoxs.bind(this);
//this._onClickLink = this._onClickLink.bind(this,urlLink);
//this._onClickUrl = this._onClickUrl.bind(this);

//this._onDisplayDialog = this._onDisplayDialog.bind(this);

    // Set initial state here
    this.state = {
      data: [],
      jsonRender: [],
      viroTexts: [],
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

  /*const a = setTimeout(() => {
    this.setState({
      addImageMarker : true,
    })
    // do some stuff here

  }, 3000);*/
  //this._createAllMarkersTargets();
     //alert(imageMarker)
     /*setTimeout(()=>{
      this.setState({
        addImageMarker : true,
      })
    }, 5000);*/
}



makeRemoteRequest = () => {
 
 const jsonFile = webUrl + 'ice.json';
 this.setState({ loading: true, isLoading: true, });

 fetch(jsonFile)
   .then(res => res.json())
   .then(res => {  
     this.setState({

       isFetching: true,

       data: res.markers,

       totalItemNumber: res.markers.length
     }, function() { 
       
      /*this.state.data.forEach(function(item, i) {
        alert(i);
      });*/
          // In this block you can do something with new state.
     });
   })
   .catch(error => {
   //alert(error);
   console.error(error);
     this.setState({ error, loading: false });
   });
}

_createAllMarkersTargets(){


  //var ARImageMarkersTargets = [];
  var imageMarkers = '';
  var imageMarkersNames  = '';
  var ARImageMarkersTargets = {};
  var physicalWidths  = '';
  if (!this.state.addImageMarker) {
    return;
  }
  var objarray = {};
  var test = {};
 //alert(this.state.data);
 var values = [];
  //alert(this.state.data.length);
  for (let x = 0; x < this.state.totalItemNumber; x++){
    //alert(this.state.data[i].key)
     // Iterate through your marker data here to 
     imageMarkers = webUrl + this.state.data[x].folderName + this.state.data[x].name + '/res/' + this.state.data[x].imageMarker;
     console.log(imageMarkers);
     imageMarkersNames = this.state.data[x].name.toString();//JSON.stringify(this.state.data[x].name);
     //console.log(imageMarkersNames);
     //console.log(imageMarkersNames.toString());
     physicalWidths = this.state.data[x].physicalWidth;
     console.log(physicalWidths);
  var key = this.state.data[x].name.toString();
    ARImageMarkersTargets[key] = {
        source: {
          uri :  `${imageMarkers}`
         },
         orientation : this.state.data[x].orientation,
         physicalWidth : this.state.data[x].physicalWidth,
         type: 'Image'
    };

}


console.log(ARImageMarkersTargets);

return ViroARTrackingTargets.createTargets(ARImageMarkersTargets);

//return ViroARTrackingTargets.createTargets(essaimarker);//ViroARTrackingTargets.createTargets({ARImageMarkersTargets});
}

_loadAllMarkers(){
  var views = [];

  var marker = this.state.data;
  var y = 0;

  if (!this.state.addImageMarker) {
    return;
  }
//alert("passer");
//alert(this.state.totalItemNumber);

for (let i = 0; i < this.state.totalItemNumber; i++){
 /* this.setState({
jsonRender: this.state.data[i].jsonRender
  });*/
      // Iterate through your marker data here to
      views.push((
        <ViroNode position={[0, 0, 0]} key={this.state.data[i].name} >
      <ViroARImageMarker target={this.state.data[i].name.toString()} pauseUpdates={this.state.pauseUpdates} 
      onAnchorFound={this._onAnchorFound}
      onAnchorRemoved={this._onAnchorRemoved}
      onAnchorUpdated={this._onAnchorUpdated}
      key={this.state.data[i].name}
      >
       {this.getARScene(this.state.data[i].jsonRender)}
      </ViroARImageMarker>
      </ViroNode>
));
     console.log(this.state.data[i].jsonRender);
    // alert(this.state.data[i].jsonRender.ViroTexts.text);
  }
  return views;

}
/*{this._getTexts(this.state.jsonRender.ViroTexts)}
        {this._getVideos(this.state.jsonRender.ViroVideos)}
        {this._getImages(this.state.jsonRender.ViroImages)}
        {this._getImageMarkers()}
        
      <ViroBox rotation={[-90, 0, 0]}  position={[0, 0, 0]} scale={[.01,.01,.01]}/>
      <ViroQuad 
          rotation={[-90, 0, 0]} 
          scale={[.1,.1,.1]}
          materials={"green_plane"}/>

           {this._getQuad()}

           <ViroARPlane minHeight={.5} minWidth={.5}>
        <ViroQuad
          rotation={[-90, 0, 0]}
          scale={[.5,.5,1]}
          materials={"green_plane"}/>
       

        </ViroARPlane>

        <ViroBox rotation={[-90, 0, 0]} position={[0, 0, 0]} scale={[.01,.01,.01]}/>
      <ViroQuad 
          rotation={[-90, 0, 0]} 
          position={[0, 0, 0]} 
          scale={[.1,.1,.1]}
          materials={"green_plane"}/>

           position={this.state.foundAnchor.position}
        */

getARScene(jsonRender) {
  /*if (jsonRender)
  {
alert("jsonrender");
  }*/
  return (
    <ViroNode position={[0, 0, 0]}
             >
          {this._getTexts(jsonRender.ViroTexts)}
          {this._getVideos(jsonRender.ViroVideos)}
          {this._getImages(jsonRender.ViroImages)}

          


</ViroNode>


  )
}

/* DEFINED QUAD SHAPE */
_getQuad() {
  if (this.state.foundAnchor) {
    alert(this.state.foundAnchor.rotation);
  return (


        <ViroQuad
          rotation={[0, 0, 0]}
          scale={[.15,.15,.15]}
          materials={"green_plane"}/>
          


  )
  }
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
             return
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
           /* onClick={this._onClickVideo}*/ />
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


_getImagesold(viroImgs) {
  if (viroImgs != null) {
    var arrayImgs = [];
    {viroImgs.forEach( (img, i) => {
      return (
        <ViroImage 
        key={i}  
        height={img.height/1}
        width={img.width/1}
        source={{uri:img.url}}
        position={img.position}
        //scale={vid.scale}
        rotation={img.rotation}
        //onPress=this._onClickLink.bind(this, img.linkUrl)
        //onPress={this._onClickLink(img.linkUrl)} 
        />
       ); 
  })}
    /*{viroImgs.map(function(img, i) =>
      return (

          <ViroImage 
          key={i}  
          height={img.height/12}
          width={img.width/12}
          source={{uri:img.url}}
          position={img.position}
          //scale={vid.scale}
          rotation={img.rotation}
          //onPress=this._onClickLink.bind(this, img.linkUrl)
          onClick={this._onClickLink(img.linkUrl)} 
          />

      )
    )};*/

  }
}


_getImages(viroImgs) {
  if (viroImgs != null) {

    this.setState({
      viroTexts:viroImgs
    })
    var arrayImgs = [];
    //var boundImgsClick = '';
    viroImgs.forEach(function(img, i){
      if (img.linkUrl !== undefined) {
      //Linking.openURL("http://www.pierregagliardi.com");
      //boundImgsClick = Linking.openURL("http://www.pierregagliardi.com");//this._linkPressed("http://www.pierregagliardi.com");
      //boundImgsClick = this._onClickLink(img.linkUrl);
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
          
          onClick={this._onClickLink.bind(null,img.linkUrl)}
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
  /*this.setState({
    foundAnchor : anchor
  });*/
  /*alert(anchor.anchorId);
  alert(anchor.position);
  alert(anchor.rotation);
  alert(anchor.center);*/
 //console.log("update " + anchor.position);
 /* const foundAnchor= anchor;
  this.props.sceneNavigator.viroAppProps._changeStateScanline();
  this.props.sceneNavigator.viroAppProps._onLoadStart();*/
  /*this.setState({
    runAnimation: true,
  });*/

}
_onAnchorRemoved(anchor) {
 //alert("Removed " + anchor.position);
  console.log("uremove " + anchor.position);
  /*alert(anchor.position);
  alert(anchor.rotation);
  alert(anchor.center);*/

  /*this.props.sceneNavigator.viroAppProps._changeStateScanline();
  this.props.sceneNavigator.viroAppProps._onLoadStart();*/
  /*this.setState({
    runAnimation: true,
  });*/

}

_onAnchorFound(anchor) {
  this.setState({
    ///runAnimation: true,
    foundAnchor : anchor,
    //pauseUpdates: true,
  });
  //alert(anchor.anchorId);
  //alert(anchor.position);
  console.log("uposition " + anchor.position);
  console.log("center " + anchor.center);
  alert("center " + anchor.center);
  //alert(anchor.rotation);
  /*alert(anchor.center);*/

  this.props.sceneNavigator.viroAppProps._changeStateScanline();
  this.props.sceneNavigator.viroAppProps._onLoadEnd();


}



  render() {
    this._createAllMarkersTargets();
    //{ this.state.isTracking ? this.getNoTrackingUI() : this._createAllMarkersTargets()  }
   return (
    
    
      <ViroARScene onTrackingUpdated={this._onInitialized} 
      anchorDetectionTypes={'PlanesHorizontal'}
      //anchorDetectionTypes={['PlanesHorizontal', 'PlanesVertical']}
      //displayPointCloud={true} 
      >
      
       { this.state.isTracking ? this.getNoTrackingUI() : this._loadAllMarkers() }
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

  
    _onShowObject(objIndex, objUniqueName, yOffset) {
      this.setState({
          viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName, objectSource:objArray[objIndex]},
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
    flex: .5
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

module.exports = BusinessCard;
