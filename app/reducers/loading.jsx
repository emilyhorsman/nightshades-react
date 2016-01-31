const loading = (state = false, action) => {
  switch (action.type) {
    case 'FETCHING_ME_ERROR':
    case 'FETCHING_ME_SUCCESS':
      return false
    case 'FETCHING_ME':
      return true
    default:
      return state
  }
}

export default loading
