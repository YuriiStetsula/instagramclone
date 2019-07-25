import { combineReducers } from 'redux'
import request from './request'
import user from './user'
import posts from './posts'
import search from './search'

const reducers = {
  request,
  user,
  posts,
  search
}

export default combineReducers(reducers)
