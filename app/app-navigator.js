import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import ShoppingListsScreen from './screens/shopping-lists/shopping-lists.container'
import ListDetailsScreen from './screens/list-details/list-details.container'

const CurrentListsStack = createStackNavigator({
  List: ShoppingListsScreen,
  Details: ListDetailsScreen,
})

const ArchivedListsStack = createStackNavigator({
  List: ShoppingListsScreen,
  Details: ListDetailsScreen,
})

const tabNavigatorNavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => {
    const { routeName } = navigation.state
    const iconName = routeName === 'CurrentLists' ? 'ios-list-outline' : 'ios-archive'
    return <Icon name={iconName} type="ionicon" size={40} color={tintColor} />
  },
})

export default createBottomTabNavigator(
  {
    CurrentLists: CurrentListsStack,
    ArchivedLists: ArchivedListsStack,
  },
  {
    navigationOptions: tabNavigatorNavigationOptions,
    tabBarOptions: {
      activeTintColor: 'midnightblue',
      inactiveTintColor: 'lightgrey',
      showLabel: false,
    },
  }
)
