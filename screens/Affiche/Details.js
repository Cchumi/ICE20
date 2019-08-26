/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  WebView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
//import all the components we will need
import Icon from 'react-native-vector-icons/Ionicons';
import { center } from '../../navigation/components/constants';
class Details extends Component {
  
   static navigationOptions =({navigation}) =>( {
        title: navigation.getParam('title', 'A Nested Details Screen').toUpperCase(),
        headerLeft: <Icon name={'ios-arrow-back'} size={40} color={'#fff'}
                            onPress={ () => { navigation.goBack() }} style={{width: 50, paddingLeft: 5}}/>,
        headerStyle: {
          backgroundColor: 'rgba(230, 0, 126, 1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      });
  constructor(props) {
    super(props);
    this.state = {

    };
    this.jsonEscape = this.jsonEscape.bind(this);
  }
  componentDidMount() {
//alert('ok');
  }

  jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}
  render() {
    const { navigation } = this.props;
    const image = navigation.getParam('image', '');
    const title = navigation.getParam('title', '');
    const description = navigation.getParam('description', '');
    const data = navigation.getParam('data', '');
    const materials = navigation.getParam('materials', '');
    const animations = navigation.getParam('animations', '');
  //  const descparse = JSON.parse(jsonEscape(description));
    //const html = navigation.getParam('html', '');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={styles.MainContainer}>
        <Image style={styles.imageThumbnail} source={{ uri: image }}/>
        { description
        ? <View style={styles.TxtContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text><Text style={styles.description}>{description.replace('\\n', '</br>')}</Text></View> : null
        }
        {/*JSON.stringify(otherParam)*/}
        <TouchableOpacity style={styles.DownloadContainer} onPress={ ()=>{ this.props.navigation.navigate('DemoTemplate', {
              data:data,
              materials: materials,
              animations: animations,
            })}}
        //onPress={ ()=>{ Linking.openURL(image)}}
        
        >
        <View style={styles.button}>
          <Text style={styles.text}>Je n'ai pas de marker</Text>
          <Text style={styles.text}>Je veux essayer</Text>
        </View>
        {/*<Icon name="ios-eye" size={50} style={{}} />*/}
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(Details);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    //alignItems: 'center',
    
    flex: 1,

  },
  TxtContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'column',
    //alignItems: 'stretch',
   // alignItems: 'flex-start',
   // height: 200,
  },
  imageThumbnail: {
    justifyContent: 'center',
   // alignItems: 'flex-start',
    height: 200,
  },
  title: {
      flex: 1,
    justifyContent: 'center',
    //fontSize: 
    alignSelf: 'flex-end',
    alignItems: 'center',
    //height: 100,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'rgba(230, 0, 126, 1)',
},
  description: {
      //flex: 1,
    justifyContent: 'center',
    //fontSize: 
    paddingLeft: 5,
    alignItems: 'flex-start',
    //height: 100,
  },
  DownloadContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 80,
    //fontSize: 
   // height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    //height: 100,  style={{height: 100, justifyContent:'center', alignItems:'center'}}
  },
  downloadtxt: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    //fontSize: 
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    //height: 100,
  },
  button: {
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: 'rgba(230, 0, 126, 1)',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
    backgroundColor: 'rgba(230, 0, 126, 1)',
  },
  // Button text
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
});