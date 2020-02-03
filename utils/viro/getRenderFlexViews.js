import React, { Component, Fragment } from 'react';

import {
    ViroConstants,
    ViroMaterials,
    ViroImage,
    ViroMaterialVideo,
    ViroAnimations,
    ViroNode,
  } from 'react-viro';
  

/* DEFINIT FLEXVIEW */
export const _getFlexViews = (viroFlexs, t) => {
  var arrayFlexs = [];
  if (viroFlexs) {
    var root = t;
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
                run: t.state.playAnim,
                loop: viroFlexs[currentKey].animationLoop,
                onFinish: t._animateFinished
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
}