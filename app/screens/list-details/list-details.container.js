import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'react-native-uuid'
import get from 'lodash/get'

import shoppingListsState from '../../state/shopping-lists'
import HeaderRight from '../../components/header-right'
import ListDetails from './list-details'

export class ListsDetailsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerTintColor: 'navy',
    headerRight: (
      <HeaderRight
        onPress={() => {
          console.log('rename here')
        }}
        title="Edit"
      />
    ),
  })

  static propTypes = {
    listDetails: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      items: PropTypes.object.isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { listDetails } = this.props
    this.props.navigation.setParams({ title: listDetails.title })
  }

  render() {
    const { listDetails, onAddItem, onUpdateItem } = this.props
    return (
      <ListDetails items={listDetails.items} onAddItem={onAddItem} onUpdateItem={onUpdateItem} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  listDetails: get(
    state[shoppingListsState.STORE_NAME],
    `${ownProps.navigation.getParam('listId')}`
  ),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddItem: () =>
    dispatch(
      shoppingListsState.actions.addItem({
        listId: ownProps.navigation.getParam('listId'),
        id: uuid.v1(),
        name: '',
      })
    ),
  onUpdateItem: ({ id, name }) =>
    dispatch(
      shoppingListsState.actions.updateItem({
        listId: ownProps.navigation.getParam('listId'),
        id,
        name,
      })
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsDetailsContainer)
