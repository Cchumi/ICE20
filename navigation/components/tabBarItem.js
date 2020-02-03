import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, View, Image, StyleSheet, TouchableWithoutFeedback,Alert, AsyncStorage } from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';


class TabItem extends Component {
  handlePress = () => {
    this.props.navigation.navigate(this.props.routeName);
  };

  render() {
    const { routeName, isActive } = this.props;

   // const icon = tabBarIcons[isActive ? 'active' : 'inactive'][routeName];
    return (
      <View>
        <TouchableOpacity onPress={this.handlePress} style={styles.button}>
        <View>
            <Icon name="ios-cog" size={25} />
          </View>
          <View>
            <Text >
              {routeName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabItem;