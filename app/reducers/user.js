import * as AuthActions from '../actions/auth'
import * as UserActions from '../actions/user'

const initialState = {
  token: null,
  profile: {}
}

const onFirebaseSigninSuccess = (state, action) => {
  console.log(action)
  return {
    ...state,
    token: action.token
  }
}

const onSigninFailure = (state, action) => {
  return state
}

const onUserProfileSuccess = (state, action) => {
  console.log(action)
  const { response } = action
  const { email, followers, following, photo, posts, uid, userName } = response
  return {
    ...state,
    profile: {
      email,
      followers,
      following,
      photo,
      posts,
      uid,
      userName
    }
  }
}

const onAppLogout = (state, action) => {
  return {
    ...state,
    token: null
  }
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthActions.FIREBASE_SIGNIN_SUCCESS:
      return onFirebaseSigninSuccess(state, action)
    case AuthActions.FIREBASE_SIGNIN_FAILURE:
      return onSigninFailure(state, action)
    case UserActions.USER_PROFILE_SUCCESS:
      return onUserProfileSuccess(state, action)
    case AuthActions.APP_LOGOUT:
      return onAppLogout(state, action)
    default:
      return state
  }
}

export default reducer
