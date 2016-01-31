const initialState = {
  'authenticated': false,
  'name': ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_ME_SUCCESS':
      if (action.data.type !== 'user') {
        return state
      }

      return {
        'authenticated': true,
        'name': action.data.attributes.name
      }

    default:
      return state
  }
}

export default user
