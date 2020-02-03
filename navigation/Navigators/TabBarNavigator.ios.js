
import { createBottomTabNavigator } from 'react-navigation'
import React from "react"
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import AfficheStack from '../Stacks/AfficheStackNavigator'
import ArStack from '../Stacks/ArStackNavigator'
import SettingsStack from '../Stacks/SettingsStackNavigator'
import AddButton from '../components/AddButton';
import theme from '../../styles/theme.styles'


const TabNavigatorCli = createBottomTabNavigator({
    AfficheStackScreen: {
        screen: AfficheStack,
        navigationOptions: {
            title: 'test',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            //header: null,
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                /* this.animationLikesScreen = animationEffect
                 this.animationDashScreen = ""
                 this.animationChatScreen = ""
                 this.resetnbMessages = false*/
                defaultHandler()
            },
            tabBarIcon: ({ tintColor, focused }) => (
                <View>
                    <Icon
                        name='flag'
                        type='antdesign'
                        size={focused ? theme.BOTTOM_BAR_ICON_ACTIVE : theme.BOTTOM_BAR_ICON}
                        color={tintColor}
                    />
                </View>
            )
        }
    },
    ArStackScreen: {
        screen: ArStack,
        navigationOptions: {
            /* header: null,
             tabBarOnPress: ({ navigation, defaultHandler }) => {
                 console.log(navigation)
                
                 defaultHandler()
             },*/
            tabBarButtonComponent: (props) => {
               // console.log(props)
                //AddButtonRef = React.createRef();
                //console.log(props.accessibilityStates)
                //console.log(props.navigation)
                //if(props.accessibilityStates) {}
                return (
                    <AddButton /*ref={this.AddButtonRef}*/ screenprops={{ isAScreens: true }} />
                )
            },
            /*tabBarIcon: ({ tintColor, focused }) => (
                <AddButton onRef={ref => (this.child = ref)} />
            )*/
            /*tabBarIcon: ({ tintColor, focused }) => (
                <View>
                    <Icon
                        name='hearto'
                        type='antdesign'
                        size={focused ? theme.BOTTOM_BAR_ICON_ACTIVE : theme.BOTTOM_BAR_ICON}
                        color={tintColor}
                    />
                </View>
            )*/
        }
    },
    SettingsStackScreen: {
        screen: SettingsStack,
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            //header: null,
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                /* this.animationLikesScreen = animationEffect
                 this.animationDashScreen = ""
                 this.animationChatScreen = ""
                 this.resetnbMessages = false*/
                defaultHandler()
            },
            tabBarIcon: ({ tintColor, focused }) => (
                <View>
                    <Icon
                        name='setting'
                        type='antdesign'
                        size={focused ? theme.BOTTOM_BAR_ICON_ACTIVE : theme.BOTTOM_BAR_ICON}
                        color={tintColor}
                    />
                </View>
            )
        }
    },
},
    {
        navigationOptions: {

            tabBarOnPress: ({ navigation, defaultHandler }) => {
                console.log(navigation)

                defaultHandler()
            },
        },
        initialRouteName: 'ArStackScreen',
        tabBarOptions: {
            showLabel: false,
            lazyLoad: true,
            showIcon: true,
            tintColor: theme.WHITE,
            inactiveTintColor: theme.PRIMARY_INACTIVE_COLOR,
            activeTintColor: '#fff',
            style: {
                backgroundColor: theme.PRIMARY_COLOR,
                borderTopWidth: 0,
                position: 'absolute',
                zIndex: 1,
                elevation: 1,
                left: 0,
                right: 0,
                bottom: 0,
                height: 60
            },
            tabStyle: {

                zIndex: 11111,
                paddingTop: 20,
            },
            indicatorStyle: {
                backgroundColor: 'transparent'
            },
        },
        lazy: true,
        /*tabBarComponent: props =>
        <TabBarComponent
          {...props}
          style={{ borderTopColor: '#605F60' }}
        />,*/
        // tabBarComponent: props => <TabBar {...props} />,
    },
)
export default TabNavigatorCli