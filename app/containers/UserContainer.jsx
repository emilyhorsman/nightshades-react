import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/User'
import { api } from '../actions'
import NewUnitContainer from './NewUnitContainer'
import UnitsListContainer from './UnitsListContainer'
import Loader from '../components/Loader'
import User from '../components/User'
import SignIn from '../components/SignIn'

class UserContainer extends Component {
  constructor(props) {
    super(props)

    this.onLogout = props.actions.logout.bind(this)
    this.signInWith = (provider) => this.signIn.bind(this, provider)
  }

  componentDidMount() {
    this.interval = setInterval(this.props.actions.tick.bind(this), 1000)
    this.props.actions.fetchMe()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  signIn(provider) {
    const url = api('/auth/' + provider + '?login=start&postMessage=true')

    let authWindow = window.open(url, 'SignIn', 'width=600,height=600,resizable=yes')
    const onCompletion = (ev) => {
      if (ev.data == 'COMPLETE') {
        authWindow.close()
        this.props.actions.fetchMe()
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
            name={name}
            onLogout={this.onLogout}
          />

          <NewUnitContainer />
          <UnitsListContainer />
        </div>
      )
    }

    return (
      <SignIn
        facebook={this.signInWith('facebook')}
        twitter={this.signInWith('twitter')}
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
