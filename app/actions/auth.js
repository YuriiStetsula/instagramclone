import firebase from 'firebase'
import * as UserActions from './user'
import config from '../config'
import { Storage } from '../storage';

const FIREBASE_SIGNIN_REQUEST = 'FIREBASE_SIGNIN_REQUEST'
const FIREBASE_SIGNIN_FAILURE = 'FIREBASE_SIGNIN_FAILURE'
const FIREBASE_SIGNIN_SUCCESS = 'FIREBASE_SIGNIN_SUCCESS'

const signIn = ({ email, password }) => {
  return (dispatch, getState) => {
    dispatch({ type: FIREBASE_SIGNIN_REQUEST })
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        return res.user
      })
      .then(user => {
        if (user && user.uid) {
          return firebase.auth().currentUser.getIdToken()
        }
        throw new Error('user not found')
      })
      .then(token => {
        Storage.set('token', token)
        return Promise.resolve(dispatch({ type: FIREBASE_SIGNIN_SUCCESS, token }))
          .then(dispatch(UserActions.getUserProfile()))
      })
      .catch(error => {
        if (config.logs.firebase) {
          console.log(error)
        }
        dispatch({ type: FIREBASE_SIGNIN_FAILURE, error })
      })
  }
}

const AUTH_SIGNUP_REQUEST = 'AUTH_SIGNUP_REQUEST'
const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'
const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE'

const signUpAction = ({ email, userName, password }) => {
  return {
    API: {
      types: [AUTH_SIGNUP_REQUEST, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_FAILURE],
      endpoint: 'user/add',
      options: {
        method: 'post',
        body: {
          email,
          userName,
          password
        }
      }
    }
  }
}

const signUp = (props) => {
  return dispatch => {
    return dispatch(signUpAction(props))
      .then(response => {
        if (response && !response.error) {
          return dispatch(signIn(props))
        }
      })
  }
}

const APP_LOGOUT = 'APP_LOGOUT'

const logout = () => {
  return {
    type: APP_LOGOUT
  }
}

export {
  FIREBASE_SIGNIN_REQUEST,
  FIREBASE_SIGNIN_SUCCESS,
  FIREBASE_SIGNIN_FAILURE,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  APP_LOGOUT,
  signUp,
  signIn,
  logout
}
