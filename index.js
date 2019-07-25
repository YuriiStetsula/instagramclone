/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json'
import { Root } from './app/containers'
import firebase from 'firebase'
import config from './app/config.js'
import store from './app/store'

const firebaseConfig = {
  apiKey: config.firebase.apiKey
}

firebase.initializeApp(firebaseConfig)

class App extends React.Component {
  render () {
    return (
      <Root store={store} />
    )
  }
}

AppRegistry.registerComponent(appName, () => App)
