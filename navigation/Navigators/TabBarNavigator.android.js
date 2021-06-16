
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
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
            header: null,
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                //console.log(this.props)
                //console.log(navigation)
                /* this.animationLikesScreen = animationEffect
                 this.animationDashScreen = ""
                 this.animationChatScreen = ""
                 this.resetnbMessages = false*/
                 //if
                defaultHandler()
            },
            tabBarButtonComponent: () => (

                    <AddButton /*onRef={ref => (this.child = ref)}*/ screenprops={{ isAScreens: true }}
                    />


            ),
            /* tabBarIcon: ({ tintColor, focused }) => (
                 <View style={{position: 'absolute', zIndex: 1, bottom: 50,
                 backgroundColor: 'green',
		height: 80,
		width: 80,
		borderRadius: 80 / 2,
		top: -20,
		zIndex: 4,
		marginBottom: 50,
                 
                 }}>
                     <Icon
                         name='hearto'
                         type='antdesign'
                         size={60}
                         //size={focused ? theme.BOTTOM_BAR_ICON_ACTIVE : theme.BOTTOM_BAR_ICON}
                         color={tintColor}
                     />
                 </View>
             )*/
        }
    },
    SettingsStackScreen: {
        screen: SettingsStack,
        navigationOptions: {
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
        initialRouteName: 'ArStackScreen',
        tabBarPosition: 'bottom',
        animationEnabled: false,
        tabBarOptions: {
            showLabel: false,
            lazyLoad: true,
            showIcon: true,
            tintColor: theme.WHITE,
            inactiveTintColor: theme.PRIMARY_INACTIVE_COLOR,
            activeTintColor: '#fff',
            containerStyle: { position: 'absolute', zIndex: 50 },
            style: {
                //width: '100%',
                backgroundColor: theme.PRIMARY_COLOR,
                borderTopWidth: 0,
                //position: 'absolute',
                zIndex: 999,
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
        //lazy: true,
        /*tabBarComponent: props =>
        <TabBarComponent
          {...props}
          style={{ borderTopColor: '#605F60' }}
        />,*/
        // tabBarComponent: props => <TabBar {...props} />,
    },
)
export default TabNavigatorCli