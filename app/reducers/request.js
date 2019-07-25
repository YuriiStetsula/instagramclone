
const ActionTypeToReducerMap = {
  USER_PROFILE: 'profile',
  FIREBASE_SIGNIN: 'firebasesignin',
  AUTH_SIGNUP: 'signup',
  POST_IMAGE_UPLOAD: 'uploadimage',
  POST_ADD: 'addpost'
}

const initialState = {
  // 'xxxx': {
  //   fetching: false,
  //   fetched: false,
  //   error: null
  // }
}

Object.keys(ActionTypeToReducerMap).forEach(key => {
  const prop = ActionTypeToReducerMap[key]
  initialState[prop] = {
    fetching: false,
    fetched: false,
    error: null
  }
})

const reducer = (state = initialState, action = {}) => {
  const { type } = action

  if (type === 'REQUEST_RESET') {
    return {
      ...state,
      [ action.name ]: {
        fetching: false,
        fetched: false,
        error: null
      }
    }
  }

  if (type.length < 9) {
    return state
  }

  const name = type.substr(0, type.length - 8)
  const ext = type.substr(type.length - 7)
  const reducer = ActionTypeToReducerMap[name]

  if (!reducer) {
    return state
  }

  if (ext === 'REQUEST') {
    return {
      ...state,
      [ reducer ]: {
        ...state[reducer],
        fetching: true,
        fetched: false,
        error: null
      }
    }
  }

  if (ext === 'SUCCESS') {
    return {
      ...state,
      [ reducer ]: {
        ...state[reducer],
        fetching: false,
        fetched: true,
        error: null
      }
    }
  }

  if (ext === 'FAILURE') {
    return {
      ...state,
      [ reducer ]: {
        ...state[reducer],
        fetching: false,
        fetched: true,
        error: action.error
      }
    }
  }

  return state
}

export default reducer
