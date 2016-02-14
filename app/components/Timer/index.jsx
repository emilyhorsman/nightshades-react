import React from 'react'

import CircleProgressVector from '../CircleProgressVector'

import './styles.scss'

function Timer({ display, radius, path }) {
  return (
    <div className="timer">
      <div className="label">time remaining</div>
      <time>{display}</time>
      <CircleProgressVector path={path} radius={radius} />
    </div>
  )
}

export default Timer
