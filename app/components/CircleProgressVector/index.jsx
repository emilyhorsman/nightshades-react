import React from 'react'

import './styles.scss'

function CircleProgressVector({ radius, path }) {
  const viewBox = `0 0 ${radius * 2} ${radius * 2}`
  const transform = `translate(${radius}, ${radius})`

  return (
    <svg className="progress" role="presentation" viewBox={viewBox}>
      <circle cx={radius} cy={radius} r={radius - 0.2} />
      <path className="timer-path" d={path} transform={transform} />
      <circle className="subtraction" cx={radius} cy={radius} r={radius - 5} />
    </svg>
  )
}

export default CircleProgressVector
