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
