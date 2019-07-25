import React from 'react'
import  { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as PostsActions from '../../actions/posts'
import { Icon } from '../../components';

const  { width } = Dimensions.get('window');

function mapStateToProps (state) {
  return {
    followingPosts: state.posts.followingPosts,
    user: state.user.profile
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...PostsActions }, dispatch)
}

class HomeView extends React.Component {
  
  componentDidMount () {
    this.getPosts()
  }

  getPosts = () => {
    this.props.getFollowingPosts()
  }

  likePost = post => {
    const { user, likePost, unlikePost } = this.props
    if(post.likes.includes(user.uid)){
      unlikePost(post.id)
      .then(this.getPosts)
    } else {
      likePost(post.id)
      .then(this.getPosts)
    }
  }

  onCommetPress = postId => {
    this.props.setPost(postId)
    this.props.navigation.navigate('Comment')
  }

  renderItem = ({item}) => {
    const liked = item.likes.includes(this.props.user.uid)
    return (
      <View style={styles.postContainer}>
        <View style={[styles.row, styles.space]}>
          <View style={[styles.row, styles.center]}>
            <Image style={styles.roundImage} source={{uri: item.photo}}/>
            <View>
              <Text style={styles.bold}>{item.userName}</Text>
              <Text style={[styles.gray, styles.small]}>{moment(item.date).format('lll')}</Text>
            </View>
          </View>
        </View>
       
          <Image style={styles.postPhoto} source={{uri: item.postPhoto}}/>
        <View style={[styles.row, styles.marginLeft]}>
        <TouchableOpacity onPress={() => this.likePost(item)} >
          <Icon style={{margin: 5}} color={liked ? '#db565b' : '#000'} name={ liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
        </TouchableOpacity>
        
          <TouchableOpacity onPress={() => this.onCommetPress(item.id)} >
            <Icon style={{margin: 5}} name='ios-chatbubbles' size={25} />
          </TouchableOpacity>
          <Icon iconSetName='Feather' style={{margin: 5}} name='send' size={25} />
        </View>
        <Text style={styles.marginLeft}>{item.postDescription}</Text>
      </View>
    )
  }

  render() {
    const { followingPosts } = this.props
    if (!followingPosts) {
      return null
    }
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this.getPosts}
          refreshing={false}
          data={followingPosts}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  postContainer: {
    paddingVertical: 10
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
  gray: {
    color: '#adadad',
  },
  small: {
    fontSize: 10,
  },
  postPhoto: {
    height: 250,
    width: width,
  },
  roundImage: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad'
  },
  marginLeft: {
    marginLeft: 10
  }
})


const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(HomeView)

export default ConnectedHomeView
