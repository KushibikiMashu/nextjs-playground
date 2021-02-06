import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCount, incrementCount, resetCount } from '~/src/store/app/counter'
import { InitialState } from '~/src/store/store'

type ContainerProps = unknown

type Props = {
  state: InitialState
  increment: () => void
  decrement: () => void
  reset: () => void
}

const Component: React.FC<Props> = (props) => (
  <main className="my-4 mx-auto max-w-lg">
    <h1 className="text-2xl font-bold pb-2">Redux State</h1>
    <pre className="bg-gray-200 text-black rounded-md p-4">
      <code>{JSON.stringify(props.state, null, 4)}</code>
    </pre>

    <div className="my-4">
      <h2 className="text-xl font-bold py-2">Counter</h2>
      <div className="text-center">
        <span className="text-xl">{props.state.app.count}</span>
        <div className="space-x-4 my-4 text-lg">
          <button className="px-4 btn-blue" type="button" onClick={props.increment}>
            +
          </button>
          <button className="px-4 btn-red" type="button" onClick={props.reset}>
            reset
          </button>
          <button className="px-4 btn-blue" type="button" onClick={props.decrement}>
            -
          </button>
        </div>
      </div>
    </div>
  </main>
)

const Container: React.FC<ContainerProps> = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const increment = () => dispatch(incrementCount())
  const decrement = () => dispatch(decrementCount())
  const reset = () => dispatch(resetCount())

  return <Component state={state} increment={increment} decrement={decrement} reset={reset} />
}

export default Container
