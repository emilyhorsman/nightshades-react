import React, { Component, PropTypes } from 'react'
import Moment from 'moment'

class UnitContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { markedComplete: props.expired }
  }

  componentWillReceiveProps(nextProps) {
    // Let's check if it's time to tell the server that this unit is complete.
    if (!nextProps.hasOwnProperty('delta')) {
      return
    }

    if (this.state.markedComplete || this.props.completed) {
      return
    }

    if (nextProps.delta <= 0) {
      this.setState({ markedComplete: true })
      this.props.markComplete()
    }
  }

  render() {
    const { expired, completed, description, startTime, expiryTime } = this.props

    const date = startTime.format('YYYY MMM Do')
    const time = `from ${startTime.format('hh:mm A')} to ${expiryTime.format('hh:mm A')} (${expiryTime.diff(startTime, 'minutes')} minutes)`

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
