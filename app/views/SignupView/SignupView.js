import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
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

  state = {
    email: '',
    password: '',
    userName: ''
  }

  onSignupPress = () => {
    const { email, userName, password } = this.state
    const { signUp, resetRequest } = this.props
    signUp({ email, userName, password })
      .then(() => { resetRequest('signup') })
      .then(() => { resetRequest('firebasesignin') })
  }

  onEmailChange = value => {
    this.setState({ email: value })
  }

  onUserNameChange = value => {
    this.setState({ userName: value })
  }

  onPasswordChange = value => {
    this.setState({ password: value })
  }

  onLoginPress = () => {
    console.log('onsignup pressed')
  }

  render () {
    const { request } = this.props
    const { email, password, userName } = this.state
    const disabled = request.fetching || !email || !password || !userName
    return <View style={styles.container}>
      <TextInput
        style={styles.border}
        value={email}
        onChangeText={this.onEmailChange}
        placeholder='email'
      />
      <TextInput
        style={styles.border}
        value={userName}
        onChangeText={this.onUserNameChange}
        placeholder='username'
      />
      <TextInput
        style={styles.border}
        value={password}
        onChangeText={this.onPasswordChange}
        placeholder='password'
        secureTextEntry
      />
      <Button
        title='Signup'
        disabled={disabled}
        onPress={this.onSignupPress}
      />
      <Text>OR</Text>
      <TouchableOpacity disabled={request.fetching} onPress={this.onLoginPress}>
        <Text>Login</Text>
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



const ConnectedSignupView = connect(mapStateToProps, mapDispatchToProps)(SignupView)
export { ConnectedSignupView as SignupView }
export default ConnectedSignupView
