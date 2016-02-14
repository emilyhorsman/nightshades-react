import Moment from 'moment'
import { isOngoing } from './helpers'

function timeRange(delta) {
  return {
    startTime: Moment(),
    expiryTime: Moment().add(delta, 'seconds')
  }
}

const initialState = {
  fetching: false,
  disabled: false,
  unit: {
    delta: 1500,
    description: '',
    tags: [],
    ...timeRange(1500)
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
          ...timeRange(state.unit.delta)
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
    case 'UNITS_SUCCESS':
      // Disable new unit submission if there is a currently ongoing unit.
      if (!action.data.find(isOngoing)) {
        return state
      }

      return {
        ...state,
        disabled: true
      }
    default:
      return state
  }
}

export default NewUnitReducer
