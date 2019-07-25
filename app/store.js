import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

import api from './middlewares/api'

const initialState = {}
const middlewares = [ thunk, api ]

const store = applyMiddleware(...middlewares)(createStore)(rootReducer, initialState)
export default store
