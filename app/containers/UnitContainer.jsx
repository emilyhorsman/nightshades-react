import React, { Component } from 'react'
import Unit from '../components/Unit'
import { isOngoing } from '../reducers/helpers'

class UnitContainer extends Component {
  componentWillReceiveProps(nextProps) {
    // Let's check if it's time to tell the server that this unit is complete.
    if (nextProps.fetching) {
      return
    }

    if (!isOngoing(nextProps)) {
      return
    }

    if (nextProps.meta.delta <= -100) {
      this.props.markComplete()
    }
  }

  render() {
    const { meta, model } = this.props
    return (
      <li className="unit">
        <Unit
          {...model}
          {...meta}
          expired={!isOngoing(this.props)}
        />
      </li>
    )
  }
}

export default UnitContainer
