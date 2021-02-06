import { TICK } from '~/src/store/app/timer'

// types, actions は app から import する

// state
const initialState = {
  tickCount: 0,
}
export type State = typeof initialState

// reducer
export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case TICK:
      return { tickCount: state.tickCount + 1 }
    default:
      return state
  }
}

export const uiReducers = {
  uiTick: reducer,
}
