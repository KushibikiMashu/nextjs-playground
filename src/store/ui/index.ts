import { combineReducers } from 'redux'
import { reducer as KawaiiReducer, State as KawaiiState } from './kawaii'
import { reducer as TimerReducer, State as TimerState } from './timer'

export type UIState = {
  kawaii: KawaiiState
  tickCount: TimerState
}
export const uiReducers = combineReducers({
  kawaii: KawaiiReducer,
  tickCount: TimerReducer,
})
