import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addComment, getComments, getFollowingPosts } from '../../actions/posts'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addComment, getComments, getFollowingPosts }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user.profile,
    followingPosts: state.posts.followingPosts,
    post: state.posts.post
  }
}

class CommentView extends React.Component {

  render () {
    return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentView)
