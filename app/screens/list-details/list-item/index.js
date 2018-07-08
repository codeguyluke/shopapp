import React from 'react'
import { View, TextInput } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './styles'

export default function ListItem({ item, archived, onUpdate, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <CheckBox
        checked={item.checked}
        size={24}
        onPress={onToggle({ id: item.id })}
        containerStyle={styles.checkBoxContainer}
        disabled={archived}
        checkedColor={archived ? 'lightgrey' : 'green'}
      />
      <TextInput
        key={item.id}
        editable={!archived}
        placeholder="Shopping item"
        style={styles.textInput}
        onChangeText={value => onUpdate({ id: item.id, name: value })}
        value={item.name}
        autoCorrect={false}
        opacity={archived ? 0.6 : 1}
      />
      {!archived && (
        <Button
          onPress={onDelete({ id: item.id })}
          icon={{ name: 'remove-circle', color: 'crimson', size: 24 }}
          containerViewStyle={styles.deleteButtonContainer}
          buttonStyle={styles.deleteButton}
        />
      )}
    </View>
  )
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
  }).isRequired,
  archived: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
