import React, { Component, Fragment } from 'react';

import {
    ViroConstants,
    ViroMaterials,
    ViroGeometry,
    ViroMaterialVideo,
    ViroAnimations,
    ViroNode,
  } from 'react-viro';
  

  /* DEFINIT IMAGES */
export const _getGeometries = (viroGeos, t) => {
  var arrayGeos = [];
  if (viroGeos) {
    var root = t;
    Object.keys(viroGeos).forEach((currentKey, index) => {
      if (viroGeos[currentKey] != null && viroGeos[currentKey] != undefined) {
        arrayGeos.push(
          <ViroGeometry
            key={currentKey}
            scale={[1, 1, 1]}
            // scale={viroGeos[currentKey].scale} 
            rotation={viroGeos[currentKey].rotation}
            position={viroGeos[currentKey].position}
            materials={viroGeos[currentKey].materials}
            vertices={viroGeos[currentKey].vertices}
            normals={viroGeos[currentKey].normals}
            texcoords={viroGeos[currentKey].texcoords}
            triangleIndices={viroGeos[currentKey].triangleIndices}
            animation={
              {
                name: viroGeos[currentKey].animationName,
                run: t.state.playAnim,
                loop: viroGeos[currentKey].animationLoop,
                onFinish: t._animateFinished
              }
            }
          />
        );
      }
    });
  }
  return arrayGeos;
}
