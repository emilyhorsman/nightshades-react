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
    model: {
      description: '',
      tags: [],
      ...timeRange(1500)
    },

    meta: {
      delta: 1500,
    }
  }
}

const NewUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_UNIT_CHANGE':
      return {
        ...state,
        unit: {
          ...state.unit,
          model: {
            ...state.unit.model,
            ...action.attributes.model
          },
          meta: {
            ...state.unit.meta,
            ...action.attributes.meta
          }
        }
      }
    case 'TICK':
      return {
        ...state,
        unit: {
          ...state.unit,
          model: {
            ...state.unit.model,
            ...timeRange(state.unit.meta.delta)
          }
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
          model: {
            ...state.unit.model,
            description: ''
          }
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
