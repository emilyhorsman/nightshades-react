const api = (endpoint) => ('//api.nightshades.xyz:5000/v1' + endpoint)

export function fetchMe(dispatch) {
  dispatch({
    type: 'FETCHING_ME'
  })

  return fetch(api('/me'), { 'credentials': 'include', 'mode': 'cors' })
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
