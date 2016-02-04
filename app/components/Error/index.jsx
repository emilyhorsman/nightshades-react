import React, { PropTypes } from 'react'

function Error({ message, onDismiss }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default Error
