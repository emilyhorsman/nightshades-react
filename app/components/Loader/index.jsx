import React, { PropTypes } from 'react'

import './styles.scss'

function Loader({ active }) {
  if (!active) {
    return <div></div>
  }

  return (
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

Loader.propTypes = {
  active: PropTypes.bool.isRequired
}

export default Loader
