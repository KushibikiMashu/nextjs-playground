// types
const INCREMENT = 'APP::COUNTER_INCREMENT'
const DECREMENT = 'APP::COUNTER_DECREMENT'
const RESET = 'APP::COUNTER_RESET'

// actions
export const incrementCount = () => ({ type: INCREMENT })
export const decrementCount = () => ({ type: DECREMENT })
export const resetCount = () => ({ type: RESET })

// reducer
export const reducer = (state = 0, { type }) => {
  switch (type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case RESET:
      return 0
    default:
      return state
  }
}
