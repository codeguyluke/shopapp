import { types } from './shopping-lists.actions'

/**
 * Action handlers
 */

const createListHandler = (state, { payload }) => ({
  ...state,
  [payload.id]: payload,
})

const toggleArchiveHandler = (state, { payload }) => {
  const newList = {
    ...state[payload.id],
    archived: !state[payload.id].archived,
  }
  return {
    ...state,
    [payload.id]: newList,
  }
}

const renameListHandler = (state, { payload: { id, title } }) => {
  const newList = {
    ...state[id],
    title,
  }
  return {
    ...state,
    [id]: newList,
  }
}

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

const toggleItemHandler = (state, { payload: { listId, id } }) => {
  const shoppingList = state[listId]
  const newItem = {
    ...shoppingList.items[id],
    checked: !shoppingList.items[id].checked,
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
  switch (action.type) {
    case types.CREATE_LIST:
      return createListHandler(state, action)
    case types.TOGGLE_ARCHIVE:
      return toggleArchiveHandler(state, action)
    case types.RENAME_LIST:
      return renameListHandler(state, action)
    case types.ADD_ITEM:
      return addItemHandler(state, action)
    case types.UPDATE_ITEM:
      return updateItemHandler(state, action)
    case types.TOGGLE_ITEM:
      return toggleItemHandler(state, action)
    case types.DELETE_ITEM:
      return deleteItemHandler(state, action)
    default:
      return state
  }
}
