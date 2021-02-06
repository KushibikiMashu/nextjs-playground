import { combineReducers } from 'redux'
import { appReducers } from './app'

export default combineReducers({
  ...appReducers,
})
