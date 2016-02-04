import { combineReducers } from 'redux'
import ErrorsReducer from './ErrorsReducer'
import UserReducer from './UserReducer'
import UnitsReducer from './UnitsReducer'

const RootReducer = combineReducers({
  errors: ErrorsReducer,
  user: UserReducer,
  units: UnitsReducer
})

export default RootReducer
