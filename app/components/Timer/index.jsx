import React from 'react'
import Moment from 'moment'

import CircleProgressVector from '../CircleProgressVector'

import './styles.scss'

function fmt(num) {
  if (num <= 9) {
    return `0${Math.max(0, num)}`
  } else {
    return Math.max(0, num)
  }
}

function Timer({ delta, radius, path, ticking }) {
  const duration = Moment.duration(delta)
  const minutes  = fmt(duration.minutes())
  const seconds  = fmt(duration.seconds())

  let display = `${minutes}:${seconds}`
  if (duration.hours() > 0) {
    display = `0${duration.hours()}:${display}`
  }

  let label
  if (ticking) {
    label = <div className="label">time remaining</div>
  }

  return (
    <div className="timer">
      {label}
      <time>{display}</time>
      <CircleProgressVector path={path} radius={radius} />
    </div>
  )
}

Timer.defaultProps = {
  radius: 50
}

export default Timer
