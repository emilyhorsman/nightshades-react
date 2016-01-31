const initialState = {
  'fetching': false,
  'authenticated': false,
  'name': ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_ME':
      return {
        ...state,
        'fetching': true
      }
    case 'FETCHING_ME_ERROR':
      return {
        ...state,
        'fetching': false
      }
    case 'FETCHING_ME_SUCCESS':
      if (action.data.type !== 'user') {
        return {
          ...state,
          'fetching': false
        }
      }

      return {
        'fetching': false,
        'authenticated': true,
        'name': action.data.attributes.name
      }

    default:
      return state
  }
}

export default user
