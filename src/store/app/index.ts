import { combineReducers } from 'redux'
import { State as CounterState, reducer as counterReducer } from './counter'
import { State as TimerState, reducer as timerReducer } from './timer'

export type AppState = {
  count: CounterState
  timer: TimerState
}

export const appReducers = combineReducers({
  count: counterReducer,
  timer: timerReducer,
})
