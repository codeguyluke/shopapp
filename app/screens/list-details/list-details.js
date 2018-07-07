import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default function ListsDetails({ items }) {
  console.log('list details items', items)
  return (
    <View>
      <Text>This will be shopping list details screen.</Text>
    </View>
  )
}

ListsDetails.propTypes = {
  items: PropTypes.object.isRequired,
}
