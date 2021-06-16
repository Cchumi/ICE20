/* STACK DES LIKES

*/
import { createStackNavigator } from 'react-navigation'

import SettingsScreen from '../../screens/Settings/SettingsScreen'
import InfosScreen from "../../screens/Infos/Infos";
import UpdateScreen from "../../screens/Update/Update";
import TutorielScreen from "../../screens/Tutoriel/Tutoriel";
import MessageScreen from "../../screens/Message/Message";
import ConditionsScreen from '../../screens/Conditions/ConditionsGenerales'
import AdminPasswdScreen from '../../screens/AdminPasswd/AdminPasswd'

import theme from '../../styles/theme.styles'
const SettingsStackNavigator = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            headerTitle: 'Paramètres',
            headerStyle: {
                backgroundColor: theme.PRIMARY_COLOR,
                elevation: 0
            },
            headerTintColor: theme.WHITE,
            headerTitleStyle: {
                fontWeight: theme.FONT_WEIGHT_LIGHT,
            },
        },
    },
    Infos: {
        screen: InfosScreen,
    },
    Update: {
        screen: UpdateScreen,
    },
    Tutoriel: {
        screen: TutorielScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            }
        },
    },

    Message: {
        screen: MessageScreen,
    },
    ConditionsGeneralesTuto: {
        screen: ConditionsScreen,

    },
    AdminPasswd: {
        screen: AdminPasswdScreen
    }
})
SettingsStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default SettingsStackNavigator