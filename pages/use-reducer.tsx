import { useCallback } from 'react'
import { useUserState } from '~/src/hooks/useUserState'

type ContainerProps = unknown

type Props = {
  isButtonDisabled: boolean
  getActionColor: (action: string) => 'red' | 'orange' | 'blue' | 'grey'
} & ReturnType<typeof useUserState>

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
                props.fetchHandler('FETCH::RESET')
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
          <span className={`text-${props.getActionColor(log)}-600`}>
            {i + 1}: {log}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const { state, userHandler, todosHandler, fetchHandler } = useUserState()

  const isNameEmpty = state.user.name === null || state.user.name === ''
  const isButtonDisabled = isNameEmpty || state.status === 'loading'
  const getActionColor = useCallback((action: string) => {
    if (action.startsWith('USER')) {
      return 'blue'
    } else if (action.startsWith('TODOS')) {
      return 'orange'
    } else if (action.startsWith('FETCH')) {
      return 'red'
    } else {
      return 'grey'
    }
  }, [])

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
