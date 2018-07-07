import { createStore } from 'redux'
import { combineReducers } from 'redux-immutable'
import shoppingListsState from './shopping-lists'

const rootReducer = combineReducers({
  [shoppingListsState.STORE_NAME]: shoppingListsState.reducer,
})

export default createStore(rootReducer)
