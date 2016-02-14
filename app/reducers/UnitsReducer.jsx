import Moment from 'moment'
import { isOngoing } from './helpers'

const initialState = {
  fetching: false,
  units: []
}

const UnitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CANCEL_ONGOING_FETCHING':
    case 'UNITS_FETCHING':
      return {
        ...state,
        fetching: true
      }
    case 'UNITS_SUCCESS':
      return {
        ...state,
        fetching: false,
        units: action.data
      }
    case 'CANCEL_ONGOING_ERROR':
    case 'UNITS_ERROR':
    case 'MARK_COMPLETE_ERROR':
      return {
        ...state,
        fetching: false
      }
    case 'MARK_COMPLETE_FETCHING':
      return {
        ...state,
        units: state.units.map(unit => {
          if (unit.uuid !== action.uuid) {
            return unit
          }

          return {
            ...unit,
            fetching: true
          }
        })
      }
    case 'MARK_COMPLETE_SUCCESS':
      return {
        ...state,
        units: state.units.map(unit => {
          if (unit.uuid !== action.uuid) {
            return unit
          }

          return {
            ...unit,
            model: {
              ...unit.model,
              completed: action.data.model.completed
            }
          }
        })
      }
    case 'NEW_UNIT_SUCCESS':
      return {
        ...state,
        units: [action.data].concat(state.units)
      }
    case 'CANCEL_ONGOING_SUCCESS':
      return {
        ...state,
        fetching: false,
        units: state.units.filter(unit => !isOngoing(unit))
      }
    case 'TICK':
      return {
        ...state,
        units: state.units.map(unit => {
          if (!isOngoing(unit)) {
            return unit
          }

          return {
            ...unit,
            meta: {
              ...unit.meta,
              delta: unit.model.expiryTime.diff(Moment())
            }
          }
        })
      }
    default:
      return state
  }
}

export default UnitsReducer
