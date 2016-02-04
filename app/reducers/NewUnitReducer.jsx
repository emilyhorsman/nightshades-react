import Moment from 'moment'

const initialState = {
  fetching: false,
  unit: {
    delta: 1500,
    description: '',
    startTime: Moment(),
    expiryTime: Moment().add(1500, 'seconds')
  }
}

const NewUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_UNIT_CHANGE':
      return {
        ...state,
        unit: {
          ...state.unit,
          ...action.attributes
        }
      }
    case 'TICK':
      return {
        ...state,
        unit: {
          ...state.unit,
          startTime: Moment(),
          expiryTime: Moment().add(state.unit.delta, 'seconds')
        }
      }
    case 'NEW_UNIT_FETCHING':
      return {
        ...state,
        fetching: true
      }
    case 'NEW_UNIT_ERROR':
      return {
        ...state,
        fetching: false
      }
    case 'NEW_UNIT_SUCCESS':
      return initialState
    default:
      return state
  }
}

export default NewUnitReducer
