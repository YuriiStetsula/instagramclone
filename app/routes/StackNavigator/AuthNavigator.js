import { createStackNavigator, createAppContainer } from 'react-navigation'
import { LoginView, SignupView } from '../../views'

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    Signup: {
      screen: SignupView,
      navigationOptions: {
        header: null
      }
    }
  }
)

export default createAppContainer(AuthNavigator)
