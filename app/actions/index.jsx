const api_url = 'https://rawgit.com/emilyhorsman/fc167009bb30f63f56ee/raw/68c50908c622bc9986f35b8f24139cd28a6763a2/timers.json'

const api = (endpoint) => ('//api.nightshades.xyz:5000/v1' + endpoint)

let lastTimerId = 0

function receiveTimers(json) {
  return {
    type: 'FETCHING_TIMERS_SUCCESS',
    timers: json.data.map(timer => ({
      initialTime: timer.attributes.countdown_from,
      time: timer.attributes.countdown_from,
      id: lastTimerId++,
      completed: false
    })),
    receivedAt: Date.now()
  }
}

export function fetchTimers(dispatch) {
  dispatch({
    type: 'FETCHING_TIMERS'
  })

  return fetch(api_url)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveTimers(json))
    })
}

export function tick() {
  return {
    type: 'TICK'
  }
}

export function resetTimer(id) {
  return {
    type: 'RESET_TIMER',
    id: id
  }
}

export function fetchMe(dispatch) {
  dispatch({
    type: 'FETCHING_ME'
  })

  return fetch(api('/me'))
    .then(response => console.log(response))
}
