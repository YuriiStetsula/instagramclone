import { createStackNavigator } from 'react-navigation'
import { ProfileView } from '../../views'

const ProfileNavigator = createStackNavigator(
  {
    MyProfile: {
      screen: ProfileView,
      navigationOptions: {
        title: 'Profile'
      }
    }
  }
)

export default ProfileNavigator
