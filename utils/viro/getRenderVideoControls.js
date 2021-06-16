import React from 'react';

import {
  ViroNode,
  ViroButton,
  ViroImage,

  ViroSpotLight,
  ViroDirectionalLight,
  ViroOmniLight,
  ViroAmbientLight,
} from 'react-viro';

var buttonSize = 0.075;
var VIDEO_REF = "videoref";
var VideoControlRef = "VideoControlRef";


const _renderFullScreen = (source) => {

}
/**
  * Render a set of Video UI Controls. This includes (in the order displayed from left to right):
  * Restart, Previous Video, Play/Pause, Next Video, Volume.
  */
export const _getVideoControls = (t, position, rotation, scale, markerName, source) => {
  ////console.log(scale.x)
  return (
    <ViroNode position={position} rotation={rotation} scale={scale} opacity={1}
      animation={{ name: t.state.videoControlsAnimation, run: t.state.runAnimation, loop: false }}
    >
      {/*<ViroImage
        scale={[0.1, 0.075, 1]}
        position={[0, 0, 0.005]}
        source={require("./res/player_controls_container.png")} />*/}
      <ViroButton
        position={[0.01, 0, 0.012]}
        scale={[0.3, 0.3, 0.3]}
        width={buttonSize}
        height={buttonSize}
        source={require("./res/player_controls/icon_fullscreen_w.png")}
        //hoverSource={require("./res/skip_hover.png")}
        clickSource={require("./res/player_controls/icon_fullscreen_w.png")}
        onClick={() => t._fullscreen(source)} />
      {_renderPlayControl(t.state.videoPaused[markerName], t._onClickVideo)
      }
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
        position={[-0.01, 0, 0.012]}//{[0, 0, 0.03]}
        scale={[0.3, 0.3, 0.3]}
        width={buttonSize}
        height={buttonSize}
        source={require("./res/player_controls/icon_play_w.png")}
        //hoverSource={require("./res/play_hover.png")}
        clickSource={require("./res/player_controls/icon_play_w.png")}
        onClick={onClickVideo} />
    );
  } else {
    return (
      <ViroButton
        position={[-0.01, 0, 0.012]}//{[0, -0.05, 0.03]}
        scale={[0.3, 0.3, 0.3]}
        width={buttonSize}
        height={buttonSize}
        source={require("./res/player_controls/icon_pause_w.png")}
        //hoverSource={require("./res/pause_hover.png")}
        clickSource={require("./res/player_controls/icon_pause_w.png")}
        onClick={onClickVideo} />
    );
  }
}