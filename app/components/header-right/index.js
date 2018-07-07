import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 0,
    paddingLeft: 16,
  }
})

export default function HeaderRight({ onPress, type }) {
  return type === 'add' ? (
    <Button
      onPress={onPress}
      containerViewStyle={styles.buttonContainer}
      buttonStyle={styles.button}
      color="navy"
      fontFamily="Hind"
      fontSize={18}
      title="Add"
    />
  ) : (
    <Button
      onPress={onPress}
      containerViewStyle={styles.buttonContainer}
      buttonStyle={styles.button}
      icon={{ name: 'border-color', color: 'navy', size: 20 }}
    />
  )
}

HeaderRight.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['add', 'edit']).isRequired,
}
