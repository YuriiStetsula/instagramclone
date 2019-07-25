import * as UserActions from '../actions/user'

const initialState = {
  users: []
}

const onSearchUserSuccess = (state, action) => {
  return {
    ...state,
    users: action.response && action.response.data
  }
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UserActions.SEARCH_USER_SUCCESS:
      return onSearchUserSuccess(state, action)
    default:
      return state
  }
}

export default reducer
