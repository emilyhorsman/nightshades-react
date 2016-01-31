const loading = (state = false, action) => {
  switch (action.type) {
    case 'FETCHING_ME_SUCCESS':
    case 'FETCHING_TIMERS_SUCCESS':
      return false
    case 'FETCHING_ME':
    case 'FETCHING_TIMERS':
      return true
    default:
      return state
  }
}

export default loading
