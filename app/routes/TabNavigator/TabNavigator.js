import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { UploadView, ActivityView, HomeView } from '../../views'
import { Icon } from '../../components'
import SearchNavigator from '../StackNavigator/SearchNavigator'
import ProfileNavigator from '../StackNavigator/ProfileNavigator'

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon name={ focused ? 'home' : 'home-outline'} iconSetName={'MaterialCommunityIcons'} size={32} />
      )
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon name={ focused ? 'md-search' : 'ios-search'} size={32} />
      )
    }
  },
  Upload: {
    screen: UploadView,
    navigationOptions: {
      tabBarIcon: () => <Icon name='ios-add-circle-outline' size={32} />
    }
  },
  Activity: {
    screen: ActivityView,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon name={ focused ? 'ios-heart' : 'ios-heart-empty' } size={32} />
      )
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => ( 
        <Icon name={ focused ? 'person' : 'person-outline'} iconSetName={'MaterialIcons'} size={32} /> 
      )
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    keyboardHidesTabBar: true
  }
})

export default TabNavigator
