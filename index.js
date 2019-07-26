/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { Root } from './app/containers'
import firebase from 'firebase'
import config from './app/config.js'
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

const firebaseConfig = {
  apiKey: config.firebase.apiKey
}

firebase.initializeApp(firebaseConfig)

class App extends React.Component {
  render () {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Root store={store} />
      </PersistGate>
    )
  }
}

AppRegistry.registerComponent(appName, () => App)
