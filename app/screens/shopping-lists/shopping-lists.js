import React from 'react'
import { ScrollView, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './shopping-lists.styles'

const NO_CURRENT_LISTS_TEXT =
  "You currently don't have any shopping list open.\nPress 'Plus' icon above in order to create one."

const NO_ARCHIVED_LISTS_TEXT = "You don't have any archived shopping list."

export const DATE_FORMAT = 'MM/DD/YYYY, HH:mm'

export default function ShoppingLists({ lists, onListPress, archived }) {
  return (
    <ScrollView style={styles.container}>
      {lists.length === 0 ? (
        <Text style={styles.noListsText}>
          {archived ? NO_ARCHIVED_LISTS_TEXT : NO_CURRENT_LISTS_TEXT}
        </Text>
      ) : (
        <List containerStyle={styles.listContainer}>
          {lists.map(list => (
            <ListItem
              key={list.id}
              title={list.title}
              titleStyle={styles.listItemTitle}
              subtitle={`CREATED: ${list.createdAt.format(DATE_FORMAT)}`}
              subtitleStyle={styles.listItemSubtitle}
              chevronColor="darkslategrey"
              onPress={onListPress(list.id)}
            />
          ))}
        </List>
      )}
    </ScrollView>
  )
}

ShoppingLists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      createdAt: PropTypes.object,
    }).isRequired
  ).isRequired,
  onListPress: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
}
