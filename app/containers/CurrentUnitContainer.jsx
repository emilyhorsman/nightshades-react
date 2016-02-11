import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/Units'

class CurrentUnitContainer extends Component {
  render() {
    const { canCancel, actions } = this.props

    return (
      <div className="current-unit-container">
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
    canCancel: state.NewUnitDomain.disabled
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
