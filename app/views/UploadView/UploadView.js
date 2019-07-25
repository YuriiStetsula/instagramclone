import React from 'react'
import  { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { NavigationEvents } from 'react-navigation';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dismissKeyboard from 'dismissKeyboard'

import * as PostActions from '../../actions/posts'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...PostActions }, dispatch)
}

const mapStateToProps = state => {
  const { request } = state
  return {
    fetching: request.addpost.fetching || request.uploadimage.fetching
  }
}


class UploadView extends React.Component {

  state = {
    description: '',
    uploaded: false,
    picture: null,
    uri: null
  }

  onWillFocus = () => {
    if(!this.state.uploaded){
      this.openLibrary()
    }
  }

  openLibrary = () => {
    const options = {
      noData: true,
      maxWidth: 1800,
      maxHeight: 1800,
      quality: 0.8,
      storageOptions: {
        skipBackup: true
      }
    }

    let uri = null

    ImagePicker.showImagePicker(options,
      response => {
        if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (!response.didCancel && !response.customButton) {
          if (Platform.OS === 'ios') {
            uri = response.uri.replace('file://', '')
          } else {
            uri = response.uri
          }

          this.setState({
            uploaded: true,
            picture: { uri: uri, isStatic: true },
            uri: uri
          })
        }
      }
    )

  }

  onChangeText = text => {
    this.setState({ description: text })
  }

  post = () => {
    const { uploaded, uri, description } = this.state
    if (uploaded) {
      dismissKeyboard()
      this.props.uploadImage(uri)
      .then(data => {
        if (data && !data.error && data.response.photoURL) {
          this.props.addPost({postPhoto: data.response.photoURL, postDescription: description})
          .then(response => {
            if (response && !response.error) {
              alert('Success')
            } else {
              alert('Something bad happened :(')
            } 
          })
          .finally(this.clean)
        }
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      this.openLibrary()
    }
  }

  cancel = () => {
    this.clean()
  }

  clean = () => {
    this.setState({
      description: '',
      uploaded: false,
      picture: null,
      uri: null
    })
  }

  render () {
    const { picture, uploaded } = this.state
    const { url, fetching } = this.props
    const disabled = fetching || !uploaded
    return <View style={[styles.container, styles.center]}>
        <NavigationEvents onWillFocus={this.onWillFocus}/>
        { 
          uploaded
            ? <Image source={picture} style={styles.picture} />
            : url
              ? <Image source={{ uri: url } } style={styles.picture} />
              : null
        }
        <TextInput
        	style={styles.border}
        	value={this.state.description}
        	onChangeText={this.onChangeText}
        	placeholder='Description'
        />
        <TouchableOpacity disabled={fetching} style={[styles.button, { opacity: fetching ? .5 : 1 }]} onPress={this.post}>
      		<Text>Post</Text>
      	</TouchableOpacity>
        <TouchableOpacity disabled={disabled} style={[styles.button, { opacity: disabled ? .5 : 1 }]} onPress={this.cancel}>
      		<Text>Cancel</Text>
      	</TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  border: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  picture: {
    height: 250,
    width: '100%',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  }
})

const ConnectedUploadView = connect(mapStateToProps, mapDispatchToProps)(UploadView)
export default ConnectedUploadView
