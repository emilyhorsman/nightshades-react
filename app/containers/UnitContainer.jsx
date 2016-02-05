import React, { Component, PropTypes } from 'react'
import Moment from 'moment'

class UnitContainer extends Component {
  componentWillReceiveProps(nextProps) {
    // Let's check if it's time to tell the server that this unit is complete.
    if (nextProps.fetching || !nextProps.hasOwnProperty('delta')) {
      return
    }

    if (nextProps.completed) {
      return
    }

    if (nextProps.delta <= 0) {
      this.props.markComplete()
    }
  }

  render() {
    const { expired, completed, description, startTime, expiryTime } = this.props

    const date = startTime.format('YYYY MMM Do')
    const startDisplay = startTime.format('hh:mm A')
    const expiryDisplay = expiryTime.format('hh:mm A')
    const lengthDisplay = expiryTime.diff(startTime, 'minutes')
    const time = `from ${startDisplay} to ${expiryDisplay} (${lengthDisplay} minutes)`

    let statusDiv = <div></div>
    if (!completed && expired) {
      statusDiv = (
        <div className="expired">Expired {expiryTime.fromNow()}</div>
      )
    } else if (completed) {
      statusDiv = (
        <div className="completed">Completed {expiryTime.fromNow()}</div>
      )
    } else if (this.props.delta <= 0) {
      statusDiv = (
        <div className="ongoing">Completing…</div>
      )
    } else {
      const display = Moment(this.props.delta).format('m [min] s [seconds]')
      statusDiv = (
        <div className="ongoing">Ongoing with {display}</div>
      )
    }

    return (
      <li>
        {statusDiv}
        <div className="description">{description}</div>
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </li>
    )
  }
}

UnitContainer.propTypes = {
  markComplete: PropTypes.func.isRequired,
  description: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  startTime: PropTypes.object.isRequired,
  expiryTime: PropTypes.object.isRequired
}

export default UnitContainer
