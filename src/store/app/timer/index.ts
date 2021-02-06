// types
const TICK = 'APP::TIMER_TICK'

// actions
export const serverRenderClick = () => (dispatch) =>
  dispatch({
    type: TICK,
    payload: { light: false, ts: Date.now() },
  })
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({
      type: TICK,
      payload: { light: true, ts: Date.now() },
    })
  }, 1000)

// reducer
export type InitialState = {
  lastUpdate: number
  light: boolean
}

const initialState = {
  lastUpdate: 0,
  light: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TICK:
      return {
        lastUpdate: action.payload.ts,
        light: !!action.payload.light,
      }
    default:
      return state
  }
}
