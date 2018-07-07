import { createStore, combineReducers } from 'redux'
import shoppingListsState from './shopping-lists'

const rootReducer = combineReducers({
  [shoppingListsState.STORE_NAME]: shoppingListsState.reducer,
})

export default createStore(rootReducer)
