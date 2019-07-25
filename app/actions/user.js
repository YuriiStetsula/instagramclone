
const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST'
const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS'
const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE'

const getUserProfile = uid => {
  return {
    API: {
      types: [ USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE ],
      endpoint: 'user/profile',
      authenticated: true,
      options: {
        body: {
          uid: uid
        }
      }
    }
  }
}

const GET_USER_REQUEST = 'GET_USER_REQUEST'
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const GET_USER_FAILURE = 'GET_USER_FAILURE'

const getUser = uid => {
  return {
    API: {
      types: [ GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE ],
      endpoint: 'user/profile',
      authenticated: true,
      options: {
        body: {
          uid: uid
        }
      }
    }
  }
}

const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST'
const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS'
const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE'

const searchUser = queryUserName => {
  return {
    API: {
      types: [ SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE ],
      endpoint: 'user/search',
      authenticated: true,
      options: {
        body: {
          queryUserName
        }
      }
    }
  }
}

const USER_FOLLOW_REQUEST = 'USER_FOLLOW_REQUEST'
const USER_FOLLOW_SUCCESS = 'USER_FOLLOW_SUCCESS'
const USER_FOLLOW_FAILURE = 'USER_FOLLOW_FAILURE'

const followUser = (user, profile) => {
  return {
    API: {
      types: [ USER_FOLLOW_REQUEST, USER_FOLLOW_SUCCESS, USER_FOLLOW_FAILURE ],
      endpoint: 'user/follow',
      authenticated: true,
      options: {
        body: {
          followerUid: profile.uid,
          followingUid: user.uid,
          followerPhoto: profile.photo,
          followerUserName: profile.userName,
          followingPhoto: user.photo,
          followingUserName: user.userName
        }
      }
    }
  }
}

const USER_UNFOLLOW_REQUEST = 'USER_UNFOLLOW_REQUEST'
const USER_UNFOLLOW_SUCCESS = 'USER_UNFOLLOW_SUCCESS'
const USER_UNFOLLOW_FAILURE = 'USER_UNFOLLOW_FAILURE'

const unfollowUser = (user, profile) => {
  return {
    API: {
      types: [ USER_UNFOLLOW_REQUEST, USER_UNFOLLOW_SUCCESS, USER_UNFOLLOW_FAILURE ],
      endpoint: 'user/unfollow',
      authenticated: true,
      options: {
        body: {
          followerUid: profile.uid,
          followingUid: user.uid,
          followerPhoto: profile.photo,
          followerUserName: profile.userName,
          followingPhoto: user.photo,
          followingUserName: user.userName
        }
      }
    }
  }
}

export {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAILURE,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAILURE,
  searchUser,
  getUserProfile,
  getUser,
  followUser,
  unfollowUser
}
