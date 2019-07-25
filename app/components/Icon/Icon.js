import React from 'react'
import { StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const defaultIconSet = Ionicons

class Icon extends React.PureComponent {

  render () {

    const { style, name, type, iconSetName, ...rest } = this.props

    let IconSet = null
    console.log('render')

    switch (iconSetName) {
      case 'Ionicons':
        IconSet = Ionicons
        break
      case 'MaterialIcons':
        IconSet = MaterialIcons
        break
      case 'MaterialCommunityIcons':
        IconSet = MaterialCommunityIcons
        break
      case 'Feather':
        IconSet = Feather
        break
      case 'SimpleLineIcons':
        IconSet = SimpleLineIcons
        break
      default:
        IconSet = defaultIconSet
    }

    return (
      <IconSet style={ [ styles.icon, style ] } name={ name } { ...rest } />
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent'
  }
})

export default Icon
