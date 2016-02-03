import React, { Component } from 'react'
import { connect } from 'react-redux'
import { markComplete, fetchUnits } from '../actions'
import Loader from '../components/Loader'
import UnitContainer from './UnitContainer'

class UnitsListContainer extends Component {
  constructor(props) {
    super(props)
    this.mark = (unit) => () => markComplete(this.props.dispatch, unit.uuid)
  }

  componentDidMount() {
    fetchUnits(this.props.dispatch)
  }

  render() {
    const { units, loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    let lastUnitId = 0
    return (
      <ol>
        {units.map(unit =>
          <UnitContainer
            key={++lastUnitId}
            mark={this.mark(unit)}
            {...unit}
          />
        )}
      </ol>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    units: state.units.units,
    loading: state.units.fetching
  }
}

export default connect(
  mapStateToProps
)(UnitsListContainer)
