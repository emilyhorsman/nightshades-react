import React, { Component } from 'react'

import Moment from 'moment'

import Timer from '../components/Timer'

function fmt(num) {
  if (num <= 9) {
    return `0${num}`
  } else {
    return num
  }
}

class TimerContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: props.unit.expiryTime.diff(props.unit.startTime),
      interval: null,
      path: ''
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      interval: setInterval(this.tick.bind(this), 30)
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  tick() {
    const { radius, unit } = this.props
    const { duration } = this.state

    const delta = unit.expiryTime.diff(Moment())

    const angle = (1 - (delta / duration)) * Math.PI * 2
    const x = Math.sin(angle) * radius
    const y = Math.cos(angle) * -radius

    const arc = Number(angle > Math.PI)
    const rot = 0
    const dir = 1
    const r = radius

    const path = `M 0 0 V -${r} A ${r} ${r} ${rot} ${arc} ${dir} ${x} ${y} Z`

    this.setState({
      ...this.state,
      path: path
    })
  }

  render() {
    const { delta } = this.props.unit

    const duration = Moment.duration(delta)
    const minutes  = fmt(duration.minutes())
    const seconds  = fmt(duration.seconds())

    let display = `${minutes}:${seconds}`
    if (duration.hours() > 0) {
      display = `0${duration.hours()}:${display}`
    }

    return (
      <div className="timer-container">
        <Timer
          display={display}
          path={this.state.path}
          radius={50}
        />
      </div>
    )
  }
}

TimerContainer.defaultProps = {
  radius: 50
}

export default TimerContainer
