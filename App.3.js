import React, {Component} from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Alert,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  Image,
  Platform,
  WebView,
  Animated,
  Dimensions,
  Linking,
  Easing, I18nManager } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
I18nManager.forceRTL(false);

const style = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'pink',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'pink',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});
const slidess = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  }
];
const slides = [
  {
    key: 'somethun',
    title: 'Quick setup, good defaults',
    text:
      'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
    icon: 'images',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun1',
    title: 'Super customizable',
    text:
      'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    icon: 'options',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'somethun2',
    title: 'No need to buy me beer',
    text: 'Usage is all free',
    icon: 'beer',
    colors: ['#29ABE2', '#4F00BC'],
  },
];
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
    }
  }
  _renderItem = (item) => {
    return (
      <View style={style.mainContent}>
      <Icon
        style={{ backgroundColor: 'transparent' }}
        name={item.icon}
        size={50}
        color="green"
      />
        <Text style={style.title}>{item.title}</Text>
        {/*<Image source={item.image} />*/}
        <Text style={style.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
    }
  }
}
const styless = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(25, 25, 25, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'red',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});