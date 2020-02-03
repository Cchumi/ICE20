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
    Easing
} from 'react-native';
//import { withNavigation, NavigationEvents } from 'react-navigation';
//import { Overlay } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Ionicons';
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
import _ from 'lodash';
//import ViroARPlaneSelectorCustom from '../../../ViroComponents/ViroARPlaneSelectorCustom'
import {
    _getVideos,
    _getTexts,
    _getImages,
    _getGeometries,
    _getObjects3D,
    _getFlexViews,
    _createAllMaterials,
    _createAllAnimations,
    createState
} from '../../../utils/viro/index'
//import Intro from '../Intro/Intro';
var {
    width,
    height
} = Dimensions.get('window');
class ArResolver extends Component {
    constructor(props) {
        super(props)
        this.createState = createState.bind(this)
        const stateViro = this.createState()
        ////console.log(stateViro)
        ////console.log(this.props)
        ////console.log(this.props.arSceneNavigator.viroAppProps.data)
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
            isLoaded: false,
            foundAnchor: '',
            pauseUpdates: false,
            videoControlsAnimation: "fadeIn",
            //videoPaused: false,
            playAnim: false,
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            buffering: true,
            activeScene: null,
            animated: new Animated.Value(0),
        }

        var lastTap = null;
        //this.checkInput = checkInput.bind(this)
        //this._planeSelected = this._planeSelected.bind(this);
        //this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
        //this._createAllMarkersTargets = this._createAllMarkersTargets.bind(this);
        //this._createAllMaterials = this._createAllMaterials.bind(this);
        //this._createAllAnimations = this._createAllAnimations.bind(this);
        //this._loadAllMarkers = this._loadAllMarkers.bind(this);
        // this._setARNodeRef = this._setARNodeRef.bind(this);
        //this._setARVideoRef = this._setARVideoRef.bind(this);
        //this._onClickVideo = _onClickVideo.bind(this);
        this._getVideos = _getVideos.bind(this);
        this._getTexts = _getTexts.bind(this);
        this._getImages = _getImages.bind(this);
        //this._createAllMaterials = _createAllMaterials.bind(this);
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
        //this.getARScene = this.getARScene.bind(this);
        //this._onVideoFinished = this._onVideoFinished.bind(this);
        //this._onUpdateTime = this._onUpdateTime.bind(this);
        //this._onVideoError = this._onVideoError.bind(this);
        //this._onVideoBufferStart = this._onVideoBufferStart.bind(this);
        //this._onVideoBufferEnd = this._onVideoBufferEnd.bind(this);
        //this._onPinch = this._onPinch.bind(this);
        //this._onRotate = this._onRotate.bind(this);
        //this.handleDoubleTap = this.handleDoubleTap.bind(this);

        /*this.setState({
          data: this.props.arSceneNavigator.viroAppProps.data,
          materials: this.props.arSceneNavigator.viroAppProps.materials,
        animations: this.props.arSceneNavigator.viroAppProps.animations,
        // totalItemNumber: this.props.arSceneNavigator.viroAppProps.item.markers.length,
        //jsonRender: this.props.arSceneNavigator.viroAppProps.item.jsonRender,
        });*/
    }
    componentDidMount = () => {
        //this._onInitialized()
        //this._createAllMarkersTargets();
        //this._loadAllMarkers();
        /* this.setState({
             data: this.props.arSceneNavigator.viroAppProps.data,
             materials: this.props.arSceneNavigator.viroAppProps.materials,
             animations: this.props.arSceneNavigator.viroAppProps.animations,
         })*/
        //console.log('state ', this.state)
        if (this.state.data) {
            this.setState({ isLoaded: true })
        }

        /* if (!this.state.addImageMarker) {
             return;
         }*/

        var videoPausedArr = [];
        //var marker = this.state.data;
        let markerItems =  _.flatMap(this.state.data, ({ nom, markers }) => {
            return markers //this.props.campagnes
              .filter(item => !item.disabled)
              _.map(markers, marker => ({ nom, ...marker }))
              //.map(sale => sale.total);
          });
        /*const markerItems = _.flatMap(this.state.data, ({ nom, markers }) =>
            _.map(markers, marker => ({ nom, ...marker }))
        );*/
        //this.setState({data: marker})
        var y = 0;
        //console.log(markerItems)
        /*if (!this.state.addImageMarker) {
           return;
         }*/
        /*markerTarget.map((item, index) => {
            //console.log(item)
            //console.log(index)
        })*/
        let objVideosPaused = {};
        let objAnimation = {};
        ////console.log(this.state.data)
        //for (let i = 0; i < this.state.totalItemNumber; i++) {
        markerItems.map((item, index) => {
            if (item.jsonRender) {
                if (item.jsonRender.ViroVideos && item.jsonRender.ViroVideos[0].paused != null) {
                    objVideosPaused[item.nom] = item.jsonRender.ViroVideos[0].paused;
                    objAnimation[item.nom] = item.jsonRender.ViroVideos[0].animationRun;
                }
                if (item.jsonRender.ViroObjects3d && item.jsonRender.ViroObjects3d[0].paused != null) {
                    objVideosPaused[item.nom] = item.jsonRender.ViroObjects3d[0].paused;
                    objAnimation[item.nom] = item.jsonRender.ViroObjects3d[0].animationRun;
                }
                if (item.jsonRender.ViroImages && item.jsonRender.ViroImages[0].animationRun != null) {
                    objAnimation[item.nom] = item.jsonRender.ViroImages[0].animationRun;
                }
            }
        })
        //console.log(videoPausedArr)
        this.setState(prevState => ({
            //    videoPausedArr
            //videoPaused: [finalVideoPaused],
            videoPaused: objVideosPaused,
            playAnim: objAnimation
        }))
        // //console.log(this.state.videoPaused)
        ////console.log(this.state.materials)
        //let loadMaterials = 
        // _createAllMaterials(this.state.materials);
        ////console.log('loadMaterials')
        //let loadAnimations = 
        //_createAllAnimations(this.state.animations);
        ////console.log('loadAnimations')
        //let loadMarkersTargets = 
        this._createAllMarkersTargets();
        ////console.log(isTrackingOk)
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
    _setARNodeRef = (component) => {
        this.arNodeRef = component;
    }
    /*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
    /* _createAllMarkersTargetss() {
         var imageMarkers = '';
         var imageMarkersNames = '';
         var ARImageMarkersTargets = {};
         var physicalWidths = '';
         if (!this.state.addImageMarker) {
             return;
         }
         var objarray = {};
         var test = {};
         var values = [];
 
         for (let x = 0; x < this.state.totalItemNumber; x++) {
             // Iterate through your marker data here to 
             imageMarkers = webUrl + this.state.data[x].folderName + this.state.data[x].name + '/res/' + this.state.data[x].imageMarker;
             ////console.log(imageMarkers);
             imageMarkersNames = this.state.data[x].name.toString();
             physicalWidths = this.state.data[x].physicalWidth;
             // //console.log(this.state.data[x].type);
             var key = this.state.data[x].name.toString();
             ARImageMarkersTargets[key] = {
                 source: {
                     uri: `${this.state.data[x].imageMarker}`
                 },
                 orientation: this.state.data[x].orientation,
                 physicalWidth: parseFloat(this.state.data[x].physicalWidth),
                 type: this.state.data[x].type
             };
 
         }
         return ViroARTrackingTargets.createTargets(ARImageMarkersTargets);
     }*/


    _animateFinished = () => {
        //console.log('onanimated finish')
        this.setState({
            playAnim: false,

        })
    }
    _fullscreen = () => {
        //console.log('fullscreen')
        this.setState({
            fullscreen: true,

        })
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

    _onSetInitialStateVideo = (markerName, index) => {
        //_onClickVideo(VideoLink) {
        //this._togglePauseVideo();
        //alert(index);
        //console.log(index)
        //console.log(markerName)
        this.setState({
            //videoPaused: { [markerName]: true },
            //videoPaused: { [markerName + "_" + index]: true },
        });
    }
    /* CREATION DES ANIMATIONS */
    /*FONCTIONS EVENTS*/

    _onClickUrl(urlLink) {
        //Alert.alert("clicked");
        Linking.openURL("http://" + urlLink);

    }
    _onVideoTapped = () => {
        var videoControlsAnimationState = this.state.videoControlsAnimation;
        if (videoControlsAnimationState == "fadeIn") {
            videoControlsAnimationState = "fadeOut";
        } else {
            videoControlsAnimationState = "fadeIn";
        }

        this.setState({
            videoControlsAnimation: videoControlsAnimationState,
            runAnimation: true,
        });
    }
    _onClickVideo = (markerName, index) => {
        //_onClickVideo(VideoLink) {
        //this._togglePauseVideo();
        //alert(index);
        //console.log('click pause video')
        //console.log(index)
        //console.log(markerName)
        //console.log(this.state.videoPaused)
        if (this.state.activeScene) {
            this.setState(prevState => ({
                videoPaused: { ...prevState.videoPaused, [markerName]: !this.state.videoPaused[markerName], [this.state.activeScene]: !this.state.videoPaused[this.state.activeScene] },
                activeScene: markerName,
                //foundAnchor: anchor,
                // videoPaused: { [markerName + "_" + index]: !this.state.videoPaused[markerName + "_" + index] },
            }));
        } else {
            this.setState(prevState => ({
                videoPaused: { ...prevState.videoPaused, [markerName]: !this.state.videoPaused[markerName] },
                activeScene: markerName,
                //foundAnchor: anchor,
                // videoPaused: { [markerName + "_" + index]: !this.state.videoPaused[markerName + "_" + index] },
            }));
        }
        /* this.setState(prevState => ({
             videoPaused: { ...prevState.videoPaused, [markerName]: !this.state.videoPaused[markerName]},
             //videoPaused: { [markerName]: !this.state.videoPaused[markerName] },
             //videoPaused: { [markerName]: !this.state.videoPaused[markerName + "_" + index] },
             // videoPaused: { [markerName + "_" + index]: !this.state.videoPaused[markerName + "_" + index] },
         }));*/
        // //console.log(this.state)
        //console.log(this.arVideoRef)
        //this._onVideoTapped();
        //this.arVideoRef.presentFullscreenPlayer()
    }

    _onAnchorUpdated(anchor) {


    }
    _onAnchorRemoved(anchor) {

        ////console.log("uremove " + anchor.position);
        Alert.alert("remove");
        this.props.sceneNavigator.viroAppProps._changeStateScanline();
        this.setState({
            playAnim: false,
            //videoPaused: true
        })
        //this.props.sceneNavigator.viroAppProps._onResetScanAr();

    }
    _onAnchorFound(anchor, markerName, index) {
        //alert('found')
        //console.log('anchor ', anchor)
        //console.log('markerName ', markerName)
        //console.log('index ', index)
        //let VidePausedVal = [...this.state.videoPaused];


        //const newState = {};
        if (this.state.activeScene) {
            this.setState(prevState => ({
                videoPaused: { ...prevState.videoPaused, [markerName]: !this.state.videoPaused[markerName], [this.state.activeScene]: !this.state.videoPaused[this.state.activeScene] },
                activeScene: markerName,
                foundAnchor: anchor,
                playAnim: { ...prevState.playAnim, [markerName]: !this.state.playAnim[markerName]/*, [this.state.activeScene]: !this.state.playAnim[this.state.activeScene]*/ },
                // videoPaused: { [markerName + "_" + index]: !this.state.videoPaused[markerName + "_" + index] },
            }));
        } else {
            this.setState(prevState => ({
                videoPaused: { ...prevState.videoPaused, [markerName]: !this.state.videoPaused[markerName] },
                activeScene: markerName,
                foundAnchor: anchor,
                playAnim: { ...prevState.playAnim, [markerName]: !this.state.playAnim[markerName] },
                // videoPaused: { [markerName + "_" + index]: !this.state.videoPaused[markerName + "_" + index] },
            }));
        }
        /*this.setState(prevState => ({
           videoPaused: {...prevState.videoPaused,[markerName]: !this.state.videoPaused[markerName], [this.state.activeScene]: !this.state.videoPaused[this.state.activeScene]},
            activeScene: markerName,
            foundAnchor: anchor,
            // videoPaused: { [markerName + "_" + index]: !this.state.videoPaused[markerName + "_" + index] },
        }));*/


        /*this.setState({
            //videoPaused: newResults,
            activeScene: markerName,
            foundAnchor: anchor,
            //playAnim: true,
        });*/


        this.props.sceneNavigator.viroAppProps._changeStateScanline();
    }


    /*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
    _createAllMarkersTargets = () => {
        var imageMarkers = '';
        var imageMarkersNames = '';
        var ARImageMarkersTargets = {};
        var physicalWidths = '';
        /* if (!this.state.addImageMarker) {
             return;
         }*/
        var objarray = {};
        var test = {};
        var values = [];
        //var marker = this.state.data;
        let markerTarget =  _.flatMap(this.state.data, ({ nom, markers }) => {
            return markers //this.props.campagnes
              .filter(item => !item.disabled)
              _.map(markers, marker => ({ nom, ...marker }))
              //.map(sale => sale.total);
          });
       /* const markerTarget = _.flatMap(this.state.data, ({ nom, markers }) =>
            _.map(markers, marker => ({ nom, ...marker }))
        );*/
        //this.setState({data: marker})
        var y = 0;
        //console.log(markerTarget)
        /*if (!this.state.addImageMarker) {
           return;
         }*/
        /*markerTarget.map((item, index) => {
            //console.log(item)
            //console.log(index)
        })*/
        //console.log(this.state.data)
        //for (let i = 0; i < this.state.totalItemNumber; i++) {
        markerTarget.map((item, index) => {
            if (item.jsonRender && !item.disabled) {
                //this._onSetInitialStateVideo(item.nom, index)
                // for (let x = 0; x < this.state.totalItemNumber; x++) {
                // Iterate through your marker data here to 
                //imageMarkers = webUrl + this.state.data[x].folderName + this.state.data[x].name + '/res/' + this.state.data[x].imageMarker;
                ////console.log(imageMarkers);
                //console.log(item);
                imageMarkersNames = item.nom;
                physicalWidths = item.physicalWidth;
                // //console.log(this.state.data[x].type);
                var key = item.nom;
                //console.log(item.nom)
                //console.log(item.nom.toString())
                ARImageMarkersTargets[item.nom] = {
                    source: {
                        // uri: `${this.state.data[x].imageMarker}`
                        //uri: `${item.markerUrl}`
                        uri: item.markerUrl
                    },
                    orientation: item.orientation,
                    physicalWidth: item.physicalWidth,
                    type: item.type
                };
            }
        })

        ////console.log(ARImageMarkersTargets)
        return ViroARTrackingTargets.createTargets(ARImageMarkersTargets);
    }
    _loadAllMarkers = () => {

        var views = [];
        _createAllMaterials(this.state.materials);
        _createAllAnimations(this.state.animations);
        //var marker = this.state.data;
        let markerItem = _.flatMap(this.state.data, ({ nom, markers }) => {
            return markers //this.props.campagnes
                .filter(item => !item.disabled)
            _.map(markers, marker => ({ nom, ...marker }))
            //.map(sale => sale.total);
        });
        /* const markerItem = _.flatMap(this.state.data, ({ nom, markers }) =>
             _.map(markers, marker => ({ nom, ...marker }))
         );*/
        //this.setState({data: marker})
        var y = 0;
        //console.log(markerItem)
        /*if (!this.state.addImageMarker) {
           return;
         }*/
        /*markerItem.map((item, index) => {
            //console.log(item)
            //console.log(index)
        })*/
        ////console.log(this.state.data)
        //for (let i = 0; i < this.state.totalItemNumber; i++) {
        markerItem.map((item, index) => {
            //console.log(item.jsonRender)
            if (item.jsonRender && !item.disabled) {
                // Iterate through your marker data here to
                if (item.type === "Image") {
                    //console.log("image " + item.type + " " + item.nom);
                    views.push((
                        <ViroNode position={[0, 0, 0]} key={index} >
                            <ViroARImageMarker target={item.nom.toString()}
                                //pauseUpdates={item.pauseUpdates}
                                onAnchorFound={anchor => this._onAnchorFound(anchor, item.nom, index)}
                                // onAnchorFound={this._onAnchorFound}
                                //onAnchorRemoved={this._onAnchorRemoved}
                                //onAnchorUpdated={this._onAnchorUpdated}
                                key={index}
                            >
                                {this.getARScene(item.jsonRender, item.nom)}
                            </ViroARImageMarker>
                        </ViroNode>
                    ));
                }
                else {
                    //console.log("object " + item.type + " " + item.nom);

                    views.push((
                        <ViroNode position={[0, 0, 0]} key={index} >
                            <ViroARObjectMarker target={item.nom}
                                //pauseUpdates={item.pauseUpdates}
                                onAnchorFound={anchor => this._onAnchorFound(anchor, item.nom)}
                                // onAnchorFound={(e) =>  this._onAnchorFound(e, i)}
                                // onAnchorFound={this._onAnchorFound}
                                onAnchorRemoved={this._onAnchorRemoved}
                                onAnchorUpdated={this._onAnchorUpdated}
                                key={index}
                            >
                                {this.getARScene(item.jsonRender, item.nom)}
                            </ViroARObjectMarker>
                        </ViroNode>
                    ));
                }

            }

        })
        return views;
    }
    /*OBTENTON DE LA SCENE ET LANCEMENTS DES DIFFERENTES FUNCTION DE CONSTRUCTION*/
    getARScene(jsonRender, markerName) {
        //console.log(jsonRender)
        //console.log(markerName)
        return (
            <ViroNode position={[0, 0, 0]} >
                {this._getImages(jsonRender.ViroImages, markerName, this)
                }
                {this._getVideos(jsonRender.ViroVideos, markerName, this)
                }
                {/*this._getTexts(jsonRender.ViroTexts, this)*/}
                {/*this._getGeometries(jsonRender.ViroGeometries, this)*/}
                {this._getObjects3d(jsonRender.ViroObjects3d, markerName, this)
                }
                {/*this._getFlexViews(jsonRender.ViroFlexViews, this)*/}
            </ViroNode>
        )
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
    _onInitialized = (state, reason) => {
        //console.log('tracking initialized test')
        //console.log(state)
        if (state == ViroConstants.TRACKING_NORMAL) {
            //console.log('tracking initialized')
            isTracking: true
            this.setState({
                isTracking: true
            })
        } else if (state == ViroConstants.TRACKING_NONE) {
            //console.log('tracking none')
            isTracking: false
            this.setState({
                isTracking: false
            })
        }
    }
    render = () => {
        ////console.log(this.state)
        ////console.log(this.props.arSceneNavigator.viroAppProps.data)
        ////console.log(this.props)
        ////console.log('render Markers');
        //alert(JSON.stringify(this.state.activeScene["chocolat"]));
        //console.log(this.state.videoPaused);
        /*  //console.log(this.state.videoPaused[1]);
          const choc = "chocolat";
         // var test = this.state.videoPaused.map(value => 
         //   value["chocolat"]);
          //console.log(this.state.videoPaused.map(value => 
            {if(value["chocolat"]){
              //console.log(value["chocolat"])
            }}
            ));*/


        //var test = this.state.items.filter(item => item == choc );
        //const test = this.state.videoPaused.find(task => (task[0] === choc), this);
        // //console.log(test);


        //this._onResetArScene();


        ////console.log(loadMarkersTargets)
        /* let loadMaterials = _createAllMaterials(this.state.materials);
         ////console.log('loadMaterials')
         let loadAnimations = _createAllAnimations(this.state.animations);
         ////console.log('loadAnimations')
         let loadMarkersTargets = this._createAllMarkersTargets();*/
        ////console.log('loadMarkersTargets')
        let loadMarkers = this._loadAllMarkers();
        ////console.log('loadMarkers')
        // //console.log(loadMarkers)
        //  this._createAllMarkersTargets();
        //  this._createAllMaterials();
        // this._createAllAnimations();

        //if (this.state.isLoaded) {
        ////console.log(this.props)
        // //console.log(this.props.arSceneNavigator.viroAppProps.resetScene)
        ////console.log(this.state.loadingData)
        ////console.log(this.state.isLoading)
        return (

            <ViroARScene
                onTrackingUpdated={() => this._onInitialized()}
            //anchorDetectionTypes={'PlanesHorizontal'} 
            >

                {//loadMaterials
                }
                {//loadAnimations
                }
                {//loadMarkersTargets
                }
                {loadMarkers
                }

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
        /* } else {
             //console.log("not loaded")
             //console.log(this.props)
            return null;
         }*/
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
    outer: {
        flex: 1,
    },

    arView: {
        flex: 1,
    },

    buttons: {
        height: 80,
        width: 80,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#00000000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff00',
    },
    lineStyle: {
        borderWidth: 4,
        borderColor: 'red',
        margin: 0,
        top: 0,
        width: width,
        shadowOffset: { width: 0, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0

    },

    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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
    fadeOut: { properties: { opacity: 0.0 }, duration: 500 },
    fadeIn: { properties: { opacity: 1.0 }, duration: 500 },
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
module.exports = ArResolver// withNavigation(ArResolver);

//export default withNavigation(ArResolver)