import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PostActions from '../../actions/posts'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...PostActions }, dispatch)
}

const mapStateToProps = state => {
  const { request } = state
  return {
    fetching: request.addpost.fetching || request.uploadimage.fetching
  }
}

class UploadView extends React.Component {

  render () {
    return null
  }
}

const ConnectedUploadView = connect(mapStateToProps, mapDispatchToProps)(UploadView)
export default ConnectedUploadView
