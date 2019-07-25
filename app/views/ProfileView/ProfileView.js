import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, TouchableWithoutFeedback, Animated, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { NavigationEvents } from 'react-navigation';
import * as AuthActions from '../../actions/auth'
import * as RequestActions from '../../actions/request'
import * as UserActions from '../../actions/user'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...AuthActions, ...RequestActions, ...UserActions }, dispatch)
}

function mapStateToProps (state) {
  return {
    profile: state.user.profile
  }
}

class ProfileView extends React.Component {

  state = {
    user: null,
    routName: 'Profile',
    // modal: false,
    // visible: new Animated.Value(0), 
    // modalPostPhoto: '',
    // backgroundColor: 'transparent'
  }

  onWillFocus = () => {
    const { state } = this.props.navigation
    
    let user = this.state.user


    if (state.routeName === 'User' && state.params && state.params.user){
      user = state.params.user
    
    } else if (!user) {
      user = this.props.profile
    }
    
    this.setState({ user })
  }


  onLogoutPress = () => {
    const { resetRequest, logout } = this.props
    resetRequest('firebasesignin')
    logout()
  }

  onFollowUser = user => {
    const { followers } = user
    if(followers && followers.find(item => item.followerUid === this.props.profile.uid)){
      this.props.unfollowUser(user, this.props.profile)
      .then(response => { this.fetchUsers(response, user) })

    } else {
      this.props.followUser(user, this.props.profile)
      .then(response => { this.fetchUsers(response, user) })
    }
  }

  fetchUsers = (response, user) => {
    if (response && !response.erorr) {
      this.props.getUserProfile()
      .then(() => {
        return this.props.getUser(user.uid)
      })
      .then(data => {
        if (data && data.response) {
          this.setState({ user: data.response })
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }


  // showModal = postPhoto => {
  //   this.setState({modal: true, modalPostPhoto: postPhoto, backgroundColor: 'rgba(0,0,0, 0.1)' }, () => {
  //     Animated.timing(this.state.visible, {
  //       toValue: 1,
  //       useNativeDriver: true,
  //       duration: 250,
  //     }).start();
  //   })
  // }

  // hideModal = () => { 
  //   if (!this.state.modal) {
  //     return
  //   }
  //   Animated.timing(this.state.visible, {
  //     toValue: 0,
  //     duration: 200,
  //     useNativeDriver: true
  //   }).start(() => {
  //     this.setState({modal: false, modalPostPhoto: '', backgroundColor: 'transparent'}) 
  //   })
  // }

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        // onLongPress={() => this.showModal(item.postPhoto)}
        // onPressOut={this.hideModal}
        >
        <Image style={styles.squareLarge} source={{uri: item.postPhoto}}/>
      </TouchableWithoutFeedback>
    ) 
  }

  render () {
    const { state, navigate } = this.props.navigation
    const { user } = this.state
    let userData = state.routeName === 'Profile' ? this.props.profile : user
  
    return (
      <View style={{backgroundColor:  this.state.backgroundColor, flex: 1}}>
          <NavigationEvents onWillFocus={this.onWillFocus} />
        {userData  
          ?  <>
          <ScrollView scrollEnabled={!this.state.modal} style={styles.container}>
            <View style={[styles.row, styles.space, {paddingHorizontal: 20}]}>
              <View style={styles.center}>
                <Image style={styles.roundImage} source={{ uri: userData.photo }}/>
                <Text>{userData.userName}</Text>
                <Text>{userData.bio}</Text>
              </View>
              <View style={styles.center}>
                <Text style={styles.bold}>{userData.posts && userData.posts.length || 0}</Text>
                <Text>posts</Text>
              </View>
              <View style={styles.center}>
                <Text style={styles.bold}>{userData.followers && userData.followers.length || 0}</Text>
                <Text>followers</Text>
              </View>
              <View style={styles.center}>
                <Text style={styles.bold}>{userData.following && userData.following.length || 0}</Text>
                <Text>following</Text>
              </View>
            </View>
            <View style={styles.center}>
                {
                  userData.uid === this.props.profile.uid
                  ? <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonSmall} onPress={() => {}}>
                      <Text style={styles.bold}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSmall} onPress={this.onLogoutPress}>
                      <Text style={styles.bold}>Logout</Text>
                    </TouchableOpacity>
                  </View> 
                  : <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonSmall} onPress={() => this.onFollowUser(userData)}>
                      <Text style={styles.bold}>{userData.followers && userData.followers.find(item => item.followerUid === this.props.profile.uid) ? 'Unfollow' : 'Follow'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSmall} onPress={() => {}}>
                      <Text style={styles.bold}>Message</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            
            <FlatList
              style={{paddingTop: 25}}
              horizontal={false}
              numColumns={3}
              data={userData.posts}
              keyExtractor={item => JSON.stringify(item.date)}
              renderItem={this.renderItem}/>
          </ScrollView>
          {/* {
            this.state.modalPostPhoto 
            ? <Animated.View style={[StyleSheet.absoluteFill, modalstyles.modal, 
                {
                  opacity: this.state.visible,
                  transform: [
                    {
                      translateY: this.state.visible.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                      }),
                    },
                  ],
                }
              ]}>
                <View style={modalstyles.modalContainer}>
                  <View style={modalstyles.header} />
                  <View style={modalstyles.body}>
                    <Image source={{ uri: this.state.modalPostPhoto }} style={modalstyles.image} resizeMode="cover" />          
                  </View>
                  <View style={modalstyles.footer} />
                </View>
            </Animated.View>
            : null          
          } */}
          </>
            : null
          }
      </View>
         
        
    )
  }
}


// const modalstyles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   modal: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalContainer: {
//     width: "90%",
//     height: "70%",
//     borderRadius: 8
//   },
//   header: {
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//     overflow: "hidden",
//     height: '10%',
//     padding: 10
//   },
//   body: {
//     height: '80%',
//     width: '100%',
//     backgroundColor: "#d3d3d3",
//   },
//   footer: {
//     backgroundColor: "#FFF",
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//     overflow: "hidden",
//     height: '10%',
//     padding: 10
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   bold: {
//     fontWeight: "bold",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonSmall: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 125
  },
  roundImage: {
    width: 80, 
    height: 80,
    borderRadius: 40,
    margin: 10,
    backgroundColor: '#adadad'
  },
  squareLarge: {
    width: '33%', 
    height: 125,
    margin: 1,
    backgroundColor: '#d3d3d3'
  },
})

const ConnectedProfileView = connect(mapStateToProps, mapDispatchToProps)(ProfileView)

export default ConnectedProfileView
