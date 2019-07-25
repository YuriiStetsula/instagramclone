import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { TouchableOpacity } from 'react-native'
import { SearchView, ProfileView } from '../../views'
import { Icon } from '../../components'

const SearchNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchView,
      navigationOptions: {
        header: null
      }
    },
    User: {
      screen: ProfileView,
      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icon style={{ marginLeft: 10 }} name={'ios-arrow-back'} size={30} />
          </TouchableOpacity>
        )
      })
    }
  }
)

export default SearchNavigator
