import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'react-native-uuid'
import moment from 'moment'

import shoppingListsState from '../../state/shopping-lists'
import Header from '../../components/navigation-header'
import ShoppingLists, { DATE_FORMAT } from './shopping-lists'

export class ShoppingListsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        title="Current shopping lists"
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
  }

  componentDidMount() {
    const { onCreateList } = this.props
    this.props.navigation.setParams({ onCreateList })
  }

  handleListPress = listId => () => {
    const { navigation } = this.props
    navigation.navigate('Details', { listId })
  }

  render() {
    return <ShoppingLists lists={this.props.lists} onListPress={this.handleListPress} />
  }
}

const mapStateToProps = state => ({
  lists: state[shoppingListsState.STORE_NAME],
})

const mapDispatchToProps = dispatch => ({
  onCreateList: () => {
    const id = uuid.v1()
    const createdAt = moment()
    const title = `${createdAt.format(DATE_FORMAT)}`
    dispatch(
      shoppingListsState.actions.createList({
        id,
        createdAt,
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
