import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../actions/auth'
import * as RequestActions from '../../actions/request'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...AuthActions, ...RequestActions }, dispatch)
}

function mapStateToProps (state) {
  return {
    request: state.request.signup
  }
}

class SignupView extends React.Component {

  render () {
    return null
  }
}

const ConnectedSignupView = connect(mapStateToProps, mapDispatchToProps)(SignupView)
export default ConnectedSignupView
