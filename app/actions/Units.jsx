import { fetchAPI } from './'

export function fetchUnits() {
  return {
    type: 'UNITS',
    promise: fetchAPI('/units')
  }
}

export function markComplete(uuid) {
  const body = new Blob([JSON.stringify({
    data: {
      type: 'unit',
      id: uuid,
      attributes: {
        completed: true
      }
    }
  })], { type: 'application/json' })

  return {
    type: 'MARK_COMPLETE',
    uuid: uuid,
    promise: fetchAPI('/units/' + uuid, { body: body, method: 'PATCH' })
  }
}

export function cancelOngoing() {
  return {
    type: 'CANCEL_ONGOING',
    promise: fetchAPI('/units', { method: 'DELETE' })
  }
}
