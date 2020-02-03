/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableOpacity,TouchableHighlight, StyleSheet, Platform, Button, Image,Dimensions, ScrollView } from 'react-native'
const window = Dimensions.get('window');
class Infos extends Component {

  static navigationOptions =({navigation}) =>( {
    title: "A Propos",
    headerStyle: {
      backgroundColor: 'rgba(230, 0, 126, 1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
render () {
    return (
      <ScrollView>
    	<View style={styles.containers} >
			<View style={styles.container} >
				<View style={styles.background} >
        			<Image style={styles.image} source={require('./res/moi.jpg')} />
      			</View>
      		</View>
			<View style={styles.content} >
            	<Text style={styles.name}>Pierre Gagliardi</Text>
            	<Text style={styles.email}>pierregagliardi@pierregagliardi.com</Text>
            	<Text style={styles.website}>www.pierregagliardi.com</Text>
            	<Text style={styles.phone}>+33(0)679890916</Text>
            </View>
        </View>
        </ScrollView>
    );
  }


}

export default Infos;

const styles = StyleSheet.create({
container: {
//flex: 1,
    //marginTop: 0,
    //justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: window.width,
    overflow: 'hidden',
    height: window.width / 1.0,
    //marginTop: 100
},
background: {
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width * 2,
    marginLeft: -(window.width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden'
},
image: {
    height: window.width / 1.0,
    width: window.width,
    position: 'absolute',
    bottom: 0,
    //top:5,
    marginLeft: window.width / 2,
    //backgroundColor: '#9DD6EB'
},
containers: {
    flex: 1,
    marginTop: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  content: {
  	flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 0 ,
    fontFamily: 'Avenir-Heavy',
  },
  name: {
    fontFamily: 'Avenir-Heavy',
    justifyContent: 'center',
    fontSize: 24,
    color: 'black'
  },
  email: {
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'Avenir',
  },
  website: {
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'Avenir',
  },
  phone: {
    color: 'black',
    justifyContent: 'center',
    fontFamily: 'Avenir',
  },
});