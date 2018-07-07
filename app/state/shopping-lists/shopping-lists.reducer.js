import { Map } from 'immutable'
import { types } from './shopping-lists.actions'

export const STORE_NAME = 'shoppingLists'

export const initialState = Map({})
export default function shoppingListsReducer(state = initialState, action = { type: '' }) {
  switch (action.type) {
    case types.CREATE_SHOPPING_LIST:
      return state.set(action.payload.id, Map({}))
    default:
      return state
  }
}
