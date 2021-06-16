import React, { Component, Fragment } from 'react';
import { Text } from 'react-native'
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
import { _createMarkerItemMaterial } from './getMarkerElementMaterial'
import { _createMarkerItemAnimation } from './getMarkerElementAnimation'
import { _getVideoControls } from './getRenderVideoControls'
import { createState, checkInput } from './setState'
/**
 * Set all the image and asset references required in this scene.
 */
var buttonSize = 0.075;
var VIDEO_REF = "videoref";
var VideoControlRef = "VideoControlRef";


export const _getVideos = (viroVids, markerName, t) => {
  ////console.log(viroVids)
  //this.createState= createState.bind(this)
  //this.checkInput= checkInput.bind(this)
  //this.state= this.createState()
  ////console.log(t.state)
  ////console.log(t.state.videoPaused)
  ////console.log(markerName)
  ////console.log(t._setARVideoRef)
  // this.checkInput('videoPaused', true)
  //const [buffering, setBuffering] = React.useState(true)
  //this.ListeningStateChangedEvent

  let arrayVids = [];
  ////console.log(markerName)
  if (viroVids) {
    ////console.log(markerName)
    //var root = this;

    Object.keys(viroVids).forEach((currentKey, index) => {
      if (viroVids[currentKey] != null && viroVids[currentKey] != undefined) {
        var boundVidsClick = () => { };
        let materials = {};
        //t._onSetInitialStateVideo(markerName, index)
        ////console.log('index ', index)
        //console.log('index ', currentKey)
        //console.log(t.state.playAnim)
        ////console.log('index ', markerName)
        ////console.log('index ', t.state)
        //console.log('index ', t.state.videoPaused)
        //console.log('index ', t.state.videoPaused[markerName])
        //console.log(viroVids[currentKey])
        // let pausedValue = markerName+"_"+index;
        //alert(index);
        let animation = {
          name: viroVids[currentKey].animation && viroVids[currentKey].animation.nom ? viroVids[currentKey].animation.nom : viroVids[currentKey].animationName,
          run: t.state.playAnim[markerName] ? t.state.playAnim[markerName] : false,
          loop: viroVids[currentKey].animation && viroVids[currentKey].animation.loop ? viroVids[currentKey].animation.loop : viroVids[currentKey].animationLoop,
          //onFinish: viroVids[currentKey].animation &&  !viroVids[currentKey].animation.loop ? undefined : t._animateFinished.bind(t, markerName)
        }
        //console.log('Material ', viroVids[currentKey].material)
        //console.log('Animation ', viroVids[currentKey].animation)
        if (viroVids[currentKey].material && viroVids[currentKey].material.nom) {
          _createMarkerItemMaterial(viroVids[currentKey].material)
        }
        if (viroVids[currentKey].animation && viroVids[currentKey].animation.nom) {
          _createMarkerItemAnimation(viroVids[currentKey].animation)
        }
        if (viroVids[currentKey].animation && !viroVids[currentKey].animation.loop) {
          animation = {
            ...animation,
            onFinish: t._animateFinished.bind(t, markerName)
          }
        }

        if (viroVids[currentKey].url !== undefined) {
          //boundVidsClick = _onClickVideos.bind(this,markerName + "_" + index);
        }
        //console.log('ici video')
        //console.log(animation)
        ////console.log(markerName)
        arrayVids.push(
          <ViroNode key={currentKey}>
            <ViroSpinner
              type='Light'
              position={[viroVids[currentKey].position.x, viroVids[currentKey].position.y + 0.01, viroVids[currentKey].position.z]}
              rotation={[viroVids[currentKey].rotation.x, viroVids[currentKey].rotation.y, viroVids[currentKey].rotation.z]}
              scale={[0.05, 0.05, 0.05]}
              visible={t.state.loadVideo ? t.state.loadVideo : false} //erreur state ici
            />
            <ViroVideo
              key={currentKey}
              ref={t._setARVideoRef}
              name={markerName + index}
              loop={viroVids[currentKey].loop}
              volume={viroVids[currentKey].volume}
              //resizeMode={ 'cover' } 
              height={viroVids[currentKey].height}
              width={viroVids[currentKey].width}
              muted={viroVids[currentKey].muted}
              source={{ uri: viroVids[currentKey].url }}
              paused={t.state.videoPaused[markerName]}
              //paused={t.state.videoPaused[markerName] ? t.state.videoPaused[markerName]: viroVids[currentKey].paused}
              //visible={t.state.loadVideo}
              // transformBehaviors={viroVids[currentKey].transformBehaviors}
              position={[viroVids[currentKey].position.x, viroVids[currentKey].position.y, viroVids[currentKey].position.z]}
              //scale={[0, 0, 0]}
              scale={[viroVids[currentKey].scale.x, viroVids[currentKey].scale.y, viroVids[currentKey].scale.z]}
              //scale={viroVids[currentKey].scale}
              //fullscreen={true} 
              rotation={[viroVids[currentKey].rotation.x, viroVids[currentKey].rotation.y, viroVids[currentKey].rotation.z]}
              onClick={() => { t._onClickVideo(markerName, index) }}
              //materials={viroVids[currentKey].material && viroVids[currentKey].material.nom ? viroVids[currentKey].material.nom : viroVids[currentKey].materials}
              //materials={["chromaKeyFilteredVideo"]}
              //onClick={boundVidsClick} 
              animation={animation
                /*{
                  name: viroVids[currentKey].animation && viroVids[currentKey].animation.nom ? viroVids[currentKey].animation.nom : viroVids[currentKey].animationName,
                  run: t.state.playAnim[markerName],
                  loop: viroVids[currentKey].animation && viroVids[currentKey].animation.loop ? viroVids[currentKey].animation.loop : viroVids[currentKey].animationLoop,
                  onFinish: viroVids[currentKey].animation &&  !viroVids[currentKey].animation.loop ? undefined : t._animateFinished.bind(t, markerName)
                }*/
              }
              onFinish={t._onVideoFinished}
              // onLoadStart={t.handleLoadStart}
              //onUpdateTime={t._onUpdateTime}
              //onError={t._onVideoError}
              //onBufferStartViro={console.log('buffered viro')}
              //onBufferStart={_onVideoBufferBegin}
              onBufferStart={t._onVideoBufferStart}
              onBufferEnd={t._onVideoBufferEnd}
            //onBufferEnd={_onVideoBufferEnd}
            //onBufferEnd={alert('buffer end')}
            //onLoadStart={t.handleLoadStart}
            //onBuffer={t.handleBuffer}
            //onUpdateTime={t._onUpdateTime}
            //onClick={this._onClickVideo}
            >
            </ViroVideo>

            {t.state.videoPaused[markerName] &&
              _getVideoControls(t, [viroVids[currentKey].position.x, viroVids[currentKey].position.y, viroVids[currentKey].position.z], [viroVids[currentKey].rotation.x, viroVids[currentKey].rotation.y, viroVids[currentKey].rotation.z], [1, 1, 1], markerName, viroVids[currentKey].url)
            }
          </ViroNode>
        );
        ////console.log(arrayVids)
      }
    });
  }
  return arrayVids;
}