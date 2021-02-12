import { TICK } from '~/src/store/app/timer'

// state
const initialState = 0
export type State = typeof initialState

// reducer
export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    // store.app の Action
    case TICK:
      return state + 1
    default:
      return state
  }
}
