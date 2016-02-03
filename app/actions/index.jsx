export function api(endpoint) {
  return '//api.nightshades.xyz:5000/v1' + endpoint
}

const fetchAPI = (endpoint, opts) => {
  return fetch(api(endpoint), {
    credentials: 'include',
    mode: 'cors',
    ...opts
  })
}

export function logout(dispatch) {
  dispatch({
    type: 'LOGOUT',
    promise: fetchAPI('/logout')
  })
}

export function fetchMe(dispatch) {
  dispatch({
    type: 'ME',
    promise: fetchAPI('/me')
  })
}

export function fetchUnits(dispatch) {
  dispatch({
    type: 'UNITS',
    promise: fetchAPI('/units')
  })
}

export function markComplete(dispatch, uuid) {
  const body = new Blob([JSON.stringify({
    data: {
      type: 'unit',
      id: uuid,
      attributes: {
        completed: true
      }
    }
  })], { type: 'application/json' })

  dispatch({
    type: 'MARK_COMPLETE',
    uuid: uuid,
    promise: fetchAPI('/units/' + uuid, { body: body, method: 'PATCH' })
  })
}
