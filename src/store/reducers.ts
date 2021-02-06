import { combineReducers } from 'redux'
import { appReducers } from './app'
import { uiReducers } from './ui'

export default combineReducers({
  ...appReducers,
  ...uiReducers,
})
