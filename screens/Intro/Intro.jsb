import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,
  Image,         // Container component
  Alert,
  Linking,
  AsyncStorage
} from 'react-native';

//import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from './Swiper';
import Conditions from '../Conditions/ConditionsGenerales';
//Icon.loadFont();
class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audiopaused: false,
    };
  }
  render() {
    return (
      <Swiper>
        {/* First screen */}
        <View style={[styles.slide, { }]}>
          {/*<Icon name="ios-beer" {...iconStyles} />*/}
          <View style={styles.topContainer}>
            <Image source = {require('./assets/1.png')} style={styles.images} resizeMode="contain" />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.header}>Scannez nos supports print</Text>
            <Text style={styles.text}>Dès que vous voyez un visuel augmenté avec notre application, scannez-le. </Text>
            <Text style={styles.textConditions} onPress={() => Linking.openURL("http://pierregagliardi.com/reactapp/js/ice/markers/imagetargets.pdf")} >Je n'ai pas de visuel, en imprimer. </Text>
          </View>
        </View>
        {/* Second screen */}
        <View style={[styles.slide, { backgroundColor: 'rgba(230, 0, 126, 1)' }]}>
          {/*<Icon name="ios-beer" {...iconStyles} />*/}
          <View style={styles.topContainer}>
            <Image source = {require('./assets/2.png')} style={styles.images} resizeMode="contain" />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.header}>Découvrez des contenus exclusifs</Text>
            <Text style={styles.text}>Profitez d'une expérience en réalité augmentée sur votre écran</Text>
          </View>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: 'rgba(230, 0, 126, 1)' }]}>
         {/*<Icon name="ios-beer" {...iconStyles} />*/}
         <View style={styles.topContainer}>
            <Image source = {require('./assets/3.png')} style={styles.images} resizeMode="contain" />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.header}>Partagez avec vos amis</Text>
            <Text style={styles.text}>Capturez votre expérience et partagez-la avec vos amis</Text>
            <Text style={styles.textConditions} onPress={() => this.props.navigation.navigate('Conditions')} >Conditions Générales</Text>
          </View>
        </View>
      </Swiper>
    );
  }
}

export default Intro;

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'flex-start',   // Center vertically
    alignItems: 'center',       // Center horizontally
    /*flexDirection: 'column',*/
    backgroundColor: 'rgba(230, 0, 126, 1)',
  },
  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  middleContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  /*bottomContainer: {
    justifyContent: 'flex-start',
    width: '90%',
    margin: 20,
    padding: 10,
  },*/
  images: {
    height: 275,
    width: 400,
    /*transform: [{rotate: '20deg'}],*/
    /*alignSelf: 'center',*/
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 0,
   /* marginHorizontal: 40,*/

  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  textConditions: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 30,
    marginVertical: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});