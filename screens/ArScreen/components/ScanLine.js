import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Animated,
    Dimensions,
    AsyncStorage,
    Easing,
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
const iconStyles = {
  size: 30,
  color: 'rgba(230, 0, 126, 1)',
};
var {
  width,
  height
} = Dimensions.get('window');
class ScanLine extends Component {
   /* static navigationOptions =({navigation}) =>( {
        header: null,
      });*/
    constructor(props) {
        super(props);

        this._renderTrackingScanLine = this._renderTrackingScanLine.bind(this);
        //this._changeStateScanline = this._changeStateScanline.bind(this);
    
      }

      toggleAnimation(){
        //if (this.state.animationScanLine) {
   
         this.position = new Animated.ValueXY(0, 0);
         this.animatedValue = new Animated.Value(0);
         //return (
         Animated.loop(
             Animated.sequence([
               Animated.timing(this.animatedValue, { toValue: 1, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
               Animated.timing(this.animatedValue, { toValue: 0, duration: 3000, easing: Easing.ease, useNativeDriver: true }),
             ])).start();
   
        // )  
       // }
       /*this.setState((state) => {
         const newLiked = !state.liked;
   
         if (newLiked) {
           Animated.sequence([
             Animated.spring(this.animatedValue, { toValue: 1 }),
             Animated.spring(this.animatedValue, { toValue: 0 }),
           ]).start();
         }
   
         return { liked: newLiked };
       });*/
     }

      renderOverlay = () => {
        const lineStyles = [
          styles.lineStyle,
          {
            transform: [
              {
                translateY: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-height/2, height/2]
                })
              }
            ],
          },
        ];
     
        return (
           <View style={styles.overlay}>
            <Animated.View style={lineStyles} />
          </View> 
        );
       }

     /* _changeStateScanline() {
        //Alert.alert("changed");
        this.setState({
         //isLoading: !this.state.isLoading,
         animationScanLine: false,
        });
        
      }*/
       _handlePressTopInfo() {

      }
      _renderTrackingScanLine() {
        this.toggleAnimation();
          return (
            this.renderOverlay()
            );
          }
      render() {
    //console.log("render Scanline");
        return (
 
           
            this._renderTrackingScanLine()

        );
      }
}
const styles = StyleSheet.create({
lineStyle:{
  borderWidth: 4,
  borderColor:'rgba(230, 0, 126, 1)',
  margin:0,
  top: 0,
  width: width,
  shadowOffset:{ width: 0, height: 1, },
  shadowColor: 'white',
  shadowOpacity: 0.5,
  elevation: 1,
  shadowRadius: 10 
},
overlay: {
  position:'absolute',
  left:0,
  right:0,
  top:0,
  bottom:0,
  alignItems: 'center',
  justifyContent:'center'
},
});
export default ScanLine;