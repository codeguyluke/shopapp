import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'react-native-uuid'
import moment from 'moment'

import shoppingListsState from '../../state/shopping-lists'
import Header from '../../components/navigation-header'
import ShoppingLists, { DATE_FORMAT } from './shopping-lists'

const CURRENT_LISTS_TITLE = 'Current shopping lists'
const ARCHIVED_LISTS_TITLE = 'Archived shopping lists'

export class ShoppingListsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        title={
          navigation.state && navigation.state.params && navigation.state.params.archived
            ? ARCHIVED_LISTS_TITLE
            : CURRENT_LISTS_TITLE
        }
        onRightPress={() => {
          const listId = navigation.state.params.onCreateList()
          navigation.navigate('Details', { listId })
        }}
        rightIconName="add-circle"
      />
    ),
  })

  static propTypes = {
    lists: PropTypes.object.isRequired,
    onCreateList: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    screenProps: PropTypes.shape({
      archived: PropTypes.bool.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const {
      onCreateList,
      screenProps: { archived },
    } = this.props
    this.props.navigation.setParams({ onCreateList, archived })
  }

  handleListPress = listId => () => {
    const { navigation } = this.props
    navigation.navigate('Details', { listId })
  }

  sortLists = lists => {
    const sortedLists = []
    Object.keys(lists).forEach(key => {
      sortedLists.push(lists[key])
    })
    sortedLists.sort(
      (first, second) => (moment(first.createdAt).isAfter(moment(second.createdAt)) ? -1 : 1)
    )
    return sortedLists
  }

  render() {
    const {
      lists,
      screenProps: { archived },
    } = this.props
    return (
      <ShoppingLists
        lists={this.sortLists(lists)}
        onListPress={this.handleListPress}
        archived={archived}
      />
    )
  }
}

const mapStateToProps = (state, { screenProps: { archived } }) => ({
  lists: archived
    ? shoppingListsState.selectors.selectArchivedLists(state)
    : shoppingListsState.selectors.selectCurrentLists(state),
})

export const mapDispatchToProps = dispatch => ({
  onCreateList: () => {
    const id = uuid.v1()
    const createdAt = moment()
    const title = `${createdAt.format(DATE_FORMAT)}`
    dispatch(
      shoppingListsState.actions.createList({
        id,
        createdAt: createdAt.toISOString(),
        title,
        items: {},
        archived: false,
      })
    )
    return id
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListsContainer)
