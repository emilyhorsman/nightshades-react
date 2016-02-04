import { combineReducers } from 'redux'
import { default as ErrorDomain } from './ErrorsReducer'
import { default as UserDomain } from './UserReducer'
import { default as UnitsDomain } from './UnitsReducer'
import { default as NewUnitDomain } from './NewUnitReducer'

const RootReducer = combineReducers({
  ErrorDomain,
  UserDomain,
  UnitsDomain,
  NewUnitDomain
})

export default RootReducer
