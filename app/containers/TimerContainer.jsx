import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timer from '../components/Timer'
import Loader from '../components/Loader'
import { fetchTimers, tick, resetTimer } from '../actions'

class TimerContainer extends Component {
  componentDidMount() {
    let { dispatch } = this.props

    fetchTimers(dispatch)

    this.interval = setInterval(() => {
      dispatch(tick())
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { timers, loading, dispatch } = this.props

    return (
      <div>
        <Loader active={loading} />
        {timers.map(timer =>
          <Timer
            key={timer.id}
            time={timer.time}
            completed={timer.time == 0}
            resetTimer={() => dispatch(resetTimer(timer.id))}
          />
        )}
      </div>
    )
  }
}

TimerContainer.propTypes = {
  timers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired
  })).isRequired
}

const mapStateToProps = (state) => {
  return {
    timers: state.timers,
    loading: state.loading
  }
}

export default connect(
  mapStateToProps
)(TimerContainer)
