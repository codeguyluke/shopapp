import React from 'react'
import { View, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { List, ListItem, Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './list-details.styles'

function Item({ item, onUpdate }) {
  return (
    <View style={styles.listItemContainer}>
      <TextInput
        key={item.id}
        placeholder="Shopping item"
        containerStyle={styles.listItemTextInputContainer}
        style={styles.listItemTextInput}
        onChangeText={value => onUpdate({ id: item.id, name: value })}
        value={item.name}
      />
    </View>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default function ListsDetails({ items, onAddItem, onUpdateItem }) {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      {Object.keys(items).length !== 0 && (
        <List containerStyle={styles.listContainer}>
          {Object.keys(items).map(key => (
            <ListItem key={key} component={Item} item={items[key]} onUpdate={onUpdateItem} />
          ))}
        </List>
      )}
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
    </KeyboardAwareScrollView>
  )
}

ListsDetails.propTypes = {
  items: PropTypes.object.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
}
