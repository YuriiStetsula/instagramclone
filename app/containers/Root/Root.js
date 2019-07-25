import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppNavigator } from '../../routes'
import NavigationService from '../../navigation'

import * as UserActions from '../../actions/user'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...UserActions }, dispatch)
}

function mapStateToProps (state) {
  return {
    token: state.user.token
  }
}

class Root extends Component {

  componentDidMount () {
    const { token, getUserProfile } = this.props
    if (token) {
      Promise.resolve()
        .then(() => { NavigationService.navigate('Home') })
        .then(() => { getUserProfile() })
    } else {
      NavigationService.navigate('Auth')
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.token !== this.props.token && !this.props.token) {
      NavigationService.navigate('Auth')
    } else if (!prevProps.token !== this.props.token && this.props.token) {
      NavigationService.navigate('Home')
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <AppNavigator ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
      </Provider>
    )
  }
}

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root)

export default ConnectedRoot
