import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PostsActions from '../../actions/posts'

const mapStateToProps = state => {
  return {
    followingPosts: state.posts.followingPosts,
    user: state.user.profile
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...PostsActions }, dispatch)
}

class HomeView extends React.Component {
  render () {
    return null
  }
}

const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(HomeView)

export default ConnectedHomeView