import React, { PropTypes } from 'react'

import './styles.scss'

function User({ name, onLogout }) {
  return (
    <div className="user">
      {name}
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default User
