import React, { Component, PropTypes } from 'react'

import './styles.scss'

class Timer extends Component {
  render() {
    const { time, completed, resetTimer } = this.props

    let classes = ['timer']
    if (completed) {
      classes.push('is-completed')
    }

    return (
      <div className={classes.join(' ')}>
        <button onClick={resetTimer}>Reset Timer</button>{' '}
        Seconds remaining: {time}
      </div>
    )
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  completed: PropTypes.bool,
  resetTimer: PropTypes.func.isRequired
}

export default Timer
