import React, { PropTypes } from 'react'
import Moment from 'moment'

function Unit({ description, completed, expired, delta, startTime, expiryTime }) {
  let statusDiv = <div></div>
  if (!completed && expired) {
    statusDiv = (
      <div className="expired">Expired {expiryTime.fromNow()}</div>
    )
  } else if (completed) {
    statusDiv = (
      <div className="completed">Completed {expiryTime.fromNow()}</div>
    )
  } else if (delta <= 0) {
    statusDiv = (
      <div className="ongoing">Completing…</div>
    )
  } else {
    const display = Moment(delta).format('m [min] s [seconds]')
    statusDiv = (
      <div className="ongoing">Ongoing with {display}</div>
    )
  }

  const date = startTime.format('YYYY MMM Do')
  const startDisplay = startTime.format('hh:mm A')
  const expiryDisplay = expiryTime.format('hh:mm A')
  const lengthDisplay = expiryTime.diff(startTime, 'minutes')
  const time = `from ${startDisplay} to ${expiryDisplay} (${lengthDisplay} minutes)`


  return (
    <div>
      {statusDiv}
      <div className="description">{description}</div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
  )
}

Unit.propTypes = {
  completed:   PropTypes.bool.isRequired,
  description: PropTypes.string,
  delta:       PropTypes.number,
  expired:     PropTypes.bool.isRequired,
  expiryTime:  PropTypes.object.isRequired,
  startTime:   PropTypes.object.isRequired
}

export default Unit
