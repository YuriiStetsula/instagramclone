import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppNavigator } from '../../routes'
import NavigationService from '../../navigation'

import * as UserActions from '../../actions/user'
import { Storage } from '../../storage';

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

    Storage.get('token')
      .then(storedToken => {
        if (token || storedToken) {
          Promise.resolve()
            .then(() => { NavigationService.navigate('Home') })
            .then(() => { getUserProfile() })
        } else {
          NavigationService.navigate('Auth')
        }
      })
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
