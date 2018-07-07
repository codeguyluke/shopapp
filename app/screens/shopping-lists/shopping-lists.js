import React from 'react'
import { ScrollView, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './shopping-lists.styles'

const NO_CURRENT_LISTS_TEXT =
  "You currently don't have any shopping list open.\nPress 'Add' button to create one."

export const DATE_FORMAT = 'MM/DD/YYYY, HH:mm'

export default function ShoppingLists({ lists, onListPress }) {
  return (
    <ScrollView style={styles.container}>
      {Object.keys(lists).length === 0 ? (
        <Text style={styles.noListsText}>{NO_CURRENT_LISTS_TEXT}</Text>
      ) : (
        <List>
          {Object.keys(lists).map(key => (
            <ListItem
              key={lists[key].id}
              title={lists[key].title}
              titleStyle={styles.listItemTitle}
              subtitle={`CREATED: ${lists[key].createdAt.format(DATE_FORMAT)}`}
              subtitleStyle={styles.listItemSubtitle}
              chevronColor="darkslategrey"
              onPress={onListPress(lists[key].id)}
            />
          ))}
        </List>
      )}
    </ScrollView>
  )
}

ShoppingLists.propTypes = {
  lists: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
  onListPress: PropTypes.func.isRequired,
}
