import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api, fetchMe } from '../actions'
import Loader from '../components/Loader'

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
    const { authenticated, name, loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    if (authenticated) {
      return <div>Hello {name}! It’s good to see you.</div>
    } else {
      const boundSignInTwitter = this.signIn.bind(this, 'twitter')

      return (
        <div>
          <button onClick={boundSignInTwitter}>Sign in with Twitter</button>
          <p>Not logged in!</p>
        </div>
      )
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
