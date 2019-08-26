/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {fetchProducts} from '../../js/redux/actions';
import * as FETCHConstants from '../../js/redux/FETCHConstants';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
//import all the components we will need
const webUrl = 'http://pierregagliardi.com/reactapp/';

class Affiche extends Component {
    static navigationOptions =({navigation}) =>( {
        title: "A l'affiche",
      });
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
   /* this.state = {
      dataSource: [
        {id: 21, title: "titre1", src: 'http://placehold.it/200x200', clamp_id: 'c0'},
        {id: 22, title: "titre1", src: 'http://placehold.it/200x200', clamp_id: 'c1'},
        {id: 23, title: "titre1", src: 'http://placehold.it/200x200', clamp_id: 'c2'}
      ]
    };*/
    //this.goToDetailScreen = this.goToDetailScreen.bind(this);
  }
  componentDidMount() {
    /*var that = this;
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, title: "Titre " + (i + 1), src: 'http://placehold.it/200x200?text=' + (i + 1), description: "blablablabla.blabla", html: "<h2 class=\"fg-white\">AboutUs</h2><p class=\"fg-white\">developing and supporting complex IT solutions.Touchingmillions of lives world wide by bringing in innovative technology </p>"
    };
    });
    that.setState({
      //Setting the data source
      dataSource: items,
    });*/
  }

  componentWillMount() {
   // this.props.dispatch(fetchProducts());
    //this.makeRemoteRequest();
    
}
  makeRemoteRequest(){
 
    const jsonFile = webUrl + 'ice.json';
    this.setState({ loading: true, isLoading: true, });
   
    fetch(jsonFile, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then(res => res.json())
      .then(res => {
         this.setState({
          isFetching: true,
          dataSource: res.markers,
          totalItemNumber: res.markers.length
        }, function() { 
          //Alert.alert("Récupération des markers terminée. Amusez-vous bien! :-)");
          //this.props.sceneNavigator.viroAppProps._onLoadEnd();
          this.setState({
           isFetching: false
          });

        });
      })
      .catch(error => {
      Alert.alert("ERREUR DE RECUPERATION DES MARKERS. VEUILLEZ ESSAYER ULTERIEUREMENT!");
      console.error(error);
        this.setState({ error, loading: false });
      });
   }

  goToDetailScreen() {
    alert('pass');
    this.props.navigation.navigate('Details');
    /*this.props.navigation.navigate('DetailsHome', {
        //itemId: item.id,
        //title: item.title.rendered,
    });*/
}
/*renderItem = ({ item, index }) => {
  console.log('index je', this.state.index);
  return (
    <View  style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
     <TouchableOpacity onPress={() => this.goToDetailScreen()}>
    <Image style={styles.imageThumbnail} source={{ uri: item.src }}/>
    </TouchableOpacity>
  </View>
  );
};*/
_keyExtractor = (item, index) => item.name;
/*renderItems = ({ item }) => {
  return (
   
    <View  style={{ flex: 1, flexDirection: 'column', margin: 1 }} onPress={() => this.props.navigation.navigate('Details')}>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')} >
    <Image style={styles.imageThumbnail} source={{ uri: item.imageMarker }}/>
    </TouchableOpacity>
  </View>
  
  );
};*/
  render() {
    const { error, loading, products } = this.props;

   /* if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }*/
    return (
      <View style={styles.MainContainer}>
        <FlatList
         navigation={this.props.navigation}
          data={products}
          //renderItem={this.renderItems}
          renderItem={({ item, index }) =>    
          <View  style={{ flex: 1, flexDirection: 'column', margin: 1 }} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
              image: item.imageMarker,
              title: item.name,
              description: item.html,
              html: item.html,
              otherParam: 'anything you want here',
            })} >
         <Image style={styles.imageThumbnail} source={{ uri: item.imageMarker }} />
         <View  style={styles.titleOverlay}>
            <Text style={styles.titleStyle}>{item.name.toUpperCase()}</Text>
          </View>
         </TouchableOpacity>
       </View>}
          //Setting the number of column
          numColumns={2}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}
// -- REDUX STORE
function selectProps(store) {
  return {
    products: state.products.items,
    loading: state.fetch.loading,
    error: state.fetch.error
  };
}
const mapStateToProps = state => ({
  products: state.fetch.items,
  loading: state.fetch.loading,
  error: state.fetch.error
});

export default connect(mapStateToProps)(Affiche);

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  titleOverlay:{
    position : 'absolute',
    flex: 1,
    bottom : 0,
    top : 0,
    left : 0,
    right : 0,
    height: 100,
    alignItems: 'center',
    justifyContent:'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
},
  titleStyle:{
    color: 'white',
    //position : 'absolute',
    //bottom : 30,
    //top : 0,
    /*left : 0,
    right : 0,*/
    //alignSelf: 'center',
   //alignItems: 'center',
    //justifyContent:'flex-end',
    fontFamily: 'Cochin',
    fontSize: 16,
    fontWeight: 'bold',
},
});