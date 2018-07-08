import React, { Component } from 'react'
import { View, Modal } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './styles'

export default class ListMenu extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    listTitle: PropTypes.string.isRequired,
  }

  render() {
    const { show, listTitle } = this.props

    return (
      <Modal animationType="slide" transparent={false} visible={show}>
        <View style={styles.container}>
          <FormLabel>LIST TITLE</FormLabel>
          <FormInput onChangeText={() => {}} value={listTitle} />
          <FormValidationMessage>Error message</FormValidationMessage>
        </View>
      </Modal>
    )
  }
}
