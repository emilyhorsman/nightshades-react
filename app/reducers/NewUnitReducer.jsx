import Moment from 'moment'

const initialState = {
  fetching: false,
  disabled: false,
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
        fetching: true,
        disabled: true
      }
    case 'NEW_UNIT_ERROR':
      return {
        ...state,
        fetching: false,
        disabled: false
      }
    case 'NEW_UNIT_SUCCESS':
      return {
        ...state,
        fetching: false,
        unit: {
          ...state.unit,
          description: ''
        }
      }
    case 'CANCEL_ONGOING_SUCCESS':
    case 'MARK_COMPLETE_SUCCESS':
      return {
        ...state,
        disabled: false
      }
    default:
      return state
  }
}

export default NewUnitReducer
