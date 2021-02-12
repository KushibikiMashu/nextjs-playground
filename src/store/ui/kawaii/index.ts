//types
const IDLE = 'UI::KAWAII_IDLE'
const FIRE = 'UI::KAWAII_FIRE'

// actions
export const kawaiiIdle = () => ({ type: IDLE })
export const kawaiiFire = () => ({ type: FIRE })

// state
const initialState = 'idle'
export type State = typeof initialState

// reducer
export const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case IDLE:
      return 'idle'
    case FIRE:
      return 'fired'
    default:
      return state
  }
}
