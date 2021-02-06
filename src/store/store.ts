import { useMemo } from 'react'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { AppInitialState } from './app'
import reducers from './reducers'

let store

const initStore = (initialState: AppInitialState) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
}

export const initializeStore = (preloadState) => {
  let _store = store ?? initStore(preloadState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store
  }
  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

export const useStore = (initialState) => {
  return useMemo(() => initializeStore(initialState), [initialState])
}
