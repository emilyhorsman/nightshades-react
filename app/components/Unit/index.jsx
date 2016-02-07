import React, { PropTypes } from 'react'
import Moment from 'moment'

import './styles.scss'

const ONGOING    = 'Ongoing'
const COMPLETED  = 'Completed'
const COMPLETING = 'Completing'
const EXPIRED    = 'Expired'

function getIcon(status) {
  switch (status) {
    case COMPLETED:
      return (
        <svg fill="#388E3C" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      )
    case COMPLETING:
    case ONGOING:
      return (
        <svg fill="#039BE5" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
      )
    case EXPIRED:
      return (
        <svg fill="#EF5350" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
      )
    default:
      return false
  }
}

function Unit({ description, completed, expired, delta, startTime, expiryTime, tags }) {
  const duration = Moment.duration(delta)

  let status = ONGOING
  if (!completed && expired) {
    status = EXPIRED
  } else if (completed) {
    status = COMPLETED
  } else if (delta <= 0) {
    status = COMPLETING
  }

  let statusText = false
  if (status == EXPIRED || status == COMPLETED) {
    statusText = `${status} ${expiryTime.fromNow()}`
  } else if (status == COMPLETING) {
    statusText = `${status}…`
  } else {
    let display = `${duration.minutes()}m ${duration.seconds()}s`
    if (duration.hours() > 0) {
      display = `${duration.hours()}h ${display}`
    }

    statusText = `${status} with ${display}`
  }


  const date = startTime.format('MMM Do YYYY')
  const startDisplay = startTime.format('hh:mm')
  const expiryDisplay = expiryTime.format('hh:mm A')
  const lengthDisplay = expiryTime.diff(startTime, 'minutes')

  return (
    <div>
      <div className="icon">{getIcon(status)}</div>
      <div className="time">
        <span className="length">{lengthDisplay}m</span>
        {' '}— {date} — {startDisplay} to {expiryDisplay}
      </div>
      <div className="meta">
        <div className="status -status-{status.toLowerCase()}">{statusText}.</div>
        <p>{description}</p>
      </div>
    </div>
  )
}

Unit.propTypes = {
  completed:   PropTypes.bool.isRequired,
  description: PropTypes.string,
  delta:       PropTypes.number,
  expired:     PropTypes.bool.isRequired,
  expiryTime:  PropTypes.object.isRequired,
  startTime:   PropTypes.object.isRequired,
}

export default Unit
