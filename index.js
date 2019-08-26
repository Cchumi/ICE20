/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => App);
import codePush from "react-native-code-push";
//codePush.notifyApplicationReady();
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
let codePushOptionss = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, updateDialog: { appendReleaseDescription: true, descriptionPrefix: " Description: ", title: "Mise à jour disponible!", mandatoryUpdateMessage:"Installer la nouvelle mise à jour ??", optionalUpdateMessage: "Installer la nouvelle mise à jour ?", optionalIgnoreButtonLabel: "Surtout pas!",
optionalInstallButtonLabel: "Bien sûr!"}, installMode: codePush.InstallMode.IMMEDIATE };
//let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));