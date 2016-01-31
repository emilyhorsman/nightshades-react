import React, { Component, PropTypes } from 'react'

class SignIn extends Component {
  render() {
    const { twitter, facebook } = this.props

    return (
      <div>
        <button onClick={twitter}>Sign in with Twitter</button><br />
        <button onClick={facebook}>Sign in with Facebook</button>
        <p>Not logged in!</p>
      </div>
    )
  }
}

SignIn.propTypes = {
  twitter: PropTypes.func.isRequired,
  facebook: PropTypes.func.isRequired
}

export default SignIn
