import React, { Component } from 'react'
import Unit from '../components/Unit'

class UnitContainer extends Component {
  componentWillReceiveProps(nextProps) {
    // Let's check if it's time to tell the server that this unit is complete.
    if (nextProps.fetching || !nextProps.hasOwnProperty('delta')) {
      return
    }

    if (nextProps.completed) {
      return
    }

    if (nextProps.delta <= -100) {
      this.props.markComplete()
    }
  }

  render() {
    return <li className="unit"><Unit {...this.props} /></li>
  }
}

export default UnitContainer
