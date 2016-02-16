import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/Units'
import { isOngoing } from '../reducers/helpers'
import TimerContainer from './TimerContainer'
import Timer from '../components/Timer'

class CurrentUnitContainer extends Component {
  render() {
    const { actions, currentUnit, newUnit } = this.props

    let timer
    if (currentUnit.length > 0) {
      timer = <TimerContainer {...currentUnit[0]} />
    } else {
      timer = <Timer delta={newUnit.meta.delta * 1000} ticking={false} />
    }

    return (
      <div className="current-unit-container">
        {timer}
        <button
          className="-red"
          disabled={currentUnit.length === 0}
          onClick={actions.cancelOngoing}
        >Cancel Timer</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUnit: state.UnitsDomain.units.filter(isOngoing),
    newUnit: state.NewUnitDomain.unit
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
