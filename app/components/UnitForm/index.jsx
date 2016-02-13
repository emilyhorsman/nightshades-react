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
  const tagInputProps = {
    id: 'tags'
  }

  return (
    <div className="unit-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="tags">Tags</label>
        <TagsInput
          addKeys={[9, 13, 188]}
          value={tags}
          onChange={handleTagsChange}
          renderLayout={tagsInputRenderLayout}
          inputProps={tagInputProps}
        />

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
          <div className="-left">
            <input
              type="number"
              id="time"
              value={delta / 60}
              onChange={handleTimeChange}
            />
          </div>

          <div className="-right">
            <input
              type="range"
              id="timeSlider"
              value={delta / 60}
              onChange={handleTimeChange}
              min={2}
              max={120}
            />
          </div>
        </div>

        <button disabled={disabled}>Start Timer</button>
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
