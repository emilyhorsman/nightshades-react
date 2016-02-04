import Moment from 'moment'

let errorIDSequence = 0

const ErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case 'TICK':
      // Only display errors for 15 seconds.
      return state.filter(error => {
        return Moment(error.receivedAt + 15000).isAfter()
      })
    case 'DISMISS_ERROR':
      return state.filter(error => error.id !== action.id)
    case 'ME_ERROR':
      // We don't want to display an error stating that we're logged out.
      return state
    default:
      if (!action.type.endsWith('_ERROR')) {
        return state
      }

      return [{
        id: ++errorIDSequence,
        ...action
      }].concat(state)
  }
}

export default ErrorsReducer
