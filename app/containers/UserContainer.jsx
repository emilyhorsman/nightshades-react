import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMe } from '../actions'

class UserContainer extends Component {
  componentDidMount() {
    let { dispatch } = this.props

    fetchMe(dispatch)
  }

  render() {
    const { authenticated, name } = this.props

    if (authenticated) {
      return <div>{{name}}</div>
    }

    return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    name: state.user.name
  }
}

export default connect(
    mapStateToProps
)(UserContainer)
