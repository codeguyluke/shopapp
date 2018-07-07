import { types } from './shopping-lists.actions'

/**
 * Action handlers
 */

const createShoppingListHandler = (state, { payload }) => ({
  ...state,
  [payload.id]: payload,
})

const addItemHandler = (state, { payload }) => {
  const shoppingList = state[payload.listId]
  const newItemsList = {
    ...shoppingList.items,
    [payload.id]: payload,
  }
  const newShoppingList = {
    ...shoppingList,
    items: newItemsList,
  }
  return {
    ...state,
    [payload.listId]: newShoppingList,
  }
}

const updateItemHandler = (state, { payload: { listId, id, name } }) => {
  const shoppingList = state[listId]
  const newItem = {
    ...shoppingList.items[id],
    name,
  }
  const newItemsList = {
    ...shoppingList.items,
    [id]: newItem,
  }
  const newShoppingList = {
    ...shoppingList,
    items: newItemsList,
  }
  return {
    ...state,
    [listId]: newShoppingList,
  }
}

const deleteItemHandler = (state, { payload: { listId, id } }) => {
  const shoppingList = state[listId]
  const newListItems = shoppingList.items
  delete newListItems[id]
  const newShoppingList = {
    ...shoppingList,
    items: newListItems,
  }
  return {
    ...state,
    [listId]: newShoppingList,
  }
}

/**
 * Reducer definition
 */

export const STORE_NAME = 'shoppingLists'

export const initialState = {}
export default function shoppingListsReducer(state = initialState, action = { type: '' }) {
  console.log('reducer', state, action)
  switch (action.type) {
    case types.CREATE_SHOPPING_LIST:
      return createShoppingListHandler(state, action)
    case types.ADD_ITEM:
      return addItemHandler(state, action)
    case types.UPDATE_ITEM:
      return updateItemHandler(state, action)
    case types.DELETE_ITEM:
      return deleteItemHandler(state, action)
    default:
      return state
  }
}
