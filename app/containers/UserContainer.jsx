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

    if (authenticated) {
      return (<div>{name}</div>)
    }

    return (
      <div>
        <Loader active={loading} />
      </div>
    )
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
