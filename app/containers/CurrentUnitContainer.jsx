import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/Units'
import TimerContainer from './TimerContainer'

class CurrentUnitContainer extends Component {
  render() {
    const { canCancel, actions, units } = this.props
    const unit = units.filter(unit => unit.ongoing)

    let timer = null
    if (unit.length > 0) {
      timer = <TimerContainer unit={unit[0]} />
    }

    return (
      <div className="current-unit-container">
        {timer}
        <button
          className="-red"
          disabled={!canCancel}
          onClick={actions.cancelOngoing}
        >Cancel Timer</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    canCancel: state.NewUnitDomain.disabled,
    units: state.UnitsDomain.units
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
