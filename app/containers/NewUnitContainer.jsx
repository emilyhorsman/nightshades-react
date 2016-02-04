import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Moment from 'moment'

import Loader from '../components/Loader'
import UnitForm from '../components/UnitForm'
import * as actions from '../actions/NewUnit'

class NewUnitContainer extends Component {
  constructor(props) {
    super(props)

    this.onHandleSubmit = this.handleSubmit.bind(this)
    this.onHandleTimeChange = this.handleTimeChange.bind(this)
    this.onHandleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.actions.newUnit(this.props.unit)
  }

  handleDescriptionChange(event) {
    this.props.actions.change({
      description: event.target.value
    })
  }

  handleTimeChange(event) {
    const seconds = Math.max(2, Math.min(120, event.target.value)) * 60
    this.props.actions.change({
      delta: seconds,
      expiryTime: Moment().add(seconds, 'seconds')
    })
  }

  render() {
    const { loading } = this.props

    if (loading) {
      return <Loader active={loading} />
    }

    return (
      <UnitForm
        handleDescriptionChange={this.onHandleDescriptionChange}
        handleSubmit={this.onHandleSubmit}
        handleTimeChange={this.onHandleTimeChange}
        {...this.props.unit}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.NewUnitDomain.fetching,
    unit: state.NewUnitDomain.unit
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
)(NewUnitContainer)
