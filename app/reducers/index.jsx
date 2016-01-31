import { combineReducers } from 'redux'
import user from './user'
import timers from './timers'
import loading from './loading'

const rootReducer = combineReducers({
  user,
  timers,
  loading
})

export default rootReducer
