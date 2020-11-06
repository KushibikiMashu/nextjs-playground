import React, { useCallback, useReducer } from 'react'

// TODO
// タイムトラベルの機能を追加

type ContainerProps = unknown

type Props = {
  state: State
  // TODO typeを分けたい
  // typeの名前は template literal type で書けそう
  userHandler: (type: string, name?: string) => void
  todosHandler: (type: string, payload: { id: number; title?: string }) => void
  fetchHandler: (type: string) => void
  isButtonDisabled: boolean
  getActionColor: (action: string) => 'red' | 'orange' | 'blue' | 'grey'
}

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

const isChange = (type): type is 'USER::CHANGE' => type === 'USER::CHANGE'

export const Component: React.FC<Props> = (props) => (
  <div className="w-64 mx-auto">
    <div className="h-40">
      <div className="my-2 text-right">
        {props.state.user.loggedIn ? (
          <button
            className="btn-red"
            type="button"
            onClick={() => {
              props.userHandler('USER::LOGOUT')
              props.fetchHandler('FETCH::RESET')
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className={`${props.isButtonDisabled ? 'btn-disabled' : 'btn-blue'}`}
            type="button"
            disabled={props.isButtonDisabled}
            onClick={() => {
              props.fetchHandler('FETCH::LOADING')
              setTimeout(() => {
                props.userHandler('USER::LOGIN')
                props.fetchHandler('FETCH::FULFILLED')
              }, 2000)
            }}
          >
            Login
          </button>
        )}

        {!props.state.user.loggedIn && (
          <div className="my-4">
            <input
              className={
                'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => props.userHandler('USER::CHANGE', e.target.value)}
            />
          </div>
        )}
      </div>

      {props.state.user.loggedIn && <div className="pb-3">Hello, {props.state.user.name}</div>}

      {props.state.status && <div>status: {props.state.status}</div>}
    </div>

    <p className="my-2 text-xl text-center">Action logs</p>
    <ul>
      {props.state.logs.map((log, i) => (
        <li key={i}>
          <span className={`text-${props.getActionColor(log)}-600`}>{log}</span>
        </li>
      ))}
    </ul>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
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

  const isNameEmpty = state.user.name === null || state.user.name === ''
  const isButtonDisabled = isNameEmpty || state.status === 'loading'
  const getActionColor = (action: string) => {
    if (action.startsWith('USER')) {
      return 'blue'
    } else if (action.startsWith('TODOS')) {
      return 'orange'
    } else if (action.startsWith('FETCH')) {
      return 'red'
    } else {
      return 'grey'
    }
  }

  return (
    <Component
      state={state}
      userHandler={userHandler}
      todosHandler={todosHandler}
      fetchHandler={fetchHandler}
      isButtonDisabled={isButtonDisabled}
      getActionColor={getActionColor}
    />
  )
}

Container.displayName = 'UseReducerPage'

export default Container
