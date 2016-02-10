import React, { PropTypes } from 'react'
import TagsInput from 'react-tagsinput'
import Moment from 'moment'

import './styles.scss'

const formatExpiry = (time) => time.format('hh:mm A')

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
    <div className="unit-form">
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="timeSlider">Length</label>
        <label htmlFor="time">Length (minutes)</label>
        <div className="number-range-group">
          <input type="number" id="time" value={delta / 60} onChange={handleTimeChange} />
          <input type="range" id="timeSlider" value={delta / 60} onChange={handleTimeChange} min={2} max={120} />
        </div>

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
         <TagsInput
           addKeys={[9, 13, 188]}
           value={tags}
           onChange={handleTagsChange}
         />

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
