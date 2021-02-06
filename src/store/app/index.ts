import { combineReducers } from 'redux'
import { State as CounterState, reducer as counterReducer } from './counter'
import { State as TimerState, reducer as timerReducer } from './timer'

export type AppState = {
  counter: CounterState
  timer: TimerState
}

export const appReducers = combineReducers({
  counter: counterReducer,
  timer: timerReducer,
})
