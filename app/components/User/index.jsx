import React, { PropTypes } from 'react'

import './styles.scss'

function User({ name, onLogout }) {
  return (
    <div className="user-meta">
      <p>Hello {name}! It’s good to see you.</p>
      <button className="secondary" onClick={onLogout}>Logout</button>
    </div>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default User
