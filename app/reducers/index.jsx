import { combineReducers } from 'redux'
import errors from './errors'
import user from './user'
import units from './units'

const rootReducer = combineReducers({
  errors,
  user,
  units
})

export default rootReducer
