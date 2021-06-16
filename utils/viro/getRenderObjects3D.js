import React, { Component, Fragment } from 'react';

import {
  ViroConstants,
  ViroMaterials,
  ViroMaterialVideo,
  ViroQuad,
  ViroBox,
  Viro3DObject,
  ViroNode,
  ViroButton,
  ViroSpotLight,
  ViroDirectionalLight,
} from 'react-viro';

import RNfirebase from 'react-native-firebase'

import { _getLights } from './getRenderLights'
import { _getVideoControls } from './getRenderVideoControls'
import { _createMarkerItemMaterial } from './getMarkerElementMaterial'
import { _createMarkerItemAnimation } from './getMarkerElementAnimation'
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
    <ViroNode position={[position[0] + 0.1, position[1] + 0.1, position[2] + 0.1]} rotation={rotation} scale={scale} opacity={1}
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

const _onLoadStart = (event) => {
  console.log('load 3D start')
  //console.log(event)
}
const _onLoadEnd = (event) => {
  console.log('load 3D start')
  //console.log(event)
}
const _onLoadStarts = (source, resources) => {
  console.log('load 3D start')
  //console.log(source)
  //console.log(resources)
  let ref = RNfirebase.storage().refFromURL(source);
  /*RNfirebase
      .storage()
      .ref()
      .child(ref)
      .downloadFile(
        `${RNfirebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/ok.jpeg`
      )
      .then((successCb) => {
        console.log('success ', successCb)
      })
      .catch((failureCb) => {
        console.log('failureCb ', failureCb)
      });*/
  //dispatch(Viewer3DObjectActions.setIsLoading(true))
  //dispatch(Viewer3DObjectActions.setDisplayShadow(false))
}
const _onLoadEnds = (source, resources) => {
  console.log('load 3D start')
  //console.log(source)
  //console.log(resources)
  //dispatch(Viewer3DObjectActions.setIsLoading(true))
  //dispatch(Viewer3DObjectActions.setDisplayShadow(false))
}

/* DEFINIT OBJET 3D */
export const _getObjects3D = (viroObjs, markerName, t) => {
  let arrayObjs = [];
  if (viroObjs) {
    //console.log('3d ', viroObjs)
    /*ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
        lightingModel: "Lambert",
      },
      test: {
       shininess: 2.0,
        lightingModel: "Lambert",
        diffuseTexture: { uri: 'https://firebasestorage.googleapis.com/v0/b/ice20-ice.appspot.com/o/clients%2Fcrochet%2Fassets%2Fvideos%2FLuCR-info-little-sign-low.mp4?alt=media&token=d0bd4e4f-8142-40ee-bd45-20e2fd519a72' }
      }
    });*/
    //var root = t;
    Object.keys(viroObjs).forEach((currentKey, index) => {

      if (viroObjs[currentKey] != null && viroObjs[currentKey] != undefined) {
        //console.log('3d ', t.state.videoPaused[markerName ])
        const itemPaused = t.state.videoPaused[markerName] ? t.state.videoPaused[markerName] : viroObjs[currentKey].paused
        //const itemPaused = t.state.videoPaused[markerName + "_" + index] ? t.state.videoPaused[markerName + "_" + index]: false
        //console.log('3d paused ', itemPaused)
        //console.log("3d paused 2 ", t.state.videoPaused[markerName])
        //t._onSetInitialStateVideo(markerName, index)

        let animation = {
          name: viroObjs[currentKey].animation && viroObjs[currentKey].animation.nom ? viroObjs[currentKey].animation.nom : viroObjs[currentKey].animationName,
          run: t.state.playAnim[markerName] ? t.state.playAnim[markerName] : false,
          //run: t.state.playAnim[markerName],//viroObjs[currentKey].animation && viroObjs[currentKey].animation.run ? viroObjs[currentKey].animation && viroObjs[currentKey].animation.run : true,//t.state.playAnim[markerName],
          loop: viroObjs[currentKey].animation && viroObjs[currentKey].animation.loop ? viroObjs[currentKey].animation.loop : viroObjs[currentKey].animationLoop,
          //onFinish: viroObjs[currentKey].animation &&  !viroObjs[currentKey].animation.loop ? undefined : t._animateFinished.bind(t, markerName)
        }



        if (viroObjs[currentKey].material && viroObjs[currentKey].material.nom) {
          //console.log('Material ', viroObjs[currentKey].material)
          _createMarkerItemMaterial(viroObjs[currentKey].material)
        }
        if (viroObjs[currentKey].animation && viroObjs[currentKey].animation.nom) {
         // console.log('Animation ', viroObjs[currentKey].animation)
          _createMarkerItemAnimation(viroObjs[currentKey].animation)
        }
        if (viroObjs[currentKey].animation && !viroObjs[currentKey].animation.loop) {
          animation = {
            ...animation,
            onFinish: t._animateFinished.bind(t, markerName)
          }
        }

        if (viroObjs[currentKey].url !== undefined) {
          //boundVidsClick = _onClickVideos.bind(this,markerName + "_" + index);
        }
        //console.log('ici')
        //console.log(animation)
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
            onDrag={() => { }}
            dragType="FixedToWorld"
          >
            {viroObjs[currentKey].lights &&
              _getLights(viroObjs[currentKey].lights)
            }

            <Viro3DObject
              key={currentKey}
              source={{ uri: viroObjs[currentKey].url }}
              //source={require('./res/turkey/turkeyman_anim.vrx')}
              //resources={viroObjs[currentKey].resources ? viroObjs[currentKey].resources : null}
              //resources={[require('./res/arthbot/Mat.1_Color.png')]}
              /* resources={[require('./res/turkey/turkeyman_diffuse.jpg'), 
               require('./res/turkey/turkeyman_normal.jpg'), 
               require('./res/turkey/turkeyman_specular.jpg')]}*/

              /*resources={[require('./res/turkey/spaceship.mtl'),
                  require('./res/texture1.jpg'),
                  require('./res/texture2.jpg'),
                   require('./res/texture3.jpg')]}*/
              // highAccuracyEvents={viroObjs[currentKey].highAccuracyEvents ? viroObjs[currentKey].highAccuracyEvents : false}
              scale={[viroObjs[currentKey].scale.x, viroObjs[currentKey].scale.y, viroObjs[currentKey].scale.z]}
              //scale={viroObjs[currentKey].scale} 
              rotation={[viroObjs[currentKey].rotation.x, viroObjs[currentKey].rotation.y, viroObjs[currentKey].rotation.z]}
              position={[viroObjs[currentKey].position.x, viroObjs[currentKey].position.y, viroObjs[currentKey].position.z]}
              type={viroObjs[currentKey].type}
              //shadowCastingBitMask={2}
              //materials={'test'}
              materials={viroObjs[currentKey].material && viroObjs[currentKey].material.nom ? viroObjs[currentKey].material.nom : viroObjs[currentKey].materials}
              //aterials={'mellot_video_material'}
              //materials={viroObjs[currentKey].materials}
              transformBehaviors={viroObjs[currentKey].transformBehaviors ? viroObjs[currentKey].transformBehaviors : []}
              animation={animation}
              /*animation={
                {
                  name: viroObjs[currentKey].animationName,
                  run: t.state.playAnim[markerName],
                  loop: viroObjs[currentKey].animationLoop,
                  onFinish: t._animateFinished
                }
              }*/
              //onClick={boundVidsClick}
              onClick={() => { t._onClickVideo(markerName, index) }}
            //onLoadStart={_onLoadStart()}
            //onLoadEnd={_onLoadEnd()}
            /*onLoadStart={() =>_onLoadStart(viroObjs[currentKey].url,viroObjs[currentKey].resources ? viroObjs[currentKey].resources : null )}
            onLoadEnd={() => _onLoadEnd(viroObjs[currentKey].url,viroObjs[currentKey].resources ? viroObjs[currentKey].resources : null )}
            */
            />
            {viroObjs[currentKey].material && viroObjs[currentKey].material.materialVideo &&
              //viroObjs[currentKey].materials &&
              <ViroMaterialVideo
                key={'ViroMaterialVideo' + currentKey}
                ref={t._setARVideoRef}
                //material={'mellot_video_material'}
                material={viroObjs[currentKey].material && viroObjs[currentKey].material.nom ? viroObjs[currentKey].material.nom : viroObjs[currentKey].materials}
                //material={viroObjs[currentKey].materials}
                //paused={t.state.videoPaused[markerName.nom + "_" + index]}
                //paused={this.state['tapped_' + currentKey]}
                //paused={t.state.videoPaused}
                //onError={t._onVideoError}
                // onBufferStart={t._onVideoBufferStart}
                // onBufferEnd={t._onVideoBufferEnd}
                // onError={t._onVideoError}
                //paused={false}
                paused={t.state.videoPaused[markerName]}
                loop={viroObjs[currentKey].material.loop}
              //loop={true}
              >
                {t.state.videoPaused[markerName] &&
                  _getVideoControls(t, [viroObjs[currentKey].position.x, viroObjs[currentKey].position.y, viroObjs[currentKey].position.z], [viroObjs[currentKey].rotation.x, viroObjs[currentKey].rotation.y, viroObjs[currentKey].rotation.z], [viroObjs[currentKey].scale.x, viroObjs[currentKey].scale.y, viroObjs[currentKey].scale.z], markerName)
                }
              </ViroMaterialVideo>
            }
            {/* The surface used to render shadow below the object. Below we OR the light bitmask with 1 on the object because the default bitmask for lights
                is 1 and we want the object to be lit up by all lights, but only have shadows casted by one SpotLight contain within this component */}
            {viroObjs[currentKey].shadowCatcher &&
              <ViroQuad
                rotation={[viroObjs[currentKey].shadowCatcher.rotation.x, viroObjs[currentKey].shadowCatcher.rotation.y, viroObjs[currentKey].shadowCatcher.rotation.z]}
                position={[viroObjs[currentKey].shadowCatcher.position.x, viroObjs[currentKey].shadowCatcher.position.y, viroObjs[currentKey].shadowCatcher.position.z]}
                width={viroObjs[currentKey].shadowCatcher.width ? viroObjs[currentKey].shadowCatcher.width : 0.5}
                height={viroObjs[currentKey].shadowCatcher.height ? viroObjs[currentKey].shadowCatcher.height : 0.5}
                arShadowReceiver={viroObjs[currentKey].shadowCatcher.arShadowReceiver ? viroObjs[currentKey].shadowCatcher.arShadowReceiver : false}
              //ignoreEventHandling={true} 
              />
            }
          </ViroNode>
        );
        //console.log('3d ', currentKey)
      }
    });
    //console.log(arrayObjs)
  }
  return arrayObjs;
}