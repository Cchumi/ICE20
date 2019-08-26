/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {fetchProductsAffiche} from '../../js/redux/actions/productActions';
//import * as FETCHConstants from '../../js/redux/FETCHConstants';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight,
  Platform,
  Modal, 
} from 'react-native';
//import all the components we will need
const webUrl = 'http://pierregagliardi.com/reactapp/';

class Affiche extends Component {
    static navigationOptions =({navigation}) =>( {
        title: "A l'affiche",
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
      dataSource: {},
      refreshing: false,
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
    //this.props.dispatch(fetchProductsAffiche());
  }
  onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    const url = `https://api.stackexchange.com/2.2/users?page=1&order=desc&sort=reputation&site=stackoverflow`;
    this.props.dispatch(fetchProductsAffiche());
    this.setState({ isRefreshing: false });
   /* axios.get(url)
      .then(res => {
        let data = res.data.items
        this.setState({ isRefreshing: false, data: data }) // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
      })
      .catch(error => {
        this.setState({ isRefreshing: false, error: 'Something just went wrong' }) // false isRefreshing flag for disable pull to refresh
      });*/
  }

  _keyExtractor = (item, index) => item.name;
  render() {
    const { error, loading, products } = this.props;

    if (error) {
      return (
        <View style={styles.MainContainer}>
        <Text style={styles.titleStyle}>Error! {error.message}</Text>
        </View>
      )

//return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <View style={styles.MainContainer}>
        <Text style={styles.titleStyle}>Loading...</Text>
        </View>
      )
    }
    if (this.state.loading && this.page === 1) {
      return <View style={{
        width: '100%',
        height: '100%'
      }}><ActivityIndicator style={{ color: '#000' }} /></View>;
    }
    return (
      <View style={styles.MainContainer}>
      {/*<Text style={styles.titleStyle}>test</Text>*/}
        <FlatList
         //style={{ margin: 0, padding: 0, backgroundColor: 'pink' }} 
         navigation={this.props.navigation}
          data={products.markers}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          //renderItem={this.renderItems}
          renderItem={({ item, index }) =>    
          <View  style={{ flex: 1, flexDirection: 'column', margin: 1}} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
              image: item.imageDemo,
              title: item.titre,
              description: item.description,
              data:item,
              materials:products.materials,
              animations:products.animations,
             // html: item.html,
              otherParam: 'anything you want here',
            })} >
         <Image style={styles.imageThumbnail} source={{ uri: item.imageDemo }} />
         <View  style={styles.titleOverlay}>
            <Text style={styles.titleStyle}>{item.titre}</Text>
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

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Affiche);

const styles = StyleSheet.create({
  MainContainer: {
    //justifyContent: 'center',
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
    marginLeft: 2,
    marginRight: 2,
    textAlign: 'center',
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }
    }),
    fontSize: 14,
    fontWeight: 'bold',
},
});
