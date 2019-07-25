import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { SignupView } from '../../views'

// import * as UserActions from '../../actions/user'

// function mapDispatchToProps (dispatch) {
//   return bindActionCreators({ ...UserActions }, dispatch)
// }

// function mapStateToProps (state) {
//   return {
//     token: state.user.token
//   }
// }

class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <SignupView />
      </Provider>
    )
  }
}

export default Root

// const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root)

// export default ConnectedRoot
