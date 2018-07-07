import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'react-native-uuid'
import get from 'lodash/get'

import shoppingListsState from '../../state/shopping-lists'
import Header from '../../components/navigation-header'
import ListDetails from './list-details'

export class ListsDetailsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        title={navigation.state.params.title}
        onRightPress={() => {
          console.log('edit list')
        }}
        rightIconName="edit"
        showBack
        onBack={() => navigation.goBack()}
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
    onDeleteItem: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { listDetails } = this.props
    this.props.navigation.setParams({ title: listDetails.title })
  }

  render() {
    const { listDetails, onAddItem, onUpdateItem, onDeleteItem } = this.props
    return (
      <ListDetails
        items={listDetails.items}
        onAddItem={onAddItem}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
      />
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
  onDeleteItem: ({ id }) => () =>
    dispatch(
      shoppingListsState.actions.deleteItem({
        listId: ownProps.navigation.getParam('listId'),
        id,
      })
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsDetailsContainer)
