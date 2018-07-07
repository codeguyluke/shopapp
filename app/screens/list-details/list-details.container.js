import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

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
        type="edit"
      />
    ),
  })

  static propTypes = {
    listDetails: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      items: ImmutablePropTypes.map,
    }).isRequired,
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const { listDetails } = this.props
    this.props.navigation.setParams({ title: listDetails.get('title') })
  }

  render() {
    return <ListDetails items={Map({})} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  listDetails: state.getIn([shoppingListsState.STORE_NAME, `${ownProps.navigation.getParam('listId')}`]),
})

export default connect(mapStateToProps)(ListsDetailsContainer)
