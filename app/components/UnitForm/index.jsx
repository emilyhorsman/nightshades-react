import React, { PropTypes } from 'react'
import Moment from 'moment'

import './styles.scss'

const formatExpiry = (time) => time.format('hh:mm:ss A')

function UnitForm({
  expiryTime,
  delta,
  description,
  disabled,
  handleSubmit,
  handleTagsChange,
  handleTimeChange,
  handleDescriptionChange,
  tags
}) {
  return (
    <div className="new-timer">
      <form onSubmit={handleSubmit}>
        <div className="form-group timer-length">
          <label className="addon" htmlFor="time">Length</label>
          <input type="number" id="time" value={delta / 60} onChange={handleTimeChange} />
          <span className="addon">ends at {formatExpiry(expiryTime)}</span>
        </div>

        <label htmlFor="timeSlider" className="sr-only">Time Slider</label>
        <input type="range" id="timeSlider" value={delta / 60} onChange={handleTimeChange} min={2} max={120} /><br />

        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          name="description"
          id="description"
          placeholder="What are we doing this time?"
          rows="2"
          cols="40"
         />
         <br />

         <label htmlFor="tags">Tags</label>
         <input type="text" id="tags" value={tags} onChange={handleTagsChange} /><br />

        <button className="-green" disabled={disabled}>Start Timer</button>
      </form>
    </div>
  )
}

UnitForm.propTypes = {
  expiryTime: PropTypes.object.isRequired,
  delta: PropTypes.number.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTagsChange: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired
}

export default UnitForm
