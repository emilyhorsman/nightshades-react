let errorIDSequence = 0

const ErrorsReducer = (state = [], action) => {
  if (action.type === 'DISMISS_ERROR') {
    return state.filter(error => error.id !== action.id)
  }

  if (!action.type.endsWith('_ERROR')) {
    return state
  }

  // We don't want to display an error stating that we're logged out.
  if (action.type === 'ME_ERROR') {
    return state
  }

  return [{
    id: ++errorIDSequence,
    ...action
  }].concat(state)
}

export default ErrorsReducer
