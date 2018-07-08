import actions, { types } from './shopping-lists.actions'

describe('shopping lists actions', () => {
  it('should have all actions defined', () => {
    expect(actions.createList).toBeDefined()
    expect(actions.toggleArchive).toBeDefined()
    expect(actions.renameList).toBeDefined()
    expect(actions.addItem).toBeDefined()
    expect(actions.updateItem).toBeDefined()
    expect(actions.toggleItem).toBeDefined()
    expect(actions.deleteItem).toBeDefined()
  })

  it('should be able to create list', () => {
    const payload = {
      id: 'abc',
      createdAt: '2018-07-08T11:22:33.444Z',
      title: 'test title',
      items: {},
      archived: false,
    }
    const action = actions.createList(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.CREATE_LIST)
  })

  it('should be able to toggle archive', () => {
    const payload = {
      id: 'abc',
    }
    const action = actions.toggleArchive(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.TOGGLE_ARCHIVE)
  })

  it('should be able to rename list', () => {
    const payload = {
      id: 'abc',
      title: 'new title',
    }
    const action = actions.renameList(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.RENAME_LIST)
  })

  it('should be able to add item', () => {
    const payload = {
      listId: 'abc',
      id: 'def',
      name: 'item name',
      checked: false,
      createdAt: '2018-07-08T11:22:33.444Z',
    }
    const action = actions.addItem(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.ADD_ITEM)
  })

  it('should be able to update item', () => {
    const payload = {
      listId: 'abc',
      id: 'def',
      name: 'item name',
    }
    const action = actions.updateItem(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.UPDATE_ITEM)
  })

  it('should be able to toggle item', () => {
    const payload = {
      listId: 'abc',
      id: 'def',
    }
    const action = actions.toggleItem(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.TOGGLE_ITEM)
  })

  it('should be able to delete item', () => {
    const payload = {
      listId: 'abc',
      id: 'def',
    }
    const action = actions.deleteItem(payload)

    expect(action.payload).toEqual(payload)
    expect(action.type).toBe(types.DELETE_ITEM)
  })
})
