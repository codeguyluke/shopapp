import { types } from './shopping-lists.actions'

export const STORE_NAME = 'shoppingLists'

export const initialState = {}
export default function shoppingListsReducer(state = initialState, action = { type: '' }) {
  console.log('reducer', state, action)
  switch (action.type) {
    case types.CREATE_SHOPPING_LIST:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    default:
      return state
  }
}
