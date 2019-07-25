import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import TabNavigator from '../TabNavigator/TabNavigator'
import AuthNavigator from '../StackNavigator/AuthNavigator'

const AppNavigator = createSwitchNavigator(
  {
    Home: TabNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'Auth'
  }
)

export default createAppContainer(AppNavigator)
