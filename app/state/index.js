import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import shoppingListsState from './shopping-lists'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}
const rootReducer = combineReducers({
  [shoppingListsState.STORE_NAME]: shoppingListsState.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export default { store, persistor }
