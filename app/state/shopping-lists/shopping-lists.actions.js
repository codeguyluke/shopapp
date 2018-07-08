/**
 * Types definitions
 */

const CREATE_LIST = 'CREATE_LIST'
const TOGGLE_ARCHIVE = 'TOGGLE_ARCHIVE'
const RENAME_LIST = 'RENAME_LIST'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const TOGGLE_ITEM = 'TOGGLE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

export const types = {
  CREATE_LIST,
  TOGGLE_ARCHIVE,
  RENAME_LIST,
  ADD_ITEM,
  UPDATE_ITEM,
  TOGGLE_ITEM,
  DELETE_ITEM,
}

/**
 * Actions
 */

const createList = ({ id, createdAt, title, items, archived }) => ({
  type: CREATE_LIST,
  payload: { id, createdAt, title, items, archived },
})

const toggleArchive = ({ id }) => ({
  type: TOGGLE_ARCHIVE,
  payload: { id },
})

const renameList = ({ id, title }) => ({
  type: RENAME_LIST,
  payload: { id, title },
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
  toggleArchive,
  renameList,
  addItem,
  updateItem,
  toggleItem,
  deleteItem,
}
