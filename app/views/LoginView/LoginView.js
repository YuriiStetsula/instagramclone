import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AuthActions from '../../actions/auth'
import * as RequestActions from '../../actions/request'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...AuthActions, ...RequestActions }, dispatch)
}

const mapStateToProps = state => {
  return {
    request: state.request.firebasesignin,
    token: state.user.token
  }
}

class LoginView extends React.Component {

  render () {
    return null
  }
}

const ConnectedLoginView = connect(mapStateToProps, mapDispatchToProps)(LoginView)
export { ConnectedLoginView as LoginView }
export default ConnectedLoginView
