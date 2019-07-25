import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { UploadView, ActivityView, HomeView, SearchView, ProfileView } from '../../views'
import { Icon } from '../../components'

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
    screen: SearchView,
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
    screen: ProfileView,
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
