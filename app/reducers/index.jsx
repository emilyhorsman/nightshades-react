import { combineReducers } from 'redux'
import ErrorsReducer from './ErrorsReducer'
import UserReducer from './UserReducer'
import UnitsReducer from './UnitsReducer'
import { default as NewUnitDomain } from './NewUnitReducer'

const RootReducer = combineReducers({
  errors: ErrorsReducer,
  user: UserReducer,
  units: UnitsReducer,
  NewUnitDomain
})

export default RootReducer
