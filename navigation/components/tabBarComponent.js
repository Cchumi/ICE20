import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, View, StyleSheet, TouchableWithoutFeedback,Alert, AsyncStorage } from 'react-native';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';
import TabItem from './tabBarItem';

class TabBar extends Component {
  render() {
    const { navigation } = this.props;

    const { routes, index } = navigation.state;

    return (
      <View>
        {routes.map((route, i) => (
          <TabItem
            navigation={navigation}
            key={route.routeName}
            {...route}
            isActive={index === i}
          />
        ))}
      </View>
    );
  }
}

export default TabBar;