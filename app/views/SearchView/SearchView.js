import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchUser, getUser } from '../../actions/user'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchUser, getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    users: state.search.users
  }
}

class SearchView extends React.Component {

  render () {
    return null
  }
}

const ConnetedSearchView = connect(mapStateToProps, mapDispatchToProps)(SearchView)
export default ConnetedSearchView
