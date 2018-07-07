import React from 'react'
import { Provider } from 'react-redux'

import AppNavigator from './app/app-navigator'
import store from './app/state'

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
