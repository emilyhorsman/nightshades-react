import React, { PropTypes } from 'react'

function User({ name, logout }) {
  return (
    <div>
      <p>Hello {name}! It’s good to see you.</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default User
