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

var { width, height } = Dimensions.get('window');

class ArResolver extends Component {
    constructor(props) {
        super(props)
        this.createState = createState.bind(this)
        const stateViro = this.createState()
        this.state = {
            ...stateViro,
            plane: [0, 0, 0],
            paused: false,
            markerData: null,
            campagnes: this.props.arSceneNavigator.viroAppProps.campagnes,
            materials: this.props.arSceneNavigator.viroAppProps.materials,
            animations: this.props.arSceneNavigator.viroAppProps.animations,
            gotAdminRight: this.props.arSceneNavigator.viroAppProps.gotAdminRight,
            jsonRender: [],
            loadVideo: true,
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
            playAnim: false,
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            buffering: true,
            activeScene: null,
            animated: new Animated.Value(0),
        }

        var lastTap = null;
        this._getVideos = _getVideos.bind(this);
        this._getTexts = _getTexts.bind(this);
        this._getImages = _getImages.bind(this);
        this._getGeometries = _getGeometries.bind(this);
        this._getObjects3d = _getObjects3D.bind(this);
        this._getFlexViews = _getFlexViews.bind(this);

        this._onClickUrl = this._onClickUrl.bind(this);
        this._onClickVideo = this._onClickVideo.bind(this);

    }
    /* MONTAGE PREMIER */
    componentDidMount = () => {

        if (this.state.campagnes) {
            //console.log(this.state.campagnes)

            let markerItems = null;
            if (!this.state.gotAdminRight) {
                markerItems = _.flatMap(this.state.campagnes, ({ nom, markers }) => {
                    return markers
                    _.size(markers) > 0
                    _.filter(item => !item.disabled)
                    _.map(markers, marker => ({ nom, ...marker }))
                });
            }
            else {
                markerItems = _.flatMap(this.state.campagnes, ({ nom, markers }) => {
                    return markers
                    _.size(markers) > 0
                    _.map(markers, marker => ({ nom, ...marker }))
                });
            }
            //console.log(markerItems)
            /* const markerItems = _.flatMap(this.state.campagnes, ({ nom, markers }) =>
                 _.map(markers, marker => ({ nom, ...marker }))
             );*/
            this.setState({
                markerData: markerItems,
                isLoaded: true
            })
        }
    }
    /* COMPONENT UPDATE ET GENERATION DES DIFFERENTES FONCTIONS */
    componentDidUpdate(prevProps, prevState) {
        //console.log('update')
        //console.log(this.state.markerData)
        if (this.state.markerData && this.state.markerData !== prevState.markerData) {
            //console.log(this.state.markerData)
            this._onSetInitialsStateMarkers();
            this._createAllMarkersTargets();
            setTimeout(() => {
                this.setState({ loaded: true })
            }, 2000);

        }
        // this._createAllMarkersTargets();
        /* if (this.state.campagnes) {
             console.log(this.state.campagnes)
             this._createAllMarkersTargets();
         }
 
         if (prevProps.arSceneNavigator.viroAppProps.campagnes !== this.props.arSceneNavigator.viroAppProps.campagnes) {
             console.log(this.props.arSceneNavigator.viroAppProps.campagnes)
             this._createAllMarkersTargets();
         }*/
    }
    /* CREATION DES DIFFERENTS TARGET MARKERS */
    _createAllMarkersTargets = () => {
        var imageMarkersNames = '';
        var ARImageMarkersTargets = {};
        var physicalWidths = '';

        this.state.markerData.map((item, index) => {
            //if (item.jsonRender && !item.disabled) {
            imageMarkersNames = item.nom;
            physicalWidths = item.physicalWidth;

            ARImageMarkersTargets[item.nom] = {
                source: {
                    uri: item.markerUrl
                },
                orientation: item.orientation,
                physicalWidth: item.physicalWidth,
                type: item.type
            };
            //}
        })
        return ViroARTrackingTargets.createTargets(ARImageMarkersTargets);
    }
    /* CREATION DES MARKERS DEPUIS SOURCE STATE MARKERDATA */
    _loadAllMarkers = () => {
        var views = [];
        _createAllMaterials(this.state.materials);
        _createAllAnimations(this.state.animations);

        this.state.markerData.map((item, index) => {
            if (item.jsonRender /*&& !item.disabled*/) {
                // Iterate through your marker data here to
                if (item.type === "Image") {
                    //console.log("image " + item.type + " " + item.nom);
                    views.push((
                        <ViroNode position={[0, 0, 0]} key={index} >
                            <ViroARImageMarker target={item.nom.toString()}
                                //pauseUpdates={item.pauseUpdates}
                                onAnchorFound={anchor => this._onAnchorFound(anchor, item.nom, index)}
                                // onAnchorFound={this._onAnchorFound}
                                onAnchorRemoved={anchor => this._onAnchorRemoved(anchor)}
                                onAnchorUpdated={anchor => this._onAnchorUpdated(anchor)}
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
        return (
            <ViroNode position={[0, 0, 0]} >
                {this._getImages(jsonRender.ViroImages, markerName, this)
                }
                {this._getVideos(jsonRender.ViroVideos, markerName, this)
                }
                {//this._getTexts(jsonRender.ViroTexts, this)
                }
                {//this._getGeometries(jsonRender.ViroGeometries, this)
                }
                {this._getObjects3d(jsonRender.ViroObjects3d, markerName, this)
                }
                {this._getFlexViews(jsonRender.ViroFlexViews, markerName, this)
                }
            </ViroNode>
        )
    }
    /* CREATION REFERENCE AR */
    _setARNodeRef = (component) => {
        this.arNodeRef = component;
    }

    /* DEFINIT LES ETATS INITIAUX DES MARKERS */
    _onSetInitialsStateMarkers = (markerName, index) => {
        let objVideosPaused = {};
        let objAnimation = {};
        this.state.markerData.map((item, index) => {
            //if (item.jsonRender && !item.disabled) {
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
            // }
        })
        //console.log(videoPausedArr)
        this.setState(prevState => ({
            videoPaused: objVideosPaused,
            playAnim: objAnimation
        }))
    }

    /* CREATION DES ANIMATIONS */
    /*FONCTIONS EVENTS*/

    /* ANIMATION TERMINEE */
    _animateFinished = () => {
        //console.log('onanimated finish')
        this.setState({
            playAnim: false,

        })
    }
    /* VIDEO PLEIN ECRAN */
    _fullscreen = (source) => {
        console.log('fullscreen')
        console.log(this.arVideoRef)
        this.setState({
            fullscreen: true,

        })
        this.props.sceneNavigator.viroAppProps._getChildFullscreen(source);
        //this.props.sceneNavigator.viroAppProps._getChildFullscreen(this.arVideoRef.props.source.uri);
    }
    /* MARKER DOUBLE CLICK */
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

    /* LINK CLICK OPEN URL */
    _onClickUrl(urlLink) {
        //Alert.alert("clicked");
        Linking.openURL("http://" + urlLink);

    }
    /*VIDEO DEBUT*/
    /* VIDEO CLICK ETAT PAUSE / PLAY FONDU CONTROLS */
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
    /* VIDEO CLICK ETAT PAUSE / PLAY */
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
    _setARVideoRef = (component) => {
        this.arVideoRef = component;
        //Alert.alert(JSON.stringify(this.arVideoRef));
    }

    _onVideoFinished = () => {
        console.log("Video finished!");
    }
    /* VIDEO TIME INDICATOR */
    _onUpdateTime = (current, total) => {
        console.log("Video time update, current: " + current + ", total: " + total);
        //this.setState({ loadVideo: false })
        if (current > 0.1) {
            this.setState({ loadVideo: false })
            //console.log('state load video' , this.state.loadVideo)
        }
    }
    /* VIDEO ERROR */
    _onVideoError = (event) => {
        //console.log("Video loading failed with error: " + event.nativeEvent.error);
    }
    /* VIDEO BUFFERING START */
    _onVideoBufferStart = () => {
        console.log('buffer video start')
        this.setState({ loadVideo: true })
        //Alert.alert(JSON.stringify(this.arVideoRef));
    }
    /* VIDEO BUFFERING END */
    _onVideoBufferEnd = () => {
        console.log('buffer video end')
        this.setState({ loadVideo: false })
        // Alert.alert(JSON.stringify(this.arVideoRef));
    }
    /*VIDEO FIN*/
    /* IMAGE MARKERS ANCHOR UPDATED */
    _onAnchorUpdated(anchor) {
        //console.log('updated anchor')

    }
    /* IMAGE MARKERS ANCHOR REMOVED */
    _onAnchorRemoved(anchor) {
        console.log('remove anchor')
        ////console.log("uremove " + anchor.position);
        //Alert.alert("remove");
        this.props.sceneNavigator.viroAppProps._changeStateScanline();
        this.setState({
            playAnim: false,
            //videoPaused: true
        })
        //this.props.sceneNavigator.viroAppProps._onResetScanAr();

    }
    /* IMAGE MARKERS ANCHOR FOUND */
    _onAnchorFound(anchor, markerName, index) {
        //alert('found')
        //console.log('anchor ', anchor)
        //console.log('markerName ', markerName)
        //console.log('index ', index)
        //let VidePausedVal = [...this.state.videoPaused];
        console.log('found anchor')

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
    /* INITIALIZING STATE TRACKING */
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
    /* FONCTION RENDU */
    render = () => {
        if (this.state.isLoaded && this.state.loaded) {
            let loadMarkers = this._loadAllMarkers();
            return (

                <ViroARScene
                    onTrackingUpdated={() => this._onInitialized()}
                //anchorDetectionTypes={'PlanesHorizontal'} 
                >
                    {loadMarkers
                    }
                    {/*<ViroOmniLight
                        intensity={300}
                        position={[-10, 10, 1]}
                        color={"#FFFFFF"}
                        attenuationStartDistance={20}
                        attenuationEndDistance={30}
                    />
                    <ViroOmniLight
                        intensity={300}
                        position={[10, 10, 1]}
                        color={"#FFFFFF"}
                        attenuationStartDistance={20}
                        attenuationEndDistance={30}
                    />
                    <ViroOmniLight
                        intensity={300}
                        position={[-10, -10, 1]}
                        color={"#FFFFFF"}
                        attenuationStartDistance={20}
                        attenuationEndDistance={30}
                    />
                    <ViroOmniLight
                        intensity={300}
                        position={[10, -10, 1]}
                        color={"#FFFFFF"}
                        attenuationStartDistance={20}
                        attenuationEndDistance={30}
                    />
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
                    />*/}
                </ViroARScene>
            );
        }
        else {
            return null;
        }
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

module.exports = ArResolver