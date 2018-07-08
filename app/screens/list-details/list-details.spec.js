import React from 'react'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import noop from 'lodash/noop'
import shoppingListsState from '../../state/shopping-lists'
import ListDetailsContainerWithConnect, {
  ListsDetailsContainer,
  mapDispatchToProps,
} from './list-details.container'
import ListDetails from './list-details'

describe('ListDetails', () => {
  const itemsMock = [{ id: 'abc' }]
  const component = (
    <ListDetails
      items={itemsMock}
      archived={false}
      onAddItem={noop}
      onUpdateItem={noop}
      onToggleItem={noop}
      onDeleteItem={noop}
    />
  )

  it('matches snapshot', () => {
    const wrapper = shallow(component)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when no items', () => {
    const wrapper = shallow(React.cloneElement(component, { items: [] }))
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when archived', () => {
    const wrapper = shallow(React.cloneElement(component, { archived: true }))
    expect(wrapper).toMatchSnapshot()
  })

  it('handles onAddItemPress callback', () => {
    const onAddItemSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onAddItem: onAddItemSpy }))
    wrapper.find('Button').simulate('press')
    expect(onAddItemSpy).toHaveBeenCalledTimes(1)
  })
})

describe('ListsDetailsContainer', () => {
  const navigationMock = {
    setParams: jest.fn(),
    getParam: () => 'abc',
  }

  describe('connected', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      [shoppingListsState.STORE_NAME]: {
        abc: {
          id: 'abc',
          title: 'list title',
          items: {},
        },
      },
    })

    it('matches snapshot', () => {
      const wrapper = shallow(
        <ListDetailsContainerWithConnect store={store} navigation={navigationMock} />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('component', () => {
    const listDetailsMock = {
      id: 'abc',
      title: 'list title',
      items: {},
      archived: false,
    }
    const component = (
      <ListsDetailsContainer
        listDetails={listDetailsMock}
        navigation={navigationMock}
        onToggleArchive={noop}
        onRenameList={noop}
        onAddItem={noop}
        onUpdateItem={noop}
        onToggleItem={noop}
        onDeleteItem={noop}
      />
    )

    beforeEach(() => {
      navigationMock.setParams.mockClear()
    })

    it('sets params on mount', () => {
      const wrapper = shallow(component)
      expect(navigationMock.setParams).toHaveBeenCalledTimes(1)
      expect(navigationMock.setParams).toHaveBeenCalledWith({
        title: 'list title',
        openMenu: wrapper.instance().openMenu,
      })
    })

    it('updates title when component updated', () => {
      const wrapper = shallow(component)

      const newDetails = { ...listDetailsMock, title: 'changed title' }
      wrapper.setProps({ listDetails: newDetails })
      expect(navigationMock.setParams).toHaveBeenCalledTimes(2)
      expect(navigationMock.setParams).toHaveBeenLastCalledWith({
        title: 'changed title',
      })
    })

    it('sets correct showMenu state', () => {
      const wrapper = shallow(component)
      expect(wrapper.state().showMenu).toBe(false)
      wrapper.instance().openMenu()
      expect(wrapper.state().showMenu).toBe(true)
      wrapper.instance().closeMenu()
      expect(wrapper.state().showMenu).toBe(false)
    })

    it('sorts items correctly', () => {
      const items = {
        abc: { createdAt: '2018-07-11T11:22:33.444Z' },
        ghi: { createdAt: '2018-07-12T11:22:33.444Z' },
        def: { createdAt: '2018-07-10T11:22:33.444Z' },
      }
      const expectedSortedItems = [
        { createdAt: '2018-07-10T11:22:33.444Z' },
        { createdAt: '2018-07-11T11:22:33.444Z' },
        { createdAt: '2018-07-12T11:22:33.444Z' },
      ]
      const instance = shallow(component).instance()
      expect(instance.sortItems(items)).toEqual(expectedSortedItems)
    })

    it('maps toggleArchive action to onToggleArchive prop correctly', () => {
      const dispatch = jest.fn()
      const { onToggleArchive } = mapDispatchToProps(dispatch, { navigation: navigationMock })
      const instance = shallow(React.cloneElement(component, { onToggleArchive })).instance()
      instance.props.onToggleArchive()
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(shoppingListsState.actions.toggleArchive({ id: 'abc' }))
    })

    it('maps renameList action to onRenameList prop correctly', () => {
      const dispatch = jest.fn()
      const { onRenameList } = mapDispatchToProps(dispatch, { navigation: navigationMock })
      const instance = shallow(React.cloneElement(component, { onRenameList })).instance()
      instance.props.onRenameList('changed')
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        shoppingListsState.actions.renameList({ id: 'abc', title: 'changed' })
      )
    })

    it('maps addItem action to onAddItem prop correctly', () => {
      const dispatch = jest.fn()
      const { onAddItem } = mapDispatchToProps(dispatch, { navigation: navigationMock })
      const instance = shallow(React.cloneElement(component, { onAddItem })).instance()
      instance.props.onAddItem()
      expect(dispatch).toHaveBeenCalledTimes(1)
      // expect(dispatch).toHaveBeenCalledWith(
      //   shoppingListsState.actions.addItem({
      //     listId: 'abc',
      //     id: 'def',
      //     name: '',
      //     checked: false,
      //     createdAt: '2018-07-10T11:22:33.444Z',
      //   })
      // )
    })

    it('maps updateItem action to onUpdateItem prop correctly', () => {
      const dispatch = jest.fn()
      const { onUpdateItem } = mapDispatchToProps(dispatch, { navigation: navigationMock })
      const instance = shallow(React.cloneElement(component, { onUpdateItem })).instance()
      instance.props.onUpdateItem({ id: 'def', name: 'new name' })
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        shoppingListsState.actions.updateItem({ listId: 'abc', id: 'def', name: 'new name' })
      )
    })

    it('maps toggleItem action to onToggleItem prop correctly', () => {
      const dispatch = jest.fn()
      const { onToggleItem } = mapDispatchToProps(dispatch, { navigation: navigationMock })
      const instance = shallow(React.cloneElement(component, { onToggleItem })).instance()
      instance.props.onToggleItem({ id: 'def' })()
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        shoppingListsState.actions.toggleItem({ listId: 'abc', id: 'def' })
      )
    })

    it('maps deleteItem action to onDeleteItem prop correctly', () => {
      const dispatch = jest.fn()
      const { onDeleteItem } = mapDispatchToProps(dispatch, { navigation: navigationMock })
      const instance = shallow(React.cloneElement(component, { onDeleteItem })).instance()
      instance.props.onDeleteItem({ id: 'def' })()
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        shoppingListsState.actions.deleteItem({ listId: 'abc', id: 'def' })
      )
    })
  })
})
