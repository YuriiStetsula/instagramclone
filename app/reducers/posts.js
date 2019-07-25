import * as PostsActions from '../actions/posts'

const initialState = {
  followingPosts: null,
  active: null,
  post: {}
}

const onFollowingPostsSuccess = (state, action) => {

  const { active, post } = state
  const followingPosts = action.response

  let activePost = post

  if (active) {
    activePost = followingPosts && followingPosts.find(post => post.id === active)
  }

  return {
    ...state,
    followingPosts,
    post: activePost
  }
}

const onPostSet = (state, action) => {
  const { postId } = action
  const { followingPosts } = state
  const activePost = followingPosts && followingPosts.find(post => post.id === postId)

  return {
    ...state,
    post: activePost,
    active: postId
  }
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case PostsActions.FOLLOWING_POSTS_SUCCESS:
      return onFollowingPostsSuccess(state, action)
    case PostsActions.POST_SET:
      return onPostSet(state, action)
    default:
      return state
  }
}

export default reducer
