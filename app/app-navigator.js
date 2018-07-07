import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-elements'

import ShoppingListsScreen from './screens/shopping-lists/shopping-lists'
import ListDetailsScreen from './screens/list-details/list-details'

/**
 * CurrentLists stack navigator
 */

const currentListScreenNavigationOptions = ({ navigation }) => ({
  title: 'Current shopping lists',
  headerRight: (
    <Button
      onPress={() => {
        navigation.navigate('Details')
      }}
      title="Info"
      color="#fff"
    />
  ),
})

const currentListDetailsScreenNavigationOptions = () => ({
  title: 'List details',
  headerBackTitle: null,
})

const CurrentListsStack = createStackNavigator({
  List: {
    screen: ShoppingListsScreen,
    navigationOptions: currentListScreenNavigationOptions,
  },
  Details: {
    screen: ListDetailsScreen,
    navigationOptions: currentListDetailsScreenNavigationOptions,
  },
})

/**
 * ArchivedLists stack navigator
 */

const ArchivedListsStack = createStackNavigator({
  List: ShoppingListsScreen,
  Details: ListDetailsScreen,
})

/**
 * Apps Tab Navigator
 */

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
      activeTintColor: 'crimson',
      inactiveTintColor: 'grey',
      showLabel: false,
    },
  }
)
