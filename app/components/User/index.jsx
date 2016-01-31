import React, { Component, PropTypes } from 'react'

class User extends Component {
  render() {
    const { name, logout } = this.props

    return (
      <div>
        <p>Hello {name}! It’s good to see you.</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default User
