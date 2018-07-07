/**
 * Types definitions
 */

const CREATE_SHOPPING_LIST = 'CREATE_SHOPPING_LIST'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

export const types = {
  CREATE_SHOPPING_LIST,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
}

/**
 * Actions
 */

const createShoppingList = ({ id, createdAt, title, items, archived }) => ({
  type: CREATE_SHOPPING_LIST,
  payload: { id, createdAt, title, items, archived },
})

const addItem = ({ listId, id, name }) => ({
  type: ADD_ITEM,
  payload: { listId, id, name },
})

const updateItem = ({ listId, id, name }) => ({
  type: UPDATE_ITEM,
  payload: { listId, id, name },
})

const deleteItem = ({ listId, id }) => ({
  type: DELETE_ITEM,
  payload: { listId, id },
})

export default {
  createShoppingList,
  addItem,
  updateItem,
  deleteItem,
}
