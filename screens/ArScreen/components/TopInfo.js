import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Dimensions,
    AsyncStorage,
    Modal, 
    Text
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

import {Overlay, Header} from 'react-native-elements';


const iconStyles = {
  size: 30,
  color: 'rgba(230, 0, 126, 1)',
};
class TopInfo extends Component {
    static navigationOptions =({navigation}) =>( {
        header: null,
      });
    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
        };
        this._renderTopInfo = this._renderTopInfo.bind(this);
        this._handlePressTopInfo = this._handlePressTopInfo.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

      _renderTopInfo() {
        return (
  
          <View style={{position: 'absolute', flex:1, flexDirection:'row', right: 5, top: 5, justifyContent: 'flex-end', alignItems: 'flex-end', height: 30, width: 30}}>
            <TouchableOpacity
              onPress={this._handlePressTopInfo}
              underlayColor={'#00000000'} >
              <View>
              <Icon name="md-information-circle-outline" {...iconStyles} />
              </View>
            </TouchableOpacity>
            <View>
            <Overlay
              isVisible={this.state.modalVisible}
              windowBackgroundColor="transparent" //"rgba(255, 255, 255, .5)"
              overlayBackgroundColor='rgba(230, 0, 126, 1)'
              width="auto"
              height="auto"
            >
            <View>
            <Header
              containerStyle={{
                backgroundColor: 'transparent',
                justifyContent: 'space-around',
              }}
              rightComponent={
                <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Icon
                  name="ios-close"
                  size={30}
                  color="#FFF"
                />
              </TouchableOpacity>}
            centerComponent={{ text: 'Les boutons ?', style: { color: '#fff' } }}
            //rightComponent={{ icon: 'ios-close', color: '#fff' }}
            />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Icon
                  name="ios-flash"
                  size={20}
                  color="#FFF"
                  style={styles.icon}
                />
                <Text style={styles.text}>Activer / Désactiver le flash</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                <Icon
                  name="ios-image"
                  size={20}
                  color="#FFF"
                  style={styles.icon}
                />
                <Text style={styles.text}>Prendre une photo</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Icon
                  name="ios-videocam"
                  size={20}
                  color="#FFF"
                  style={styles.icon}
                />
                <Text style={styles.text}>Enregistrer une vidéo</Text>
              </View>
              </View>
            </Overlay>
                      {/*<Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                      }}>
                      <View  style = {styles.modal}>
                        <View>
                          <Text>Hello World!</Text>
            
                          <TouchableHighlight
                            onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                          </Modal>*/}
                    </View>
          </View>
                 
        );
       }
       _handlePressTopInfo() {
        this.setModalVisible(true);
        //this.props.navigation.navigate("Intro");
        //AsyncStorage.setItem('@ICE20:skipIntro', "");
      }

      render() {
    
        return (
 
           
            this._renderTopInfo()

        );
      }
}

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     backgroundColor: '#ede3f2',
     padding: 100
  },
  modal: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#f7021a',
     padding: 100
  },
  icon: {
    color: '#ffffff',
    marginTop: 10,
    left: 10,
    marginRight: 10,
 },
  text: {
     color: '#ffffff',
     marginTop: 10,
     left: 10,
     marginRight: 10,
  }
})
export default withNavigation(TopInfo);