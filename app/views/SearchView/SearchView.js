import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import { searchUser, getUser } from '../../actions/user'
import { NavigationEvents } from 'react-navigation'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchUser, getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    users: state.search.users
  }
}


// const fakeUser = {
//   email:"yurii@test.com",
//   followers: null,
//   following: null,
//   photo:"https://image.flaticon.com/icons/png/512/55/55089.png",
//   uid:"HW5gQGTUQvXcfi9OLwasb1Ok6kt2",
//   userName:"yuriistetsula",
// }


// const fakeUsers = []
// for (let i = 0; i < 999; i++) {
//   fakeUsers.push({ ...fakeUser, uid: i})
// }

class Search extends React.Component {
	state = {
    search: '',
    users: []
  }


  // onWillFocus = () => {
  //   console.log('onWillFocus')
  //   this.setState({
  //     users: fakeUsers
  //   })
  // }

	searchUser = () => {
    this.props.searchUser(this.state.search)
     .then(data => {
       if (data && !data.error) {
         this.setState({users: data.response.data})
       }
     }) 
	}

	goToUser = (user) => {
    this.props.getUser(user.uid)
    .then(data => {
      if (data && !data.error) {
        this.props.navigation.navigate('User', { user: data.response }) 
      }
    })
	}

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.onWillFocus} />

	      <TextInput
	        style={styles.input}
	        onChangeText={(search) => this.setState({search})}
	        value={this.state.search}
	        returnKeyType='send'
          placeholder='Search'
          onSubmitEditing={this.searchUser}/>

          {/* <Button title='reverse' onPress={() => {
            const { users } = this.state
            this.setState({users: [ ...users.reverse()] })
          }} /> */}
          
      	<FlatList
				  data={this.state.users}
				  keyExtractor={(item) => JSON.stringify(item.uid)}
				  renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.goToUser(item)} style={[styles.row, styles.space]}>
            <Image style={styles.roundImage} source={{uri: item.photo}}/>
            <View style={[styles.container, styles.left]}>
              <Text style={styles.bold}>{item.userName}</Text>
              <Text style={styles.gray}>{item.bio}</Text>
              {/* <Text style={styles.gray}>{item.uid}</Text> */}
            </View>
          </TouchableOpacity>
				)} />
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  row: {
    flexDirection: 'row'
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundImage: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad'
  },
  bold: {
    fontWeight: 'bold',
  },
  gray: {
    color: '#adadad',
  },
  left: {
    alignItems: 'flex-start',
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

const ConnetedSearchView = connect(mapStateToProps, mapDispatchToProps)(Search)
export default ConnetedSearchView