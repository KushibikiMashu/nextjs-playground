import { useCallback } from 'react'
import { useImmerReducer } from 'use-immer'

type State = {
  user: { loggedIn: boolean; name: string | null }
  todos: { id: number; title: string }[]
  status: 'loading' | 'fulfilled' | 'rejected' | null
  logs: string[]
  oldStates: State[]
}

type Action =
  | { type: 'USER::LOGIN' }
  | { type: 'USER::LOGOUT' }
  | { type: 'USER::CHANGE'; payload: { name: string } }
  | { type: 'TODO::ADD'; payload: { id: number; title: string } }
  | { type: 'TODO::DELETE'; payload: { id: number } }
  | { type: 'FETCH::LOADING' }
  | { type: 'FETCH::FULFILLED' }
  | { type: 'FETCH::REJECTED' }
  | { type: 'FETCH::RESET' }
  | { type: 'APP::PREV' }

const initialState: State = {
  user: { loggedIn: false, name: null },
  todos: [],
  status: null,
  logs: [],
  oldStates: [],
}

// Usual reducer
// const reducer = (state: State, action: Action): State => {
//   // Need some middleware lol
//   const logs = [...state.logs, action.type]
//
//   switch (action.type) {
//     case 'USER::LOGIN':
//       return { ...state, user: { ...state.user, loggedIn: true }, logs }
//     case 'USER::LOGOUT':
//       return { ...state, user: { name: null, loggedIn: false }, logs }
//     case 'USER::CHANGE':
//       return { ...state, user: { ...state.user, name: action.payload.name }, logs }
//     case 'TODO::ADD':
//       return { ...state, todos: [...state.todos, { ...action.payload }], logs }
//     case 'TODO::DELETE':
//       // eslint-disable-next-line no-case-declarations
//       const todos = state.todos.filter((todo) => todo.id !== action.payload.id)
//       return { ...state, todos, logs }
//     case 'FETCH::LOADING':
//       return { ...state, status: 'loading', logs }
//     case 'FETCH::FULFILLED':
//       return { ...state, status: 'fulfilled', logs }
//     case 'FETCH::REJECTED':
//       return { ...state, status: 'rejected', logs }
//     case 'FETCH::RESET':
//       return { ...state, status: null, logs }
//     default:
//       return state
//   }
// }

// reducer for immer
const immerReducer = (draft: State, action: Action) => {
  const type = action.type

  // middleware 相当
  // ---------------
  // add old state
  draft.oldStates.push(draft)
  // add log
  draft.logs.push(type)

  switch (type) {
    case 'USER::LOGIN':
      draft.user.loggedIn = true
      return
    case 'USER::LOGOUT':
      draft.user.name = null
      draft.user.loggedIn = false
      return
    case 'USER::CHANGE':
      // Why TS doesn't recognize the action.type is "USER::CHANGE"?
      if (action.type === 'USER::CHANGE') {
        draft.user.name = action.payload.name
      }
      return
    case 'TODO::ADD':
      if (action.type === 'TODO::ADD') {
        draft.todos.push(action.payload)
      }
      return
    case 'TODO::DELETE':
      if (action.type === 'TODO::DELETE') {
        delete draft.todos[action.payload.id]
      }
      return
    case 'FETCH::LOADING':
      draft.status = 'loading'
      return
    case 'FETCH::FULFILLED':
      draft.status = 'fulfilled'
      return
    case 'FETCH::REJECTED':
      draft.status = 'rejected'
      return
    case 'FETCH::RESET':
      draft.status = null
    // case 'APP::PREV': {
    //   // TODO implement
    //   // この action で追加した state と log を削除
    //   draft.logs.pop()
    //   draft.oldStates.pop()
    //   // 前回の log を削除
    //   draft.logs.pop()
    //   // 前回の oldState を取得できない
    //   draft = draft.oldStates.pop()
    // }
  }
}

export const isChange = (type): type is 'USER::CHANGE' => type === 'USER::CHANGE'

export const useUserState = () => {
  // Usual
  // const [state, dispatch] = useReducer(reducer, initialState)

  // Immer
  const [state, dispatch] = useImmerReducer(immerReducer, initialState)

  const userHandler = useCallback((type: 'USER::LOGIN' | 'USER::LOGOUT' | 'USER::CHANGE', name?: string) => {
    if (isChange(type)) {
      dispatch({ type, payload: { name } })
      return
    }

    dispatch({ type })
  }, [])
  const todosHandler = useCallback((type: 'TODO::ADD' | 'TODO::DELETE', payload: { id: number; title?: string }) => {
    if (type === 'TODO::ADD' && typeof payload.title !== 'undefined') {
      dispatch({ type, payload: { id: payload.id, title: payload.title } })
    } else if (type === 'TODO::DELETE') {
      dispatch({ type, payload })
    }
  }, [])
  const fetchHandler = useCallback(
    (type: 'FETCH::LOADING' | 'FETCH::FULFILLED' | 'FETCH::REJECTED' | 'FETCH::RESET') => {
      dispatch({ type })
    },
    []
  )
  const appHandler = useCallback((type: 'APP::PREV') => dispatch({ type }), [])

  return { state, userHandler, todosHandler, fetchHandler, appHandler }
}
