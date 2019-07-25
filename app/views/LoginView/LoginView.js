import React from 'react'
import  { Text, View, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AuthActions from '../../actions/auth'
import * as RequestActions from '../../actions/request'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...AuthActions, ...RequestActions }, dispatch)
}

function mapStateToProps (state) {
  return {
    request: state.request.firebasesignin,
    token: state.user.token
  }
}

class LoginView extends React.Component {


  state = {
    email: '',
    password: ''
  }

  onLoginPress = () => {
    const { email, password } = this.state
    const { signIn, resetRequest } = this.props
    signIn({ email, password })
    .then(() => { resetRequest('firebasesignin') })
  }

  onSignupPress = () => {
    console.log('onlogin pressed')
  }

  onEmailChange = value => {
    this.setState({email: value})
  }

  onPasswordChange = value => {
    this.setState({password: value})
  }

  render () {
    const { request } = this.props
    const { email, password } = this.state
    const disabled = request.fetching || !email || !password

    return <View style={styles.container}> 
      <TextInput
        value={this.state.email}
        style={styles.border}
        onChangeText={this.onEmailChange}
        placeholder='email'
      />
      <TextInput
        style={styles.border}
        value={this.state.password}
        onChangeText={this.onPasswordChange}
        placeholder='password'
        secureTextEntry
      />
      <Button
        disabled={disabled}
        title='Login'
        onPress={this.onLoginPress}
      />
      <Text>OR</Text>
      <TouchableOpacity disabled={request.fetching} onPress={this.onSignupPress}>
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  border: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  }
})

const ConnectedLoginView = connect(mapStateToProps, mapDispatchToProps)(LoginView)
export { ConnectedLoginView as LoginView }
export default ConnectedLoginView