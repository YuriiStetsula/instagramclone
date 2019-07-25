import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { AuthNavigator } from '../../routes'

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
        <AuthNavigator />
      </Provider>
    )
  }
}

export default Root

// const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root)

// export default ConnectedRoot
