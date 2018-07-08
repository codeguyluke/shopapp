import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigator from './app/app-navigator'
import state from './app/state'

export default function App() {
  return (
    <Provider store={state.store}>
      <PersistGate loading={null} persistor={state.persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  )
}
