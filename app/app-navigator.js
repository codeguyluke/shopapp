import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    return <Ionicons name={iconName} size={40} color={tintColor} />
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
      activeTintColor: 'navy',
      inactiveTintColor: 'lightgrey',
      showLabel: false,
    },
  }
)
