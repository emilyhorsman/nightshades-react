import React, { Component } from 'react'
import Moment from 'moment'

import './styles.scss'

const formatExpiry = (time) => time.format('hh:mm:ss A')

class UnitForm extends Component {
  render() {
    const {
      expiryTime,
      delta,
      description,
      handleSubmit,
      handleTimeChange,
      handleDescriptionChange
    } = this.props

    return (
      <div className='new-timer'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='time'>Time (ending at {formatExpiry(expiryTime)})</label>
          <input type='number' id='time' value={delta / 60} onChange={handleTimeChange} /><br />

          <label htmlFor='timeSlider'>Time Slider</label>
          <input type='range' id='timeSlider' value={delta / 60} onChange={handleTimeChange} min={2} max={120} /><br />

          <label htmlFor='description'>Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
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
