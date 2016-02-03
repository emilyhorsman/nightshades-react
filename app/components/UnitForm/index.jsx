import React, { Component } from 'react'
import Moment from 'moment'

import './styles.scss'

const getExpiry = (minutes) => Moment().add(minutes, 'minutes').format('hh:mm:ss A')

class UnitForm extends Component {
  constructor(props) {
    super(props)
    this.state = { time: 25, expiry: getExpiry(25), description: '' }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        ...this.state,
        expiry: getExpiry(this.state.time)
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  changeTime(event) {
    const time = Math.max(2, Math.min(120, event.target.value))
    this.setState({
      ...this.state,
      time: time,
      expiry: getExpiry(time)
    })
  }

  changeDescription(event) {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const boundTimeChange = this.changeTime.bind(this)
    const boundDescriptionChange = this.changeDescription.bind(this)
    const boundSubmit = this.handleSubmit.bind(this)

    return (
      <div className='new-timer'>
        <form onSubmit={boundSubmit}>
          <label htmlFor='time'>Time (ending at {this.state.expiry})</label>
          <input type='number' id='time' value={this.state.time} onChange={boundTimeChange} /><br />

          <label htmlFor='timeSlider'>Time Slider</label>
          <input type='range' id='timeSlider' value={this.state.time} onChange={boundTimeChange} min={2} max={120} /><br />

          <label htmlFor='description'>Description</label>
          <textarea
            value={this.state.description}
            onChange={boundDescriptionChange}
            name='description'
            id='description'
            placeholder='What are we doing this time?'
            rows='2'
            cols='40'
           />
           <br />
          <button>Start Timer</button>
        </form>
      </div>
    )
  }
}

export default UnitForm
