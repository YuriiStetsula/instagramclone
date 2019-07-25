import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../actions/auth'
import * as RequestActions from '../../actions/request'
import * as UserActions from '../../actions/user'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...AuthActions, ...RequestActions, ...UserActions }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

class ProfileView extends React.Component {

  render () {
    return null
  }
}

const ConnectedProfileView = connect(mapStateToProps, mapDispatchToProps)(ProfileView)

export default ConnectedProfileView
