import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { ProfileView } from '../../views'
import AuthNavigator from '../StackNavigator/AuthNavigator'

const AppNavigator = createSwitchNavigator(
  {
    Home: ProfileView,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'Auth'
  }
)

export default createAppContainer(AppNavigator)
