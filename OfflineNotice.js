import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
        <Icon name="ios-close" size={20} />
      <Text style={styles.offlineText}>Pas de connexion Internet.</Text>
      <Text style={styles.offlineText}>Votre expérience sera limitée.</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
  /*  backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30*/
    position: 'absolute', 
    backgroundColor: '#00000066', 
    left: 0, 
    right: 0, 
    top: 0, 
    height:34,  
    alignSelf: 'stretch', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;