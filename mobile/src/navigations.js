import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { FontAwesome, Feather, SimpleLineIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import NewChordScreen from './screens/NewChordScreen';

import ButtonHeader from './components/ButtonHeader'
import HeaderAvatar from './components/HeaderAvatar'

import { colors } from './utils/constants' 


const TAB_ICON_SIZE = 20;

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="home" />,
      }),
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: 'Explore',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="search" />,
      }),
    },
  /*  NewChord: {
      screen: NewChordScreen,
      navigationOptions: () => ({
        headerTitle: 'Create Chord',
        tabBarIcon: ({ tintColor }) =>
          <Feather size={TAB_ICON_SIZE} color={tintColor} name="plus-circle" />,
      }),
    }, */
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: 'Notifications',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="bell" />,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  },
);

const NewChordModel = StackNavigator(
  {
    NewChord: {
      screen: NewChordScreen,
    }
  },
  {
    headerMode: 'none'
  }
)

// takes object where we pass the home screen
const AppMainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderAvatar />,
      headerRight: (
        <ButtonHeader side="right" onPress={() => navigation.navigate('NewChord')}>
          <Feather color={colors.PRIMARY} size={20} name="plus-circle" />
        </ButtonHeader>
      )
    })
  },
  NewChord: {
    screen: NewChordModel
  }
}, 
{
  cardStyle: {
    backgroundColor: '#F1F6FA',
 },
   navigationOptions: () => ({
     headerStyle: {
       backgroundColor: colors.WHITE,
     },
     headerTitleStyle: {
       fontWeight: 'bold',
       color: colors.SECONDARY
     }
   })

});

class AppNavigator extends Component {
  render() { 
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    })
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />
    }
    return <AppMainNav navigation={nav} />
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user
}))(AppNavigator);

export const router = AppMainNav.router;