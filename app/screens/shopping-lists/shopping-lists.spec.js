import React from 'react'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import noop from 'lodash/noop'
import shoppingListsState from '../../state/shopping-lists'
import ShoppingListsContainerWithConnect, {
  ShoppingListsContainer,
  mapDispatchToProps,
} from './shopping-lists.container'
import ShoppingLists from './shopping-lists'

jest.mock('react-native-uuid', () => ({
  v1: () => 'def',
}))

describe('ListDetails', () => {
  const listsMock = [{ id: 'abc', title: 'list title', createdAt: '2018-07-10T11:22:33.444Z' }]
  const component = (
    <ShoppingLists
      lists={listsMock}
      onListPress={noop}
      archived={false}
    />
  )

  it('matches snapshot', () => {
    const wrapper = shallow(component)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when no lists', () => {
    const wrapper = shallow(React.cloneElement(component, { lists: [] }))
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when archived', () => {
    const wrapper = shallow(React.cloneElement(component, { archived: true }))
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when no lists and archived', () => {
    const wrapper = shallow(React.cloneElement(component, { lists: [], archived: true }))
    expect(wrapper).toMatchSnapshot()
  })

  it('handles onListPress callback', () => {
    const onListPressSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onListPress: onListPressSpy }))
    wrapper.find('ListItem').simulate('press')
    expect(onListPressSpy).toHaveBeenCalledTimes(1)
    expect(onListPressSpy).toHaveBeenCalledWith('abc')
  })
})

describe('ShoppingListsContainer', () => {
  const navigationMock = {
    setParams: jest.fn(),
    navigate: jest.fn(),
  }

  describe('connected', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      [shoppingListsState.STORE_NAME]: {
        abc: {
          id: 'abc',
          createdAt: '2018-07-10T11:22:33.444Z',
          archived: false,
        },
        def: {
          id: 'abc',
          createdAt: '2018-07-10T11:22:33.444Z',
          archived: true,
        },
      },
    })

    it('matches snapshot when archived', () => {
      const wrapper = shallow(
        <ShoppingListsContainerWithConnect store={store} screenProps={{ archived: true }} navigation={navigationMock} />
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('matches snapshot when not archived', () => {
      const wrapper = shallow(
        <ShoppingListsContainerWithConnect store={store} screenProps={{ archived: false }} navigation={navigationMock} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('component', () => {
    const listsMock = {
      abc: {
        id: 'abc',
        title: 'list title',
        createdAt: '2018-07-10T11:22:33.444Z',
      },
    }
      
    const component = (
      <ShoppingListsContainer
        lists={listsMock}
        onCreateList={noop}
        navigation={navigationMock}
        screenProps={{ archived: false }}
      />
    )

    beforeEach(() => {
      navigationMock.setParams.mockClear()
      navigationMock.navigate.mockClear()
    })

    it('sets params on mount', () => {
      shallow(component)
      expect(navigationMock.setParams).toHaveBeenCalledTimes(1)
      expect(navigationMock.setParams).toHaveBeenCalledWith({
        onCreateList: noop,
        archived: false,
      })
    })

    it('handles list press correctly', () => {
      const instance = shallow(component).instance()
      instance.handleListPress('abc')()
      expect(navigationMock.navigate).toHaveBeenCalledTimes(1)
      expect(navigationMock.navigate).toHaveBeenCalledWith('Details', { listId: 'abc' })
    })

    it('sorts lists correctly', () => {
      const lists = {
        abc: { createdAt: '2018-07-11T11:22:33.444Z' },
        ghi: { createdAt: '2018-07-12T11:22:33.444Z' },
        def: { createdAt: '2018-07-10T11:22:33.444Z' },
      }
      const expectedSortedLists = [
        { createdAt: '2018-07-12T11:22:33.444Z' },
        { createdAt: '2018-07-11T11:22:33.444Z' },
        { createdAt: '2018-07-10T11:22:33.444Z' },
      ]
      const instance = shallow(component).instance()
      expect(instance.sortLists(lists)).toEqual(expectedSortedLists)
    })

    it('maps createList action to onCreateList prop correctly', () => {
      const dispatch = jest.fn()
      const { onCreateList } = mapDispatchToProps(dispatch)
      const instance = shallow(React.cloneElement(component, { onCreateList })).instance()
      instance.props.onCreateList()
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
