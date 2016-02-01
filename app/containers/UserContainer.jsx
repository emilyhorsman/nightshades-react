import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, logout, fetchMe } from '../actions'
import UnitsListContainer from './UnitsListContainer'
import Loader from '../components/Loader'
import User from '../components/User'
import SignIn from '../components/SignIn'

class UserContainer extends Component {
  componentDidMount() {
    fetchMe(this.props.dispatch)
  }

  signIn(provider) {
    const url = api('/auth/' + provider + '?login=start&postMessage=true')

    let authWindow = window.open(url, 'SignIn', 'width=600,height=600,resizable=yes')
    const onCompletion = (ev) => {
      if (ev.data == 'COMPLETE') {
        authWindow.close()
        fetchMe(this.props.dispatch)
        window.removeEventListener('message', onCompletion, true)
      }
    }

    window.addEventListener('message', onCompletion, true)
  }

  render() {
    const { dispatch, authenticated, name, loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    if (authenticated) {
      return (
        <div>
          <User
            name={name}
            logout={() => logout(dispatch) }
          />

          <UnitsListContainer />
        </div>
      )
    }

    return (
      <SignIn
        twitter={this.signIn.bind(this, 'twitter')}
        facebook={this.signIn.bind(this, 'facebook')}
      />
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
