import Moment from 'moment'

const initialState = {
  'fetching': false,
  'units': []
}

const units = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_UNITS':
      return {
        ...state,
        fetching: true
      }
    case 'FETCHING_UNITS_SUCCESS':
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
    case 'FETCHING_UNITS_ERROR':
      return {
        ...state,
        fetching: false
      }
    default:
      return state
  }
}

export default units
