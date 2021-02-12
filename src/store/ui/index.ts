import { combineReducers } from 'redux'
import { TICK } from '~/src/store/app/timer'

const IDLE = 'UI::KAWAII_IDLE'
const FIRE = 'UI::KAWAII_FIRE'

// state
const initialState = {
  tickCount: 0,
  kawaii: 'idle',
}
export type State = typeof initialState

// reducer
export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    // store.app の Action
    case TICK:
      return {
        ...state,
        tickCount: state.tickCount + 1,
      }
    case IDLE:
      return {
        ...state,
        kawaii: 'idle',
      }
    case FIRE:
      return {
        ...state,
        kawaii: 'fired',
      }
    default:
      return state
  }
}

// store.ui の型
export type UIState = {
  timer: State
}
export const uiReducers = combineReducers({
  tickCount: reducer,
})
