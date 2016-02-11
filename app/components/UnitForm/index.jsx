import React, { PropTypes } from 'react'
import TagsInput from 'react-tagsinput'
import Moment from 'moment'

import './styles.scss'

const formatExpiry = (time) => time.format('hh:mm:ss A')

function tagsInputRenderLayout (tagComponents, inputComponent) {
  return (
    <span>
      {inputComponent}
      {tagComponents}
    </span>
  )
}

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
      <form className="table-layout" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="tags">Tags</label>
            <TagsInput
              addKeys={[9, 13, 188]}
              value={tags}
              onChange={handleTagsChange}
              renderLayout={tagsInputRenderLayout}
            />
          </div>

          <div className="col -fixed-width">
            <label htmlFor="description">Description</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              id="description"
              placeholder="What are we doing this time?"
              rows="2"
            />

            <label htmlFor="time">Length (minutes)</label>
            <label htmlFor="timeSlider" className="sr-only">Time Slider</label>
            <div className="group">
              <input type="number" id="time" value={delta / 60} onChange={handleTimeChange} />
              <input
                type="range"
                id="timeSlider"
                value={delta / 60}
                onChange={handleTimeChange}
                min={2}
                max={120}
              />
            </div>

            <button disabled={disabled}>Start Timer</button>
          </div>
        </div>
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
