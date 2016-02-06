import { fetchAPI } from './'

export function change(attributes) {
  return {
    type: 'NEW_UNIT_CHANGE',
    attributes: attributes
  }
}

export function newUnit(attributes) {
  const body = new Blob([JSON.stringify({
    data: {
      type: 'unit',
      attributes: {
        description: attributes.description,
        delta: attributes.delta,
        tags: attributes.tags
      }
    }
  })], { type: 'application/json' })

  return {
    type: 'NEW_UNIT',
    promise: fetchAPI('/units', { body: body, method: 'POST' })
  }
}
