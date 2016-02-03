import React, { PropTypes } from 'react'

function Error({ message, handleDismiss }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={handleDismiss}>Dismiss</button>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  handleDismiss: PropTypes.func.isRequired
}

export default Error
