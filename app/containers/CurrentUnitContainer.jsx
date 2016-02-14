import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/Units'
import { isOngoing } from '../reducers/helpers'
import TimerContainer from './TimerContainer'

class CurrentUnitContainer extends Component {
  render() {
    const { actions, unit } = this.props

    let timer = null
    if (unit.length > 0) {
      timer = <TimerContainer {...unit[0]} />
    }

    return (
      <div className="current-unit-container">
        {timer}
        <button
          className="-red"
          disabled={unit.length === 0}
          onClick={actions.cancelOngoing}
        >Cancel Timer</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    unit: state.UnitsDomain.units.filter(isOngoing)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentUnitContainer)
