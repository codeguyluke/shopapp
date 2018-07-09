import React, { Component } from 'react'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import PropTypes from 'prop-types'

import styles from './styles'

export const FADE_DURATION = 200

export default class ListMenu extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    archived: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onArchivePress: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    listTitle: PropTypes.string.isRequired,
  }

  state = {
    showModal: false,
  }

  setBlurRef = ref => {
    this.blurRef = ref
  }

  setViewRef = ref => {
    this.viewRef = ref
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  animateOut = () => {
    const { onClose } = this.props

    if (!this.viewRef) return
    this.viewRef.bounceOutDown().then(() => {
      this.toggleModal()
      if (this.blurRef) {
        this.blurRef.fadeOut(FADE_DURATION).then(onClose)
      } else {
        onClose()
      }
    })
  }

  render() {
    const { show, listTitle, archived, onArchivePress, onTitleChange } = this.props
    const { showModal } = this.state

    const archiveButtonTitle = archived ? 'Unarchive list' : 'Archive list'
    const archiveButtonBackgroundColor = archived ? 'midnightblue' : 'crimson'
    return show ? (
      <Modal animationType="none" transparent visible onRequestClose={this.animateOut}>
        <Animatable.View
          ref={this.setBlurRef}
          animation="fadeIn"
          onAnimationEnd={this.toggleModal}
          duration={FADE_DURATION}
          style={styles.blurContainer}
        >
          <TouchableWithoutFeedback onPress={this.animateOut}>
            <View style={styles.blurContent} />
          </TouchableWithoutFeedback>
        </Animatable.View>
        {showModal && (
          <Animatable.View
            ref={this.setViewRef}
            animation="bounceInUp"
            style={styles.modalContainer}
          >
            <Button
              rounded
              onPress={this.animateOut}
              icon={{ name: 'close', size: 32, color: 'darkslategrey' }}
              containerViewStyle={styles.closeButtonContainer}
              buttonStyle={styles.closeButton}
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.modalContent}>
              {!archived ? (
                <React.Fragment>
                  <FormLabel labelStyle={styles.formLabel} fontFamily="Hind-SemiBold">
                    LIST NAME
                  </FormLabel>
                  <FormInput
                    inputStyle={styles.formInput}
                    placeholder="Shopping list"
                    onChangeText={onTitleChange}
                    value={listTitle}
                    autoCorrect={false}
                  />
                </React.Fragment>
              ) : null}
              <Button
                rounded
                onPress={onArchivePress}
                title={archiveButtonTitle}
                backgroundColor={archiveButtonBackgroundColor}
                buttonStyle={styles.archiveButton}
                textStyle={styles.archiveButtonText}
              />
            </KeyboardAwareScrollView>
          </Animatable.View>
        )}
      </Modal>
    ) : null
  }
}
