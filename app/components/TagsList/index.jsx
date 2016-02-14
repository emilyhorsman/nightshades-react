import React from 'react'

function TagsList({ tags }) {
  return (
    <div>Tags: {tags.join(', ')}</div>
  )
}

export default TagsList
