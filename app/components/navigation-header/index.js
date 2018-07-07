import React from 'react'
import { Header } from 'react-native-elements'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import styles from './styles'

export default function NavigationHeader({ title, showBack, onBack, rightIconName, onRightPress }) {
  return (
    <Header
      innerContainerStyles={styles.innerContainer}
      outerContainerStyles={styles.outerContainer}
      leftComponent={
        showBack
          ? {
              icon: 'keyboard-arrow-left',
              color: 'midnightblue',
              size: 40,
              onPress: onBack,
              underlayColor: 'transparent',
            }
          : null
      }
      centerComponent={{ text: title, style: styles.center }}
      rightComponent={{
        icon: rightIconName,
        color: 'midnightblue',
        size: 32,
        onPress: onRightPress,
        underlayColor: 'transparent',
      }}
    />
  )
}

NavigationHeader.propTypes = {
  title: PropTypes.string,
  rightIconName: PropTypes.string.isRequired,
  onRightPress: PropTypes.func.isRequired,
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
}

NavigationHeader.defaultProps = {
  title: '',
  showBack: false,
  onBack: noop,
}
