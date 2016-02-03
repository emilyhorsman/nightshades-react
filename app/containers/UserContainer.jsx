import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, logout, fetchMe } from '../actions'

import NewUnitContainer from './NewUnitContainer'
import UnitsListContainer from './UnitsListContainer'
import Loader from '../components/Loader'
import User from '../components/User'
import SignIn from '../components/SignIn'

class UserContainer extends Component {
  constructor(props) {
    super(props)
    this.logout = () => logout(this.props.dispatch)

    this.signInTwitter = this.signIn.bind(this, 'twitter')
    this.signInFacebook = this.signIn.bind(this, 'facebook')
  }

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
    const { authenticated, name, loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    if (authenticated) {
      return (
        <div>
          <User
            logout={this.logout}
            name={name}
          />

          <NewUnitContainer />
          <UnitsListContainer />
        </div>
      )
    }

    return (
      <SignIn
        facebook={this.signInFacebook}
        twitter={this.signInTwitter}
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
