import { getUserProfile } from './user'

const FOLLOWING_POSTS_REQUEST = 'FOLLOWING_POSTS_REQUEST'
const FOLLOWING_POSTS_SUCCESS = 'FOLLOWING_POSTS_SUCCESS'
const FOLLOWING_POSTS_FAILURE = 'FOLLOWING_POSTS_FAILURE'

const getFollowingPosts = () => {
  return {
    API: {
      types: [ FOLLOWING_POSTS_REQUEST, FOLLOWING_POSTS_SUCCESS, FOLLOWING_POSTS_FAILURE ],
      endpoint: 'posts',
      authenticated: true
    }
  }
}

const POST_LIKE_REQUEST = 'POST_LIKE_REQUEST'
const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS'
const POST_LIKE_FAILURE = 'POST_LIKE_FAILURE'

const likePost = postId => {
  return {
    API: {
      types: [ POST_LIKE_REQUEST, POST_LIKE_SUCCESS, POST_LIKE_FAILURE ],
      endpoint: 'posts/like',
      authenticated: true,
      options: {
        body: {
          postId
        }
      }
    }
  }
}

const POST_UNLIKE_REQUEST = 'POST_UNLIKE_REQUEST'
const POST_UNLIKE_SUCCESS = 'POST_UNLIKE_SUCCESS'
const POST_UNLIKE_FAILURE = 'POST_UNLIKE_FAILURE'

const unlikePost = postId => {
  return {
    API: {
      types: [ POST_UNLIKE_REQUEST, POST_UNLIKE_SUCCESS, POST_UNLIKE_FAILURE ],
      endpoint: 'posts/unlike',
      authenticated: true,
      options: {
        body: {
          postId
        }
      }
    }
  }
}

const POST_ADD_COMMENT_REQUEST = 'POST_ADD_COMMENT_REQUEST'
const POST_ADD_COMMENT_SUCCESS = 'POST_ADD_COMMENT_SUCCESS'
const POST_ADD_COMMENT_FAILURE = 'POST_ADD_COMMENT_FAILURE'

const addComment = ({ text, photo, userName, postId }) => {
  return {
    API: {
      types: [ POST_ADD_COMMENT_REQUEST, POST_ADD_COMMENT_SUCCESS, POST_ADD_COMMENT_FAILURE ],
      endpoint: 'posts/comment',
      authenticated: true,
      options: {
        method: 'post',
        body: {
          text,
          photo,
          userName,
          postId
        }
      }
    }
  }
}

const POST_SET = 'POST_SET'

const setPost = postId => {
  return {
    type: POST_SET,
    postId
  }
}

const POST_IMAGE_UPLOAD_REQUEST = 'POST_IMAGE_UPLOAD_REQUEST'
const POST_IMAGE_UPLOAD_SUCCESS = 'POST_IMAGE_UPLOAD_SUCCESS'
const POST_IMAGE_UPLOAD_FAILURE = 'POST_IMAGE_UPLOAD_FAILURE'

const uploadImageAction = body => {
  return {
    API: {
      types: [ POST_IMAGE_UPLOAD_REQUEST, POST_IMAGE_UPLOAD_SUCCESS, POST_IMAGE_UPLOAD_FAILURE ],
      endpoint: 'upload/image',
      authenticated: true,
      options: {
        method: 'post',
        headers: {
          'Accept': 'multipart/related;type=application/octet-stream',
          'Content-Type': 'multipart/form-data'
        },
        body
      }
    }
  }
}

function uploadImage (uri) {
  return (dispatch, getState) => {
    const body = new FormData()

    body.append('image', {
      uri: uri,
      name: 'image.jpg',
      type: 'image/jpg'
    })

    return dispatch(uploadImageAction(body))
  }
}

const POST_ADD_REQUEST = 'POST_ADD_REQUEST'
const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS'
const POST_ADD_FAILURE = 'POST_ADD_FAILURE'

const addPostAction = ({ userName, photo, postPhoto, postDescription }) => {
  return {
    API: {
      types: [ POST_ADD_REQUEST, POST_ADD_SUCCESS, POST_ADD_FAILURE ],
      endpoint: 'posts/add',
      authenticated: true,
      options: {
        method: 'post',
        body: {
          userName, 
          photo, 
          postPhoto, 
          postDescription
        }
      }
    }
  }
}

const addPost = (props) => {
  return (dispatch, getState) => {
    const { profile } = getState().user
    return dispatch(addPostAction({ ...props, photo: profile.photo, userName: profile.userName }))
      .then(() => dispatch(getUserProfile()))
  }
}

export {
  FOLLOWING_POSTS_FAILURE,
  FOLLOWING_POSTS_REQUEST,
  FOLLOWING_POSTS_SUCCESS,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAILURE,
  POST_ADD_COMMENT_REQUEST,
  POST_ADD_COMMENT_SUCCESS,
  POST_ADD_COMMENT_FAILURE,
  POST_SET,
  getFollowingPosts,
  likePost,
  unlikePost,
  addComment,
  setPost,
  uploadImage,
  addPost
}
