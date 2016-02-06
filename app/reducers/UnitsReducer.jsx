import Moment from 'moment'
import { isExpired } from './helpers'

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
        fetching: false,
        units: action.data.map(unit => {
          const expiryTime = Moment(unit.attributes.expiry_time)

          let _unit = {
            uuid: unit.id,
            description: unit.attributes.description,
            completed: unit.attributes.completed,
            expired: isExpired(unit.attributes),
            startTime: Moment(unit.attributes.start_time),
            expiryTime: expiryTime
          }

          if (unit.attributes.hasOwnProperty('tags')) {
            _unit.tags = unit.attributes.tags
          }

          if (!_unit.expired) {
            _unit.delta = expiryTime.diff(Moment())
          }

          return _unit
        })
      }
    case 'CANCEL_ONGOING_ERROR':
    case 'UNITS_ERROR':
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
          if (unit.uuid !== action.data.id) {
            return unit
          }

          return {
            ...unit,
            completed: action.data.attributes.completed
          }
        })
      }
    case 'NEW_UNIT_SUCCESS':
      const expiryTime = Moment(action.data.attributes.expiry_time)
      let unit = {
        fetching: false,
        uuid: action.data.id,
        description: action.data.attributes.description,
        expired: isExpired(action.data.attributes),
        completed: action.data.attributes.completed,
        startTime: Moment(action.data.attributes.start_time),
        expiryTime: expiryTime,
        delta: expiryTime.diff(Moment())
      }

      if (action.data.attributes.hasOwnProperty('tags')) {
        unit.tags = action.data.attributes.tags
      }

      return {
        ...state,
        units: [unit].concat(state.units)
      }
    case 'CANCEL_ONGOING_SUCCESS':
      return {
        ...state,
        fetching: false,
        units: state.units.filter(unit => unit.complete || unit.expired)
      }
    case 'TICK':
      return {
        ...state,
        units: state.units.map(unit => {
          if (unit.completed || unit.expired) {
            return unit
          }

          return {
            ...unit,
            delta: unit.expiryTime.diff(Moment())
          }
        })
      }
    default:
      return state
  }
}

export default UnitsReducer
