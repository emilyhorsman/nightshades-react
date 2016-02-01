import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUnits } from '../actions'
import Loader from '../components/Loader'
import UnitContainer from './UnitContainer'

class UnitsListContainer extends Component {
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
