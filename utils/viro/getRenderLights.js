import React from 'react';

import {
  ViroSpotLight,
  ViroDirectionalLight,
  ViroOmniLight,
  ViroAmbientLight,
} from 'react-viro';


/* DEFINIT LUMIERES DEPUIS MARKER ITEM */
export const _getLights = (viroLights) => {
  let arrayLights = [];
  if (viroLights) {
    //console.log('Lights ', viroLights)

    //var root = t;
    Object.keys(viroLights).forEach((currentLight, index) => {
      //console.log('currentLight ', currentLight)
      viroLights[currentLight].map((lightProps, index) => {
        //console.log(lightProps);
        if (currentLight === 'ViroDirectionalLight' && !lightProps.disabled) {
          arrayLights.push(
            <ViroDirectionalLight key={'ViroDirectionalLight' + index} {...lightProps} />
          )
        }
        if (currentLight === 'ViroSpotLight' && !lightProps.disabled) {
          arrayLights.push(
            <ViroSpotLight key={'ViroSpotLight' + index} {...lightProps} />
          )
        }
        if (currentLight === 'ViroOmniLight' && !lightProps.disabled) {
          arrayLights.push(
            <ViroOmniLight key={'ViroOmniLight' + index} {...lightProps} />
          )
        }
        if (currentLight === 'ViroAmbientLight' && !lightProps.disabled) {
          arrayLights.push(
            <ViroAmbientLight key={'ViroAmbientLight' + index} {...lightProps} />
          )
        }
      })
    });
   // console.log(arrayLights)
  }
  return arrayLights;
}