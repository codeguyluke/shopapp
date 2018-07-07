import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 0,
    paddingLeft: 16,
  },
})

export default function HeaderRight({ onPress, title }) {
  return (
    <Button
      onPress={onPress}
      buttonStyle={styles.button}
      color="midnightblue"
      fontFamily="Hind"
      fontSize={18}
      title={title}
    />
  )
}

HeaderRight.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
