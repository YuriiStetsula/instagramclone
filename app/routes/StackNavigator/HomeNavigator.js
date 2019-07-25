import React from 'react';
import { TouchableOpacity, Image } from 'react-native'

import { createStackNavigator } from 'react-navigation'

import { HomeView, CommentView } from '../../views'
import { Icon } from '../../components'

const withoutTabBar = ['Comment']

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeView,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={{ width: 120, height: 35 }} source={require('../../assets/logo.jpg')} />,
        headerLeft: (
          <TouchableOpacity onPress={() => {}} >
            <Icon iconSetName='MaterialCommunityIcons' style={{ marginLeft: 10 }} name='camera-outline' size={30} />
          </TouchableOpacity>
        ),
        headerRight: (
          <Icon iconSetName='Feather' style={{ marginRight: 10 }} name='send' size={30} />
        )
      })
    },
    Comment: {
      screen: CommentView,
      navigationOptions: ({ navigation }) => ({
        title: 'Comments',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icon style={{ marginLeft: 10 }} name={'ios-arrow-back'} size={30} />
          </TouchableOpacity>
        )
      })
    }
  }
)

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true

  withoutTabBar.forEach(routeName => {
    tabBarVisible = !(navigation.state.routes.some(route => route.routeName === routeName))
  })

  return {
    tabBarVisible
  }
}

export default HomeNavigator
