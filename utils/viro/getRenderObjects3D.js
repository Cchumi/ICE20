import React, { Component, Fragment } from 'react';

import {
    ViroConstants,
    ViroMaterialVideo,
    Viro3DObject,
    ViroNode,
    ViroButton,
  } from 'react-viro';


  var buttonSize = 0.075;
  var VIDEO_REF = "videoref";
  var VideoControlRef = "VideoControlRef";
  
  
  /**
    * Render a set of Video UI Controls. This includes (in the order displayed from left to right):
    * Restart, Previous Video, Play/Pause, Next Video, Volume.
    */
  const _renderVideoControl = (t, position, rotation, scale, markerName) => {
    //console.log(position[0])
    return (
      <ViroNode position={[position[0]+0.1, position[1]+0.1, position[2]+0.1]} rotation={rotation} scale={scale} opacity={1}
      //animation={{ name: this.state.videoControlsAnimation, run: this.state.runAnimation, loop: false }} 
      >
        {/*<ViroImage
          scale={[0.1, 0.075, 1]}
          position={[0, 0, 0.005]}
          source={require("./res/player_controls_container.png")} />*/}
  
        {_renderPlayControl(t.state.videoPaused[markerName], t._onClickVideo)}
  
        <ViroButton
          position={[0.01, 0.1, 0.01]}
          scale={[1, 1, 1]}
          width={buttonSize}
          height={buttonSize}
          source={require("./res/skip.png")}
          //hoverSource={require("./res/skip_hover.png")}
          clickSource={require("./res/skip.png")}
          onClick={()=>t._fullscreen()} />
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

  /* DEFINIT OBJET 3D */
export const _getObjects3D = (viroObjs, markerName, t) => {
  let arrayObjs = [];
  if (viroObjs) {
    //console.log('3d ', viroObjs)
    
    //var root = t;
    Object.keys(viroObjs).forEach((currentKey, index) => {
      
      if (viroObjs[currentKey] != null && viroObjs[currentKey] != undefined) {
        //console.log('3d ', t.state.videoPaused[markerName ])
        const itemPaused = t.state.videoPaused[markerName] ? t.state.videoPaused[markerName]: viroObjs[currentKey].paused
        //const itemPaused = t.state.videoPaused[markerName + "_" + index] ? t.state.videoPaused[markerName + "_" + index]: false
        //console.log('3d paused ', itemPaused)
        //t._onSetInitialStateVideo(markerName, index)
        //var boundVidsClick = () => { };
        // let pausedValue = markerName+"_"+index;
        //alert(index);
       /* if (viroObjs[currentKey].url !== undefined) {
          boundVidsClick = t._onClickVideo.bind(t, markerName + "_" + index);
        }*/
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
              highAccuracyEvents={viroObjs[currentKey].accuracy}
              scale={[viroObjs[currentKey].scale.x, viroObjs[currentKey].scale.y, viroObjs[currentKey].scale.z]}
              //scale={viroObjs[currentKey].scale} 
              rotation={[viroObjs[currentKey].rotation.x, viroObjs[currentKey].rotation.y, viroObjs[currentKey].rotation.z]}
              position={[viroObjs[currentKey].position.x, viroObjs[currentKey].position.y, viroObjs[currentKey].position.z]}
              type={viroObjs[currentKey].type}
              materials={viroObjs[currentKey].materials}
              transformBehaviors={viroObjs[currentKey].transformBehaviors}
              animation={
                {
                  name: viroObjs[currentKey].animationName,
                  run: t.state.playAnim[markerName],
                  loop: viroObjs[currentKey].animationLoop,
                  onFinish: t._animateFinished
                }
              }
              //onClick={boundVidsClick}
              onClick={() => { t._onClickVideo(markerName, index) }}
            />
            {viroObjs[currentKey].materialVideo &&
            <ViroMaterialVideo
              //key={currentKey}
              ref={t._setARVideoRef}
              material={viroObjs[currentKey].materials}
             // paused={t.state.videoPaused[markerName.nom + "_" + index]}
              //paused={this.state['tapped_' + currentKey]}
              //paused={t.state.videoPaused}
             // onError={t._onVideoError}
              //onBufferStart={t._onVideoBufferStart}
             // onBufferEnd={t._onVideoBufferEnd}
              paused={t.state.videoPaused[markerName]}
              loop={viroObjs[currentKey].videoMaterialsLoop}

            >
            {t.state.videoPaused[markerName] &&
              _renderVideoControl(t, [viroObjs[currentKey].position.x, viroObjs[currentKey].position.y, viroObjs[currentKey].position.z], [viroObjs[currentKey].rotation.x, viroObjs[currentKey].rotation.y, viroObjs[currentKey].rotation.z], [viroObjs[currentKey].scale.x, viroObjs[currentKey].scale.y, viroObjs[currentKey].scale.z], markerName)
            }
            </ViroMaterialVideo>
            }

          </ViroNode>
        );
        //console.log('3d ', currentKey)
      }
    });
  }
  return arrayObjs;
}