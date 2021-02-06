import { State as CounterState, reducer as counterReducer } from './counter'
import { State as TimerState, reducer as timerReducer } from './timer'

export type AppState = {
  counter: CounterState
  timer: TimerState
}

export const appReducers = {
  counter: counterReducer,
  timer: timerReducer,
}
