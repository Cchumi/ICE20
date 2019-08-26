import React, { Component } from 'react';
import { View, StatusBar, TextInput, Input, Animated } from 'react-native';

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    //alert(props.type);
    if(props.type == "Input") {
        //alert("Input");
        return (
       
            <View style={{ paddingTop: 18 }}>
              <Animated.Text style={labelStyle}>
                {label}
              </Animated.Text>
              <TextInput
              {...props}
              style={{ height:props.height,paddingTop:props.paddingTop, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555'}}
              //style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              
              blurOnSubmit
              />
              
            </View>
          );
    }
    if(props.type == "TextInput") {
        //alert("TextInput");
        return (
       
            <View style={{ paddingTop: 18 }}>
              <Animated.Text style={labelStyle}>
                {label}
              </Animated.Text>
              <TextInput
              {...props}
              style={{ height:props.height,paddingTop:props.paddingTop, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555'}}
              //style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              multiline={true}
              numberOfLines={4}
              blurOnSubmit
              />
              
            </View>
          );
    }
  }
}

export default FloatingLabelInput;