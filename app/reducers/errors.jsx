let errorIDSequence = 0

const errors = (state = [], action) => {
  if (action.type === 'DISMISS_ERROR') {
    return state.filter(error => error.id !== action.id)
  }

  if (!action.type.endsWith('_ERROR')) {
    return state
  }

  return [{
    id: ++errorIDSequence,
    ...action
  }].concat(state)
}

export default errors
