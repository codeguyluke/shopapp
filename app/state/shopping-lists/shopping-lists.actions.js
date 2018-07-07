/**
 * Types definitions
 */

const CREATE_SHOPPING_LIST = 'CREATE_SHOPPING_LIST'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const TOGGLE_ITEM = 'TOGGLE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

export const types = {
  CREATE_SHOPPING_LIST,
  ADD_ITEM,
  UPDATE_ITEM,
  TOGGLE_ITEM,
  DELETE_ITEM,
}

/**
 * Actions
 */

const createList = ({ id, createdAt, title, items, archived }) => ({
  type: CREATE_SHOPPING_LIST,
  payload: { id, createdAt, title, items, archived },
})

const addItem = ({ listId, id, name, checked }) => ({
  type: ADD_ITEM,
  payload: { listId, id, name, checked },
})

const updateItem = ({ listId, id, name }) => ({
  type: UPDATE_ITEM,
  payload: { listId, id, name },
})

const toggleItem = ({ listId, id }) => ({
  type: TOGGLE_ITEM,
  payload: { listId, id },
})

const deleteItem = ({ listId, id }) => ({
  type: DELETE_ITEM,
  payload: { listId, id },
})

export default {
  createList,
  addItem,
  updateItem,
  toggleItem,
  deleteItem,
}
