import React, { Component } from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import ShoppingListsScreen from './screens/shopping-lists/shopping-lists.container'
import ListDetailsScreen from './screens/list-details/list-details.container'

const ShoppingListsStack = createStackNavigator({
  List: ShoppingListsScreen,
  Details: ListDetailsScreen,
})

class CurrentListsScreen extends Component {
  static router = ShoppingListsStack.router

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ShoppingListsStack navigation={this.props.navigation} screenProps={{ archived: false }} />
    )
  }
}

class ArchivedListsScreen extends Component {
  static router = ShoppingListsStack.router

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    return (
      <ShoppingListsStack navigation={this.props.navigation} screenProps={{ archived: true }} />
    )
  }
}

const tabNavigatorNavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => {
    const { routeName } = navigation.state
    const iconName = routeName === 'CurrentLists' ? 'ios-list-outline' : 'ios-archive'
    return <Icon name={iconName} type="ionicon" size={40} color={tintColor} />
  },
})

export default createBottomTabNavigator(
  {
    CurrentLists: CurrentListsScreen,
    ArchivedLists: ArchivedListsScreen,
  },
  {
    navigationOptions: tabNavigatorNavigationOptions,
    tabBarOptions: {
      activeTintColor: 'midnightblue',
      inactiveTintColor: 'lightgrey',
      showLabel: false,
      style: {
        borderTopWidth: 0,
        backgroundColor: 'whitesmoke',
      },
    },
  }
)
