import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'react-native-uuid'
import get from 'lodash/get'

import shoppingListsState from '../../state/shopping-lists'
import Header from '../../components/navigation-header'
import ListMenu from './list-menu'
import ListDetails from './list-details'

export class ListsDetailsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        title={navigation.state.params.title}
        onRightPress={navigation.state.params.openMenu}
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
    onToggleItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
  }

  state = {
    showMenu: false,
  }

  componentDidMount() {
    const { listDetails } = this.props
    this.props.navigation.setParams({ title: listDetails.title, openMenu: this.openMenu })
  }

  closeMenu = () => {
    this.setState({ showMenu: false })
  }

  openMenu = () => {
    this.setState({ showMenu: true })
  }

  render() {
    const { listDetails, onAddItem, onUpdateItem, onToggleItem, onDeleteItem } = this.props
    const { showMenu } = this.state

    return (
      <React.Fragment>
        <ListDetails
          items={listDetails.items}
          onAddItem={onAddItem}
          onUpdateItem={onUpdateItem}
          onToggleItem={onToggleItem}
          onDeleteItem={onDeleteItem}
        />
        <ListMenu show={showMenu} archived={listDetails.archived} onClose={this.closeMenu} onArchivePress={() => {}} onTitleChange={() => {}} listTitle={listDetails.title} />
      </React.Fragment>
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
        checked: false,
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
  onToggleItem: ({ id }) => () =>
    dispatch(
      shoppingListsState.actions.toggleItem({
        listId: ownProps.navigation.getParam('listId'),
        id,
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
