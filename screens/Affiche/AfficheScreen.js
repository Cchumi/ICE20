import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet, StatusBar, Image, FlatList, ActivityIndicator, Platform, TouchableOpacity } from "react-native";
import { withNavigation, NavigationEvents, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import _ from 'lodash';
class AfficheScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animations: this.props.animations,
            materials: this.props.materials,
            gotAdminRight: this.props.gotAdminRight
        }
    }
    _listEmptyComponent = () => {
        return (
            <View>
                <Text>EMPTY</Text>
            </View>
        )
    }
    renderItem = (item, index) => {
        //console.log(item)
        //console.log(index)
        //console.log(this.state.materials)
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }} key={index} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
                    image: item.markerUrl,
                    title: item.titre,
                    description: item.description,
                    data: item,
                    materials: this.state.materials,
                    animations: this.state.animations,
                    gotAdminRight: this.state.gotAdminRight
                })} >
                    <Image style={styles.imageThumbnail} source={{ uri: item.markerUrl }} />
                    <View style={styles.titleOverlay}>
                        <Text style={styles.titleStyle}>{item.titre}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    renderFooter = () => {
        //if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            
          </View>
        );
      };

    render() {
        //const { navigation } = this.props;
        //const data = navigation.dangerouslyGetParent().getParam("data", null);
        //console.log(data)
        //console.log(this.props.campagnes)
        //console.log(this.state.materials)
        /*this.props.campagnes.map(item => {
            //console.log(item)
        })
        Object.keys(this.props.campagnes).map(item => {
            //console.log(item)
        })*/

        /* let dataArray = Object.keys(this.props.campagnes).map(key => {
             let obj = this.props.campagnes[key];
             obj.keyName = key;
             return obj;
         })*/
        /* const johnArr = _.filter(this.props.campagnes, item => !item.disabled);
         console.log(johnArr)*/
        let result = null;
        if (!this.props.gotAdminRight) {
            result = _.flatMap(this.props.campagnes, ({ nom, markers }) => {
                return markers //this.props.campagnes
               // _.size(markers) > 0
                //.filter(item => item.disabled)
                    .filter(item => !item.disabled)
                _.map(markers, marker => ({ nom, ...marker }))
                //.map(sale => sale.total);
            });
        }
        else {
            result = _.flatMap(this.props.campagnes, ({ nom, markers }) => {
                return markers //this.props.campagnes
                //_.size(markers) > 0
                //.filter(item => !item.disabled/*!item.disabled*/)
                _.map(markers, marker => ({ nom, ...marker }))
                //.map(sale => sale.total);
            });
        }


        const results = _.flatMap(this.props.campagnes, ({ nom, markers }) =>
            ////console.log(markers)
            //markers.filter( item =>  !item.disabled )


            _.map(markers, marker => ({ nom, ...marker }))
            //_.filter(markers, item => item.name === "john")


        );
        // console.log(result)

        ////console.log(result)
        ////console.log(this.props.campagnes[0].markers)
        return (
            <View style={styles.outer}>
                <View style={[{ flex: 1 }, styles.elementsContainer]}>
                    <FlatList
                        //style={{ margin: 0, padding: 0, backgroundColor: 'pink' }} 
                        navigation={this.props.navigation}
                        data={result}//{this.props.campagnes[0].markers} //
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                        //Setting the number of column
                        numColumns={2}
                        //keyExtractor={this._keyExtractor}
                        keyExtractor={(item, index) => index}
                        ListEmptyComponent={this._listEmptyComponent}
                        ListFooterComponentStyle={{paddingBottom: 30}}
                        ListFooterComponent= {() => this.renderFooter()}
                    ></FlatList>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    outer: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    elementsContainer: {
        //backgroundColor: '#ecf5fd',
        /*  marginLeft: 24,
          marginRight: 24,
          marginBottom: 24*/
    },
    buttons: {
        height: 80,
        width: 80,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#00000000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff00',
    },
    logo: {
        flex: 3,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-end',

    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    titleOverlay: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    titleStyle: {
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

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        campagnes: state.firestore.ordered.campagnes,
        animations: state.firestore.ordered.animations,
        materials: state.firestore.ordered.materials,
        gotAdminRight: state.ui.gotAdminRight
    }
}

const mapDispatchToProps = {
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
console.log(props)
        if (props.gotAdminRight === true) {
            return [
                {
                    collection: 'campagnes',
                    //where: [['disabled', '==', false]],
                },
                {
                    collection: 'animations',
                },
                {
                    collection: 'materials',
                },
            ]
        }
        else {
            return [
                {
                    collection: 'campagnes',
                    where: [['disabled', '==', false]],
                },
                {
                    collection: 'animations',
                },
                {
                    collection: 'materials',
                },
            ]
        }
    }),
    /*firestoreConnect(props => {
        return [
            {
                collection: 'campagnes',
            },
        ]
    }),*/
    firebaseConnect()
)(AfficheScreen)
//export default AfficheScreen