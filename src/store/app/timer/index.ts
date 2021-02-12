// types
export const TICK = 'APP::TIMER_TICK'

// actions
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: TICK,
    payload: { ts: Date.now() },
  })
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({
      type: TICK,
      payload: { ts: Date.now() },
    })
  }, 1000)

// state
const initialState = {
  lastUpdate: 0,
  tickCount: 0,
}
export type State = typeof initialState

// reducer
export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case TICK:
      return {
        lastUpdate: action.payload.ts,
        tickCount: state.tickCount + 1,
      }
    default:
      return state
  }
}
