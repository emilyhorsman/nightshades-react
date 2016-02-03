import Moment from 'moment'

const initialState = {
  'fetching': false,
  'units': []
}

const units = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_UNIT_FETCHING':
    case 'UNITS_FETCHING':
      return {
        ...state,
        fetching: true
      }
    case 'UNITS_SUCCESS':
      return {
        fetching: false,
        units: action.data.map(unit => {
          return {
            uuid: unit.id,
            description: unit.attributes.description,
            completed: unit.attributes.completed,
            startTime: Moment(unit.attributes.start_time),
            expiryTime: Moment(unit.attributes.expiry_time)
          }
        })
      }
    case 'NEW_UNIT_ERROR':
    case 'UNITS_ERROR':
      return {
        ...state,
        fetching: false
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
      return {
        ...state,
        fetching: false,
        units: [
          {
            uuid: action.data.id,
            completed: false,
            ...action.unit
          }
        ].concat(state.units)
      }
    default:
      return state
  }
}

export default units
