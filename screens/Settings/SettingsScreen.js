
import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert, FlatList, ActivityIndicator } from "react-native";
import { withNavigation, NavigationEvents, NavigationScreenProps } from 'react-navigation';
import FloatingLabelInput from '../Message/components/FloatingLabelInput';
//import Icon from 'react-native-vector-icons/Ionicons';
import { center } from "../../navigation/components/constants";

import { ListItem, Icon } from 'react-native-elements';

//import CodePush from "react-native-code-push";

class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Paramètres",
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
      skipIntro: null,
      isReady: false,
      settingsData: [
        {
          "id": "1",
          "titre": "Développeur",
          "description": "Pierre Gagliardi",
          "email": "pierregagliardi@pierregagliardi.com",
          "avatar_url": 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          "ScreenName": 'Infos'
        },
        {
          "id": "2",
          "titre": "Version",
          "description": "Cliquez pour vérifier les mises à jours",
          "avatar_url": 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          "ScreenName": 'Update'
        },
        {
          "id": "3",
          "titre": "Tutoriel",
          "description": "voir",
          "avatar_url": 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          "ScreenName": 'Tutoriel'
        },
        {
          "id": "4",
          "titre": "Message",
          "description": "Envoyez moi un petit message",
          "avatar_url": 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          "ScreenName": 'Message'
        },
        {
          "id": "5",
          "titre": "Dévérouillage",
          "description": "Dévérouiller des fonctionnalitées avancées",
          "avatar_url": 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          "ScreenName": 'AdminPasswd'
        }
      ],
    }
    // this.createClass = this.createClass.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    //this.getUpdateMetadata = this.getUpdateMetadata.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
    this.goToOtherScreen = this.goToOtherScreen.bind(this);
  }
  componentDidMount = () => {
    //this.getUpdateMetadata();
    // this.props.navigation.navigate("MainNavigator");
    // this._updateList();
    // Hide the status bar
    //StatusBar.setHidden(true);
    /* if(this.state.skipIntro){
      // this.props.navigation.navigate("Intro");
     }
     else {
       //this.props.navigation.navigate("HomeScreen");
     }*/
    //this.props.navigation.navigate("HomeScreen");
  };

  /*async _updateList () { 
    AsyncStorage.getItem('@ICE20:skipIntro').then((val) => {
      this.setState({ skipIntro: val, isReady: true })
    });
  } */

  goToOtherScreen(ScreenName) {
    this.props.navigation.navigate(ScreenName);
  }

   _onPressItem(item, index) {
    // loop over your state data and create newStateArray 
    console.log(index);
    console.log(item);
    this.props.navigation.navigate(item.navigate);
    //item.onPress;
    /* newState = this.state.data.map((val,i) => {
         if (index === i) {
             // change selected value of pressed entry
             return { ...val, selected: !val.selected }; 
         }
         //otherwise just return current value
         return val;
     }
     this.setState({ data: newState }); */
  }

  keyExtractor = (item, id) => id.toString()

  renderItem = ({ item, index }) => (
    <ListItem
      component={TouchableHighlight}
      title={item.titre}
      subtitle={item.description}
      //leftAvatar={{ source: { uri: item.avatar_url } }}
      chevron={{ color: 'rgba(230, 0, 126, 1)' }}
      //leftIcon={{ name: 'ios-home', onPress: () => console.log('clicked') }}
      //rightAvatar={{ rounded: true, source: { uri: item.avatar_url} }}
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      titleNumberOfLines={0}
      subtitleNumberOfLines={0}
      onPress={() => this.goToOtherScreen(item.ScreenName)}
    />
  )

  render() {
    console.log(this.props)
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={true}
        data={this.state.settingsData}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  }

  renders() {
    console.log(this.state.settingsData);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.settingsData}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          //renderItem={this.renderItem} 
          /*renderItem={({ item }) => (
            <ListItem style={styles.flatview} 
              //roundAvatar
              title={item.titre}
              //title={`${item.name.first} ${item.name.last}`}
              subtitle={item.description}
              avatar={{ uri: item.avatar_url }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}*/
          keyExtractor={this.keyExtractor}
          //keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        /* ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
         onRefresh={this.handleRefresh}
         refreshing={this.state.refreshing}
         onEndReached={this.handleLoadMore}
         onEndReachedThreshold={50}*/
        />

      </View>
    );


    /* return (
       <View style={styles.container}>
           <FlatList
           data={this.state.settingsData}
           showsVerticalScrollIndicator={true}
           renderItem={({item}) =>
           <View style={styles.flatview}>
             <Text style={styles.titre}>{item.titre}</Text>
             <Text style={styles.description}>{item.description}</Text>
           </View>
           }
           keyExtractor={item => item.id} 
           ItemSeparatorComponent={this.renderSeparator} 
         />
       </View>
     );*/
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    //justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    //justifyContent: 'flex-start',
    padding: 5,
    borderRadius: 2,
    backgroundColor: 'rgba(230, 0, 126, 1)',
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 14,
    color: 'rgba(230, 0, 126, 1)',
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Verdana',
    fontSize: 12,
    color: 'rgba(230, 0, 126, 1)'
  }

});
//export default withNavigation(Settings);
export default Settings;