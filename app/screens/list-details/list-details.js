import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { List, ListItem, Button } from 'react-native-elements'
import PropTypes from 'prop-types'

import Item from './list-item'
import styles from './list-details.styles'

export default function ListsDetails({
  items,
  archived,
  onAddItem,
  onUpdateItem,
  onToggleItem,
  onDeleteItem,
}) {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      {Object.keys(items).length !== 0 && (
        <List containerStyle={styles.listContainer}>
          {Object.keys(items).map(key => (
            <ListItem
              key={key}
              component={Item}
              item={items[key]}
              archived={archived}
              onUpdate={onUpdateItem}
              onToggle={onToggleItem}
              onDelete={onDeleteItem}
            />
          ))}
        </List>
      )}
      {!archived ? (
        <Button
          title="Add new item"
          onPress={onAddItem}
          fontFamily="Hind-Medium"
          fontSize={16}
          color="darkslategrey"
          icon={{ name: 'add', color: 'darkslategrey', size: 20 }}
          rounded
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
        />
      ) : null}
    </KeyboardAwareScrollView>
  )
}

ListsDetails.propTypes = {
  items: PropTypes.object.isRequired,
  archived: PropTypes.bool.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}
