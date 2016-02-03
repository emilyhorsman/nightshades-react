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
    type: 'FETCHING_LOGOUT',
    promise: fetchAPI('/logout')
  })
}

export function fetchMe(dispatch) {
  dispatch({
    type: 'FETCHING_ME',
    promise: fetchAPI('/me')
  })
}

export function fetchUnits(dispatch) {
  dispatch({
    type: 'FETCHING_UNITS',
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
    type: 'FETCHING_MARK_COMPLETE',
    uuid: uuid,
    promise: fetchAPI('/units/' + uuid, { body: body, method: 'PATCH' })
  })
}
