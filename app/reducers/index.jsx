import { combineReducers } from 'redux'
import user from './user'
import units from './units'

const rootReducer = combineReducers({
  user,
  units
})

export default rootReducer
