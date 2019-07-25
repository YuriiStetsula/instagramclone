import { createStackNavigator } from 'react-navigation'
import { ProfileView } from '../../views'

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileView,
      navigationOptions: {
        title: 'Profile'
      }
    }
  }
)

export default ProfileNavigator
