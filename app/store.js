
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

import api from './middlewares/api'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {}
const middlewares = [ thunk, api ]

const store = applyMiddleware(...middlewares)(createStore)(persistedReducer, initialState)
const persistor = persistStore(store)

export { persistor, store }
