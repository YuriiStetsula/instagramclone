import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, TextInput, FlatList, Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { addComment, getComments, getFollowingPosts } from '../../actions/posts';
import moment from 'moment'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addComment, getComments, getFollowingPosts }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user.profile,
    followingPosts: state.posts.followingPosts,
    post: state.posts.post
  }
}


class Comment extends React.Component {
  state = {
  	comment: ''
  }

  postComment = () => {
    const { user, post } = this.props
    const { userName, photo } = user
    this.props.addComment({ postId: post.id, text: this.state.comment, userName, photo })
      .then(res => {
        if (res && !res.error) {
          this.props.getFollowingPosts()
        }
      })
      .catch(err => {
        console.log(err)
      })
  	this.setState({comment: ''})
  }

  onChangeText = comment => {
    this.setState({ comment })
  }

  render() {
    const { comments } = this.props.post
    return (
      <View style={styles.container}>
        {
          comments 
            ? <FlatList
            inverted
            keyExtractor={(item) => JSON.stringify(item.date)}
            data={comments.reverse()}
            renderItem={({item}) => (
              <View style={[styles.row, styles.space]}>
                <Image style={styles.roundImage} source={{uri: item.commenterPhoto}}/>
                <View style={[styles.container, styles.left]}>
                  <Text style={styles.bold}>{item.commenterName}</Text>
                  <Text style={styles.gray}>{item.comment}</Text>
                  <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                </View>
              </View>
            )}/>
            : null
        }
  	      <TextInput
  	        style={styles.input}
  	        onChangeText={this.onChangeText}
  	        value={this.state.comment}
  	        returnKeyType='send'
            placeholder='Add Comment'
            onSubmitEditing={this.postComment}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row'
  },
  roundImage: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad'
  },
  left: {
    alignItems: 'flex-start',
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
  input: {
    width: '90%',
    margin: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Comment)