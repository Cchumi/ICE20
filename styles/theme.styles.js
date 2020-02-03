import React, { Component } from 'react'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
export default {
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_EXTRA_LARGE: 18,
  FONT_COLOR_GREY: "#000",
  HEADER_FONT_SIZE: 24,
  HEADER_MARGIN: 80,
  HEADER_HEIGHT: 90,
  /*COLORS*/
  WHITE: 'rgb(255, 255, 255)',
  GREY: "#ccc",
  BLACK: 'rgb(0, 0, 0)',
  PRIMARY_COLOR: 'rgba(230, 0, 126, 0.5)',
  PRIMARY_INACTIVE_COLOR: 'rgba(230, 0, 126, 1)',
  SECONDARY_COLOR: 'rgb(14, 111, 182)',
  PRIMARY_TXT_COLOR: 'rgb(255, 255, 255)',
  SECONDARY_TXT_COLOR: 'rgb(121, 159, 186)',
  IMG_OVERLAY_COLOR: 'rgba(231,55,74,0.2)',
  HEADER_IMG_OVERLAY_COLOR: 'rgba(255,255,255,0.6)',
  BORDER_COLOR: 'rgb(231, 55, 74)',
  BORDER_IMAGE_PROFILE_COLOR: 'rgb(231, 55, 74)',
  BORDER_IMAGE_PROFILE_WIDTH: 2,
  BOTTOM_BAR_HEIGHT: 60,
  BOTTOM_BAR_ICON: 25,
  BOTTOM_BAR_ICON_ACTIVE: 35,
  FONT_WEIGHT_LIGHT: "200",
  FONT_WEIGHT_MEDIUM: "600",
  FONT_WEIGHT_HEAVY: "800",
  LIKE_COLOR: 'rgb(231, 55, 74)',
  UNLIKE_COLOR: "#ccc",
  ERROR_TXT_COLOR: 'red',
  BTN_BORDER_RADIUS: 5,
  INPUT_WIDTH: width - 50,
  INPUT_HEIGHT: 45,
  INPUT_PLACEHOLDER_COLOR: 'rgba(255,255,255,0.5)',
  INPUT_ENABLED: 'black',
  INPUT_DISABLED: '#86939e',
  SECTION_HEADER_COLOR: 'rgba(14, 111, 182, 0.7)',
  /*ANNONCES DETAILS*/
  ANNONCES_IMG_OVERLAY_COLOR: 'rgba(0,0,0,0.4)',
  /*ANIMATIONS EFFETS*/
  FIRSTCHOICE_BUTTON_ANIMATION: 'zoomInDown',
  ANNONCES_ITEMS_ANIMATION: 'bounceInRight',
};