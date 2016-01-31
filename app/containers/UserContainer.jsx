import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMe } from '../actions'
import Loader from '../components/Loader'

class UserContainer extends Component {
  componentDidMount() {
    let { dispatch } = this.props

    fetchMe(dispatch)
  }

  render() {
    const { authenticated, name, loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    if (authenticated) {
      return <div>Hello {name}! It’s good to see you.</div>
    } else {
      return <div>Not logged in!</div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    name: state.user.name,
    loading: state.user.fetching
  }
}

export default connect(
    mapStateToProps
)(UserContainer)
