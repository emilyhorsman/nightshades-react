import React, { PropTypes } from 'react'

function User({ name, onLogout }) {
  return (
    <div>
      <p>Hello {name}! It’s good to see you.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default User
