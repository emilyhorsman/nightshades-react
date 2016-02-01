import React, { Component, PropTypes } from 'react'
import Moment from 'moment'

class UnitContainer extends Component {
  constructor(props) {
    super(props)

    const delta = this.props.expiryTime.diff(Moment())
    this.state = {
      delta: delta,
      markable: delta > 0
    }
  }

  componentDidMount() {
    const tick = () => {
      this.setState({
        ...this.state,
        delta: this.props.expiryTime.diff(Moment())
      })

      if (this.state.delta <= 0 && this.state.markable) {
        this.setState({ ...this.state, markable: false })
        this.props.mark()
      }
    }

    this.interval = setInterval(tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { completed, description, startTime, expiryTime } = this.props

    const date = startTime.format('YYYY MMM Do')
    const time = `from ${startTime.format('hh:mm A')} to ${expiryTime.format('hh:mm A')} (${expiryTime.diff(startTime, 'minutes')} minutes)`

    let statusDiv = <div></div>
    if (this.state.delta <= 0) {
      const statusClass = completed ? 'completed' : 'expired'
      const friendlyStatus = statusClass[0].toUpperCase() + statusClass.slice(1)
      statusDiv = (
        <div className={statusClass}>{friendlyStatus} {expiryTime.fromNow()}</div>
      )
    } else {
      const display = Moment(this.state.delta).format('m [min] s [seconds]')
      statusDiv = (
        <div className='ongoing'>Ongoing with {display}</div>
      )
    }

    return (
      <li>
        {statusDiv}
        <div className='description'>{description}</div>
        <div className='date'>{date}</div>
        <div className='time'>{time}</div>
      </li>
    )
  }
}

UnitContainer.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  startTime: PropTypes.object.isRequired,
  expiryTime: PropTypes.object.isRequired
}

export default UnitContainer
