import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/Units'
import Loader from '../components/Loader'
import UnitContainer from './UnitContainer'

class UnitsListContainer extends Component {
  constructor(props) {
    super(props)

    this.onMarkComplete = (id) => props.actions.markComplete.bind(this, id)
  }

  componentDidMount() {
    this.props.actions.fetchUnits()
  }

  render() {
    const { units, loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    let lastUnitId = 0
    return (
      <div>
        <ol className="units">
          {units.map(unit =>
            <UnitContainer
              key={++lastUnitId}
              markComplete={this.onMarkComplete(unit.uuid)}
              {...unit}
            />
          )}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    units: state.UnitsDomain.units,
    loading: state.UnitsDomain.fetching,
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
)(UnitsListContainer)
