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

import { createState, checkInput } from './setState'
/**
 * Set all the image and asset references required in this scene.
 */
var buttonSize = 0.075;
var VIDEO_REF = "videoref";
var VideoControlRef = "VideoControlRef";


/**
  * Render a set of Video UI Controls. This includes (in the order displayed from left to right):
  * Restart, Previous Video, Play/Pause, Next Video, Volume.
  */
const _renderVideoControl = (t,  position, rotation, scale, markerName) => {
  ////console.log(scale.x)
  return (
    <ViroNode position={position} rotation={rotation} scale={scale} opacity={1}
    animation={{ name: t.state.videoControlsAnimation, run: t.state.runAnimation, loop: false }} 
    >
      {/*<ViroImage
        scale={[0.1, 0.075, 1]}
        position={[0, 0, 0.005]}
        source={require("./res/player_controls_container.png")} />*/}

      {_renderPlayControl(t.state.videoPaused[markerName], t._onClickVideo)
      }

      <ViroButton
        position={[0.01, 0, 0.01]}
        scale={[0.3, 0.3, 0.3]}
        width={buttonSize}
        height={buttonSize}
        source={require("./res/skip.png")}
        //hoverSource={require("./res/skip_hover.png")}
        clickSource={require("./res/skip.png")}
        onClick={() => t._fullscreen()} />
    </ViroNode>
  );
}
/**
* Renders either the play or pause icon depending on video state.
*/
const _renderPlayControl = (videoPaused, onClickVideo) => {
  if (videoPaused) {
    return (
      <ViroButton
        position={[- 0.01, 0, 0.01]}//{[0, 0, 0.03]}
        scale={[0.3, 0.3, 0.3]}
        width={buttonSize}
        height={buttonSize}
        source={require("./res/play.png")}
        //hoverSource={require("./res/play_hover.png")}
        clickSource={require("./res/play.png")}
        onClick={onClickVideo} />
    );
  } else {
    return (
      <ViroButton
        position={[-0.01, 0, 0.01]}//{[0, -0.05, 0.03]}
        scale={[0.3, 0.3, 0.3]}
        width={buttonSize}
        height={buttonSize}
        source={require("./res/pause.png")}
        //hoverSource={require("./res/pause_hover.png")}
        clickSource={require("./res/pause.png")}
        onClick={onClickVideo} />
    );
  }
}

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
  //this.ListeningStateChangedEvent
  let arrayVids = [];
  ////console.log(markerName)
  if (viroVids) {
    ////console.log(markerName)
    //var root = this;

    Object.keys(viroVids).forEach((currentKey, index) => {
      if (viroVids[currentKey] != null && viroVids[currentKey] != undefined) {
        var boundVidsClick = () => { };
        //t._onSetInitialStateVideo(markerName, index)
        ////console.log('index ', index)
        //console.log('index ', currentKey)
        //console.log(t.state.playAnim)
        ////console.log('index ', markerName)
        ////console.log('index ', t.state)
        //console.log('index ', t.state.videoPaused)
        //console.log('index ', t.state.videoPaused[markerName])
        //console.log(viroVids[currentKey].animationName)
        // let pausedValue = markerName+"_"+index;
        //alert(index);
        if (viroVids[currentKey].url !== undefined) {
          //boundVidsClick = _onClickVideos.bind(this,markerName + "_" + index);
        }
        ////console.log(markerName)
        arrayVids.push(
          <ViroNode key={currentKey}>
            {/*} <ViroSpinner 
              type='Light'
              position={[viroVids[currentKey].position.x, viroVids[currentKey].position.y, viroVids[currentKey].position.z]}
              rotation={[viroVids[currentKey].rotation.x, viroVids[currentKey].rotation.y, viroVids[currentKey].rotation.z]}
              scale={[0.05, 0.05, 0.05]}
              visible={t.state.loadVideo }
           />*/}
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
              materials={viroVids[currentKey].materials}
              //materials={["chromaKeyFilteredVideo"]}
              //onClick={boundVidsClick} 
              animation={
                {
                  name: viroVids[currentKey].animationName,
                  run: t.state.playAnim[markerName],
                  loop: viroVids[currentKey].animationLoop,
                  onFinish: t._animateFinished.bind(t, markerName)
                }
              }
              onFinish={t._onVideoFinished}
              onLoadStart={t.handleLoadStart}
              //onUpdateTime={t._onUpdateTime}
              onError={t._onVideoError}
              onBufferStart={t._onVideoBufferStart}
              onBufferEnd={t._onVideoBufferEnd}
              //onBufferEnd={alert('buffer end')}
              //onLoadStart={t.handleLoadStart}
              //onBuffer={t.handleBuffer}
              onUpdateTime={t._onUpdateTime}
            //onClick={this._onClickVideo}
            >
            </ViroVideo>

            {t.state.videoPaused[markerName] &&
              _renderVideoControl(t, [viroVids[currentKey].position.x, viroVids[currentKey].position.y, viroVids[currentKey].position.z], [viroVids[currentKey].rotation.x, viroVids[currentKey].rotation.y, viroVids[currentKey].rotation.z], [1, 1, 1], markerName)
            }

          </ViroNode>


        );
        ////console.log(arrayVids)
      }
    });
  }
  return arrayVids;
}