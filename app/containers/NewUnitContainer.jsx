import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import UnitForm from '../components/UnitForm'
import Loader from '../components/Loader'
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

  render() {
    return (
      <UnitForm
        handleSubmit={this.handleSubmit.bind(this)}
        handleTimeChange={this.handleTimeChange.bind(this)}
        handleDescriptionChange={this.handleDescriptionChange.bind(this)}
        {...this.state}
      />
    )
  }
}

export default connect()(NewUnitContainer)
