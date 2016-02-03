import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import UnitForm from '../components/UnitForm'
import { newUnit } from '../actions'

class NewUnitContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delta: 1500,
      startTime: Moment(),
      expiryTime: Moment().add(1500, 'seconds'),
      description: ''
    }

    this.onHandleSubmit = this.handleSubmit.bind(this)
    this.onHandleTimeChange = this.handleTimeChange.bind(this)
    this.onHandleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        ...this.state,
        startTime: Moment(),
        expiryTime: Moment().add(this.state.delta, 'seconds')
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleSubmit(event) {
    event.preventDefault()
    newUnit(this.props.dispatch, this.state)
  }

  handleDescriptionChange(event) {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  handleTimeChange(event) {
    const seconds = Math.max(2, Math.min(120, event.target.value)) * 60
    this.setState({
      ...this.state,
      delta: seconds,
      expiryTime: Moment().add(seconds, 'seconds')
    })
  }

  render() {
    return (
      <UnitForm
        handleSubmit={this.onHandleSubmit}
        handleTimeChange={this.onHandleTimeChange}
        handleDescriptionChange={this.onHandleDescriptionChange}
        {...this.state}
      />
    )
  }
}

export default connect()(NewUnitContainer)
