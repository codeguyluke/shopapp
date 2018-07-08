import { types } from './shopping-lists.actions'
import reducer, { initialState } from './shopping-lists.reducer'

describe('shopping lists reducer', () => {
  it('should be defined', () => {
    expect(reducer).toBeDefined()
  })

  it('should return initial state', () => {
    const newState = reducer(undefined, undefined)
    expect(newState).toEqual(initialState)
  })

  it('should allow to create list', () => {
    const action = {
      type: types.CREATE_LIST,
      payload: {
        id: 'abc',
        createdAt: '2018-07-08T11:22:33.444Z',
        title: 'test title',
        items: {},
        archived: false,
      },
    }
    const expectedState = {
      abc: {
        id: 'abc',
        createdAt: '2018-07-08T11:22:33.444Z',
        title: 'test title',
        items: {},
        archived: false,
      },
    }
    expect(reducer(null, action)).toEqual(expectedState)
  })

  it('should allow to toggle archive', () => {
    const currentState = {
      abc: {
        id: 'abc',
        archived: false,
      },
    }
    const action = {
      type: types.TOGGLE_ARCHIVE,
      payload: { id: 'abc' },
    }
    const archivedState = {
      abc: {
        id: 'abc',
        archived: true,
      },
    }
    expect(reducer(currentState, action)).toEqual(archivedState)
    expect(reducer(archivedState, action)).toEqual(currentState)
  })

  it('should allow to rename list', () => {
    const state = {
      abc: {
        id: 'abc',
        title: 'initial',
      },
    }
    const action = {
      type: types.RENAME_LIST,
      payload: { id: 'abc', title: 'changed' },
    }
    const expectedState = {
      abc: {
        id: 'abc',
        title: 'changed',
      },
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should allow to add item', () => {
    const state = {
      abc: {
        items: {},
      },
    }
    const action = {
      type: types.ADD_ITEM,
      payload: {
        listId: 'abc',
        id: 'def',
        name: 'item name',
        checked: false,
        createdAt: '2018-07-08T11:22:33.444Z',
      },
    }
    const expectedState = {
      abc: {
        items: {
          def: {
            listId: 'abc',
            id: 'def',
            name: 'item name',
            checked: false,
            createdAt: '2018-07-08T11:22:33.444Z',
          },
        },
      },
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should allow to update item', () => {
    const state = {
      abc: {
        items: {
          def: {
            name: 'initial',
          },
        },
      },
    }
    const action = {
      type: types.UPDATE_ITEM,
      payload: {
        listId: 'abc',
        id: 'def',
        name: 'changed',
      },
    }
    const expectedState = {
      abc: {
        items: {
          def: {
            name: 'changed',
          },
        },
      },
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should allow to toggle item', () => {
    const nonCheckedState = {
      abc: {
        items: {
          def: {
            checked: false,
          },
        },
      },
    }
    const action = {
      type: types.TOGGLE_ITEM,
      payload: {
        listId: 'abc',
        id: 'def',
      },
    }
    const checkedState = {
      abc: {
        items: {
          def: {
            checked: true,
          },
        },
      },
    }
    expect(reducer(nonCheckedState, action)).toEqual(checkedState)
    expect(reducer(checkedState, action)).toEqual(nonCheckedState)
  })

  it('should allow to delete item', () => {
    const state = {
      abc: {
        items: {
          def: {
            name: 'def item',
          },
        },
      },
    }
    const action = {
      type: types.DELETE_ITEM,
      payload: {
        listId: 'abc',
        id: 'def',
      },
    }
    const expectedState = {
      abc: {
        items: {},
      },
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
})
