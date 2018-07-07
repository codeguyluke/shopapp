import React from 'react'
import { View, Text } from 'react-native'
import ImmutablePropTypes from 'react-immutable-proptypes'

import styles from './shopping-lists.styles'

const NO_CURRENT_LISTS_TEXT =
  "You currently don't have any shopping list open.\nPress 'Add' button to create one."

export default function ShoppingLists({ lists }) {
  console.log('lists', lists)

  return (
    <View style={styles.container}>
      {lists.size === 0 ? (
        <Text style={styles.noListsText}>{NO_CURRENT_LISTS_TEXT}</Text>
      ) : (
        <Text>fdsfsfs</Text>
      )}
    </View>
  )
}

ShoppingLists.propTypes = {
  lists: ImmutablePropTypes.map.isRequired,
}
