const fetchOpts = {
  'credentials': 'include',
  'mode': 'cors'
}

export function api(endpoint) {
  return '//api.nightshades.xyz:5000/v1' + endpoint
}

export function logout(dispatch) {
  dispatch({ type: 'FETCHING_LOGOUT' })

  return fetch(api('/logout'), fetchOpts)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: 'FETCHING_LOGOUT_SUCCESS' })
    })
}

export function fetchMe(dispatch) {
  dispatch({ type: 'FETCHING_ME' })

  return fetch(api('/me'), fetchOpts)
    .then(response => response.json())
    .then(json => {
      if (json.hasOwnProperty('errors')) {
        return Promise.reject(json.errors[0].title)
      }

      dispatch({
        type: 'FETCHING_ME_SUCCESS',
        data: json.data,
        receivedAt: Date.now()
      })
    })
    .catch(e => {
      dispatch({
        type: 'FETCHING_ME_ERROR',
        message: e,
        receivedAt: Date.now()
      })
    })
}

export function fetchUnits(dispatch) {
  dispatch({ type: 'FETCHING_UNITS' })

  return fetch(api('/units'), fetchOpts)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: 'FETCHING_UNITS_SUCCESS',
        data: json.data,
        receivedAt: Date.now()
      })
    })
    .catch(e => {
      dispatch({
        type: 'FETCHING_UNITS_ERROR',
        message: e,
        receivedAt: Date.now()
      })
    })
}

export function markComplete(dispatch, uuid) {
  dispatch({
    type: 'FETCHING_MARK_COMPLETE',
    uuid: uuid
  })

  const body = new Blob([JSON.stringify({
    data: {
      type: 'unit',
      id: uuid,
      attributes: {
        completed: true
      }
    }
  })], { type: 'application/json' })

  return fetch(api('/units/' + uuid), { ...fetchOpts, body: body, method: 'PATCH' })
    .then(response => response.json())
    .then(json => {
      if (json.hasOwnProperty('errors')) {
        return Promise.reject(json.errors[0].title)
      }

      dispatch({
        type: 'FETCHING_MARK_COMPLETE_SUCCESS',
        data: json.data,
        receivedAt: Date.now()
      })
    })
    .catch(e => {
      dispatch({
        type: 'FETCHING_MARK_COMPLETE_ERROR',
        message: e,
        receivedAt: Date.now()
      })
    })
}
