import { useCallback, useReducer } from 'react'

// TODO
// タイムトラベルの機能を追加

type State = {
  user: { loggedIn: boolean; name: string | null }
  todos: { id: number; title: string }[]
  status: 'loading' | 'fulfilled' | 'rejected' | null
  logs: string[]
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

const initialState: State = {
  user: { loggedIn: false, name: null },
  todos: [],
  status: null,
  logs: [],
}

// TODO immerを試す
const reducer = (state: State, action: Action): State => {
  // Need some middleware lol
  const logs = [...state.logs, action.type]

  switch (action.type) {
    case 'USER::LOGIN':
      return { ...state, user: { ...state.user, loggedIn: true }, logs }
    case 'USER::LOGOUT':
      return { ...state, user: { name: null, loggedIn: false }, logs }
    case 'USER::CHANGE':
      return { ...state, user: { ...state.user, name: action.payload.name }, logs }
    case 'TODO::ADD':
      return { ...state, todos: [...state.todos, { id: action.payload.id, title: action.payload.title }], logs }
    case 'TODO::DELETE':
      // eslint-disable-next-line no-case-declarations
      const todos = state.todos.filter((todo) => todo.id !== action.payload.id)
      return { ...state, todos, logs }
    case 'FETCH::LOADING':
      return { ...state, status: 'loading', logs }
    case 'FETCH::FULFILLED':
      return { ...state, status: 'fulfilled', logs }
    case 'FETCH::REJECTED':
      return { ...state, status: 'rejected', logs }
    case 'FETCH::RESET':
      return { ...state, status: null, logs }
    default:
      return state
  }
}

export const isChange = (type): type is 'USER::CHANGE' => type === 'USER::CHANGE'

export const useUserState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

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

  return { state, userHandler, todosHandler, fetchHandler }
}
