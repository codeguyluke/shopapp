import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import uuid from 'react-native-uuid'
import moment from 'moment'

import shoppingListsState from '../../state/shopping-lists'
import HeaderRight from '../../components/header-right'
import ShoppingLists from './shopping-lists'

const TITLE_FORMAT = 'MM/DD/YYYY HH:mm'

export class ShoppingListsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Current shopping lists',
    headerTintColor: 'navy',
    headerRight: (
      <HeaderRight
        onPress={() => {
          const id = uuid.v1()
          const title = `${moment().format(TITLE_FORMAT)}`
          navigation.state.params.addList({ id, title })
          navigation.navigate('Details', { listId: id })
        }}
        type="add"
      />
    ),
  })

  static propTypes = {
    lists: ImmutablePropTypes.map.isRequired,
    addList: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const { addList } = this.props
    this.props.navigation.setParams({ addList })
  }

  render() {
    return <ShoppingLists lists={this.props.lists} />
  }
}

const mapStateToProps = state => ({
  lists: state.getIn([shoppingListsState.STORE_NAME]),
})

const mapDispatchToProps = dispatch => ({
  addList: params => dispatch(shoppingListsState.actions.createShoppingList(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListsContainer)
