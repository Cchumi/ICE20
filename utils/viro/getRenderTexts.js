import React, { Component, Fragment } from 'react';

import {
    ViroConstants,
    ViroMaterials,
    ViroText,
    ViroMaterialVideo,
    ViroAnimations,
    ViroNode,
    ViroVideo,
  } from 'react-viro';
  

/*DEFINITION DE LA FUCTION DES TEXTS VIRO*/

export const _getTexts = (viroTxts) => {
  var arrayTxts = [];
  if (viroTxts) {
    var root = this;
    Object.keys(viroTxts).forEach((currentKey, index) => {
      if (viroTxts[currentKey] != null && viroTxts[currentKey] != undefined) {
        var boundTxtsClick = () => { };
        if (viroTxts[currentKey].linkUrl) {
          boundTxtsClick = this._onClickUrl.bind(this, viroTxts[currentKey].linkUrl);
        }
        arrayTxts.push(
          <ViroText
            key={currentKey}
            textClipMode={viroTxts[currentKey].textClipMode}
            text={viroTxts[currentKey].text}
            position={viroTxts[currentKey].position}
            scale={[1, 1, 1]}
            //scale={viroTxts[currentKey].scale}
            rotation={viroTxts[currentKey].rotation}
            style={viroTxts[currentKey].style}
            onClick={boundTxtsClick}
            animation={
              {
                name: viroTxts[currentKey].animationName,
                run: this.state.playAnim,
                loop: viroTxts[currentKey].animationLoop,
                onFinish: this._animateFinished
              }
            }
          />
        );
      }
    });
  }
  return arrayTxts;
}