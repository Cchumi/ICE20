/* STACK DES LIKES

*/
import { createStackNavigator } from 'react-navigation'
import AfficheScreen from '../../screens/Affiche/AfficheScreen'
import AfficheDetailsScreen from '../../screens/Affiche/Details'
import AfficheDemoScreen from '../../screens/Affiche/DemoTemplate'
import LoadingScreen from '../../screens/loading/LoadingScreen'
import theme from '../../styles/theme.styles'

const AfficheStackNavigator = createStackNavigator({
    Affiche: {
        screen: AfficheScreen,
        navigationOptions: {
            headerTitle: 'A l\'affiche',
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
    Details: {
        screen: AfficheDetailsScreen,
        navigationOptions: {
            //headerTitle: 'Détails',
            headerStyle: {
                backgroundColor: theme.PRIMARY_COLOR,
                elevation: 0,
                // backgroundColor: 'yellow',
            },
            headerTintColor: theme.WHITE,
            headerTitleStyle: {
                fontWeight: theme.FONT_WEIGHT_LIGHT,
                alignSelf: 'center',
                justifyContent: "center",
                flex: 1,
                textAlign: 'center'
                /*alignSelf: 'center',
                textAlign: "center",
                justifyContent: 'center',
                flex: 1,
                fontWeight: 'bold',
                textAlignVertical: 'center',marginLeft: 'auto', marginRight: 'auto'*/
            },
        },
    },
    DemoTemplate: {
        screen: AfficheDemoScreen,
        navigationOptions: {
            //header: null
        },
    },
    /* Loading: {
         screen: LoadingScreen,
     }*/
},
    {
        cardStyle: {
            //backgroundColor: 'rgba(0,0,0,0)',
            opacity: 1,
        },
    })
AfficheStackNavigator.navigationOptions = ({ navigation }) => {
    // get the name of the route
    const { routeName } = navigation.state.routes[navigation.state.index];

    if (routeName === 'Details' || routeName === 'DemoTemplate') {
        tabBarVisible = false;
    }
    else {
        tabBarVisible = true;
    }
    return {
        tabBarVisible, // this now varies based on screen
        //tabBarLabel: "Search", // this is the same for all screens
    };
};

export default AfficheStackNavigator