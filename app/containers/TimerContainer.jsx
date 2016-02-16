import React, { Component } from 'react'

import Moment from 'moment'

import Timer from '../components/Timer'

class TimerContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: props.model.expiryTime.diff(props.model.startTime),
      interval: null,
      path: ''
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      delta: this.props.meta.delta,
      interval: setInterval(this.tick.bind(this), 100)
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  tick() {
    const { radius, model } = this.props
    const { delta, duration } = this.state

    // Ensure α ≥ 0.001 to prevent initial flickering.
    const angle = Math.min(
      Math.max(
        (1 - (delta / duration)) * Math.PI * 2,
        0.001
      ),
      Math.PI * 2 - 0.001
    )
    const x = Math.sin(angle) * radius
    const y = Math.cos(angle) * -radius

    const arc = Number(angle > Math.PI)
    const rot = 0
    const dir = 1
    const r = radius

    const path = `M 0 0 V -${r} A ${r} ${r} ${rot} ${arc} ${dir} ${x} ${y} Z`

    this.setState({
      ...this.state,
      delta: this.state.delta - 100,
      path: path
    })
  }

  render() {
    return (
      <div className="timer-container">
        <Timer
          delta={this.props.meta.delta}
          path={this.state.path}
          ticking={true}
        />
      </div>
    )
  }
}

TimerContainer.defaultProps = {
  radius: 50
}

export default TimerContainer
