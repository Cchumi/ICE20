import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar, Image, ActivityIndicator, Platform } from "react-native";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import OfflineNotice from '../../components/OfflineNotice'
import AsyncStorage from '@react-native-community/async-storage';
import CodePush from "react-native-code-push";
import { GotAdminRight } from '../../redux/actions';
class LoadingScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            skipIntro: null,
            isReady: false,
            restartAllowed: true,
            version: null,
            label: null,
            appCheck: false,
            isLoading: true,
            isLoaded: false,
            gotAdminRight: false,
            campagnes: this.props.campagnes,
            animations: this.props.animations,
            materials: this.props.materials
        }
        /* this.sync = this.sync.bind(this);
         this.getUpdateMetadata = this.getUpdateMetadata.bind(this);
         this.codePushDownloadDidProgress = this.codePushDownloadDidProgress.bind(this);
         this.codePushStatusDidChange = this.codePushStatusDidChange.bind(this);*/
    }


    codePushStatusDidChange = (syncStatus) => {
        if (this._isMounted && syncStatus) {
            switch (syncStatus) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    this.setState({ syncMessage: "Vérification de mises à jours.", appCheck: false });
                    break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    this.setState({ syncMessage: "Téléchargement en cours." });
                    break;
                case CodePush.SyncStatus.AWAITING_USER_ACTION:
                    this.setState({ syncMessage: "Attente action utilisateur." });
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    this.setState({ syncMessage: "Installation de la mise à jour." });
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    this.setState({ syncMessage: "App à jour.", progress: false, appCheck: true });
                    break;
                case CodePush.SyncStatus.UPDATE_IGNORED:
                    this.setState({ syncMessage: "Mise à jour annulée par l'utilisateur.", progress: false });
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    this.setState({ syncMessage: "Mise à jour appliqué et sera installé au prochain redémarrage.", progress: false, appCheck: false });
                    break;
                case CodePush.SyncStatus.UNKNOWN_ERROR:
                    this.setState({ syncMessage: "Une erreur inconnue s'est produite.", progress: false });
                    break;
                default:
                    return null;
            }
        }
    }

    codePushDownloadDidProgress = (progress) => {
        console.log(progress)
        if (progress) {
            this.setState({ progress });
        }
    }

    toggleAllowRestart = () => {
        this.state.restartAllowed
            ? CodePush.disallowRestart()
            : CodePush.allowRestart();

        this.setState({ restartAllowed: !this.state.restartAllowed });
    }

    getUpdateMetadata = () => {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata) => {
                console.log(metadata)
                if (metadata) {
                    this.setState({ /*syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version",*/ progress: false, label: metadata.label, version: metadata.appVersion, description: metadata.description });
                }
            }, (error) => {
                this.setState({ syncMessage: "Error: " + error, progress: false });
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended) */
    sync = () => {
        CodePush.sync(
            { installMode: CodePush.InstallMode.IMMEDIATE },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this),
            this.getUpdateMetadata.bind(this),
            //this.getData.bind(this)
        );

    }
    /* async getData() {
         //console.log(AsyncStorage.getItem("@ICE20:skipIntro"))
         return await AsyncStorage.getItem("@ICE20:skipIntro");
     }*/
    getData = async () => {
        try {
            const skipIntro = await AsyncStorage.getItem("@LabelConnect:skipIntro")

            if (skipIntro !== null) {
                this.setState({ skipIntro: skipIntro, appCheck: true });
                // value previously stored
            }
            else {
                this.setState({ appCheck: true });
            }
            const gotAdminRight = await AsyncStorage.getItem("@LabelConnect:GotAdminRight")
            if (gotAdminRight !== null) {
                console.log('got admin right')
                this.setState({ gotAdminRight: true });
                this.props.dispatchGotAdminRight(true)
                // value previously stored
            }
            else {
                this.setState({ gotAdminRight: false });
            }
        } catch (e) {
            // error reading value
        }
    }
    componentDidMount = async () => {
        //console.log(this.props)
        //const skipIntro = 


        this._isMounted = true;
        if (this._isMounted) {
            CodePush.notifyApplicationReady();
            const update = await CodePush.checkForUpdate();
            if (update) {
                //alert('update')
                this.sync();
            }
            else {
                //alert('no update')

                this.getData();
            }
        }
        //if (this._isMounted) {
        //CodePush.notifyApplicationReady();
        //this.getUpdateMetadata();
        // this.sync();
        //const skipIntro = this.getData();
        //this.setState({ skipIntro: skipIntro });
        //this.getData();
        //setTimeout(() => {

        //this.getUpdateMetadata();
        //this.sync();
        //this.getData();

        //  }, 2000)

        // }


    }
    /*componentDidUpdate = (prevProps) => {
    }*/

    _goToMainApp = () => {


        if (!this.state.skipIntro) {
            setTimeout(() => {
                this.props.navigation.navigate('Intro', { data: this.props.campagnes, materials: this.props.materials, animations: this.props.animations });
            }, 1000)
        } else {
            setTimeout(() => {
                this.props.navigation.navigate('Ar', { campagnes: this.props.campagnes, materials: this.props.materials, animations: this.props.animations });
            }, 1000)
            //console.log('main')
            /* this.props.navigation.setParams({
                 key1: 'value1',
                 key2: 'value2',
               })*/
            /*const navigateAction = NavigationActions.navigate({
                routeName: 'MainApp',
                params: { datas: this.props.campagnes, materialss: this.props.materials, animationss: this.props.animations },

                // navigate can have a nested navigate action that will be run inside the child router
                action: NavigationActions.navigate({ routeName: 'Ar', params: { data: this.props.campagnes, materials: this.props.materials, animations: this.props.animations }, }),
            });
            this.props.navigation.dispatch(navigateAction);*/


            //this.props.navigation.navigate('MainApp', { name: 'Brent' })
            //this.props.navigation.navigate('AppStack', {data: "hello"});
            /*this.props.navigation.navigate('Loading', {}, {
                type: "Navigate",
                routeName: "AppStack",
                params: 'grrrrr',
              });*/
            //this.props.navigation.navigate('MainNavigator');
        }
    }

    render() {
        let progressView;
        if (this.state.progress) {
            progressView = (
                <Text style={styles.messages}>{(this.state.progress.receivedBytes / 125000).toFixed(2)}mb de {(this.state.progress.totalBytes / 125000).toFixed(2)}mb téléchargés</Text>
            );
        }
        console.log('AppCheck ', this.state.appCheck)
        if (!this.state.appCheck || (isEmpty(this.props.auth) || !isLoaded(this.props.auth) || isEmpty(this.props.campagnes) || !isLoaded(this.props.campagnes) || isEmpty(this.props.animations) || !isLoaded(this.props.animations) || isEmpty(this.props.materials) || !isLoaded(this.props.materials))) {
            //console.log('campagnes ', this.props.campagnes)
            ////console.log('materials ', this.props.materials)
            return (
                <View style={styles.outer}>
                    <View style={[{ flex: 1 }, styles.elementsContainer]}>
                        <OfflineNotice />
                        <View style={styles.logo}>
                            <Image
                                style={{ width: 150, height: 150 }}
                                //source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                                source={require('./assets/MACARONLABELCONNECT.png')}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            {/*<Text style={styles.version}>Version:{this.state.version}.{this.state.label}</Text>
                    <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>*/}
                            <ActivityIndicator size="large" color='rgba(230, 0, 126, 1)' />
                            <Text style={styles.messages}>CHARGEMENT EN COURS...</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {progressView}
                        </View>
                    </View>
                </View>
            )
        }

        // if (!isEmpty(this.props.campagnes)) {
        ////console.log('campagnes ', this.props.campagnes)
        //if (this.state.isLoaded) {

        return (
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems:'center' }}>
                <Text style={styles.messages}>ENCORE UN PEU DE PATIENCE...</Text>
                {this._goToMainApp()}
            </View>
        )
        // }
        //return null

        // }
        //return (
        //     <Text>Wait</Text>
        // )

        //  }
    }
}
const styles = StyleSheet.create({
    outer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(230, 0, 126, 1)',
    },
    elementsContainer: {
        //backgroundColor: '#ecf5fd',
        /*  marginLeft: 24,
          marginRight: 24,
          marginBottom: 24*/
    },
    arView: {
        flex: 1,
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
    version: {
        marginTop: 10,
        textAlign: "center",
        color: 'rgba(230, 0, 126, 1)',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        fontSize: 10,
        //fontWeight: 'bold',
    },
    messages: {
        marginTop: 20,
        textAlign: "center",
        color: 'rgba(230, 0, 126, 1)',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        fontSize: 12,
        fontWeight: 'bold',
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
});

const mapStateToProps = (state, store) => {
    console.log(state)
    //console.log(store)
    return {
        auth: state.firebase.auth,
        // pass auth data as props.auth
        campagnes: state.firestore.ordered.campagnes,
        animations: state.firestore.ordered.animations,
        materials: state.firestore.ordered.materials,
        gotAdminRight: state.ui.gotAdminRight
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchGotAdminRight: (value) => dispatch(GotAdminRight(value))
    }
}

/*export default compose(
    connect(({ firestore }) => ({
      auth: firestore.auth,
    })),
    firestoreConnect(),
  )(LoadingScreen);*/

export default withNavigation(compose(
    connect(mapStateToProps, mapDispatchToProps),
    /*connect((state) => ({
        //campagnes: state.firestore.ordered.campagnes,
        // profile: state.firestore.profile, // pass profile data as props.profile
        auth: state.firebase.auth,
        // pass auth data as props.auth
        campagnes: state.firestore.ordered.campagnes,
        animations: state.firestore.ordered.animations,
        materials: state.firestore.ordered.materials,
    })),*/
    firebaseConnect(),
    //firestoreConnect(),
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
)(LoadingScreen))