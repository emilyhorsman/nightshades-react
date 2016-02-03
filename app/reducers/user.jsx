const initialState = {
  'fetching': false,
  'authenticated': false,
  'name': ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'ME_FETCHING':
      return {
        ...state,
        fetching: true
      }
    case 'ME_ERROR':
      return {
        ...state,
        fetching: false
      }
    case 'ME_SUCCESS':
      if (action.data.type !== 'user') {
        return {
          ...state,
          fetching: false
        }
      }

      return {
        fetching: false,
        authenticated: true,
        name: action.data.attributes.name
      }
    case 'LOGOUT_FETCHING':
      return {
        ...state,
        fetching: true
      }
    case 'LOGOUT_SUCCESS':
      return initialState
    default:
      return state
  }
}

export default user
