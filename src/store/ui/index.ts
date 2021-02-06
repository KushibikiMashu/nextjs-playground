import { combineReducers } from 'redux'
import { TICK } from '~/src/store/app/timer'

// types, actions は app から import する

// state
const initialState = 0
export type State = typeof initialState

// reducer
export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case TICK:
      return state + 1
    default:
      return state
  }
}

export type UIState = {
  tickCount: State
}
export const uiReducers = combineReducers({
  tickCount: reducer,
})
