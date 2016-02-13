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
    this.onHandleTagsChange = this.handleTagsChange.bind(this)
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

  handleTagsChange(tags) {
    this.props.actions.change({
      tags: tags
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
      return <div className="new-unit-container"><Loader active={loading} /></div>
    }

    return (
      <div className="new-unit-container">
        <UnitForm
          disabled={this.props.disabled}
          handleDescriptionChange={this.onHandleDescriptionChange}
          handleSubmit={this.onHandleSubmit}
          handleTagsChange={this.onHandleTagsChange}
          handleTimeChange={this.onHandleTimeChange}
          {...this.props.unit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.NewUnitDomain.fetching,
    disabled: state.NewUnitDomain.disabled,
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
