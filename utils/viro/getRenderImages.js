import React, { Component, Fragment } from 'react';

import {
    ViroConstants,
    ViroMaterials,
    ViroImage,
    ViroMaterialVideo,
    ViroAnimations,
    ViroNode,
  } from 'react-viro';
  

  /* DEFINIT IMAGES */
export const _getImages = (viroImgs, markerName,t) => {

    //console.log(viroImgs);
    ////console.log(viroImgs.length);
    var arrayImgs = [];
    if (viroImgs) {

      Object.keys(viroImgs).forEach((currentKey, index) => {
        if (viroImgs[currentKey] != null && viroImgs[currentKey] != undefined) {
          var boundImgsClick = () => { };
          if (viroImgs[currentKey].linkUrl) {
            boundImgsClick = t._onClickUrl.bind(t, viroImgs[currentKey].linkUrl);
          }
          arrayImgs.push(
            <ViroImage
              key={currentKey}
              //loadingIndicatorSource={require('./res/local_spinner.jpg')} 
              source={{ uri: viroImgs[currentKey].url }}
              scale={[viroImgs[currentKey].scale.x, viroImgs[currentKey].scale.y, viroImgs[currentKey].scale.z]}
              //scale={[0, 0, 0]}
              //scale={viroImgs[currentKey].scale}
              placeholderSource={require("./res/Spinner-1s-200px.gif")}
              rotation={[viroImgs[currentKey].rotation.x, viroImgs[currentKey].rotation.y, viroImgs[currentKey].rotation.z]}
              height={viroImgs[currentKey].height}
              width={viroImgs[currentKey].width}
              position={[viroImgs[currentKey].position.x, viroImgs[currentKey].position.y, viroImgs[currentKey].position.z]}
              onClick={boundImgsClick}
              animation={
                {
                  name: viroImgs[currentKey].animationName,
                  run: t.state.playAnim[markerName],
                  loop: viroImgs[currentKey].animationLoop,
                  onFinish: t._animateFinished.bind(t, markerName)
                }
              }
            />
          );
        }
      });
    }
    return arrayImgs;
  }
