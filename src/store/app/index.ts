import { InitialState as CounterInitialState, reducer as counterReducer } from './counter'
import { InitialState as TimerInitialState, reducer as timerReducer } from './timer'

export type AppInitialState = {
  counter: CounterInitialState
  timer: TimerInitialState
}

export const appReducers = {
  counter: counterReducer,
  timer: timerReducer,
}
