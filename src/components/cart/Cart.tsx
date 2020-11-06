import React, { memo, useCallback, useContext, useMemo } from 'react'
import ContextItem from './ContextItem'
import Item from './Item'
import MemoizedItem from './MemoizedItem'
import UseMemoItem from './UseMemoItem'
import { ShopContext, State as ShopState, appleSelector, subtotalSelector, taxSelector, totalSelector } from '~/src/lib'

type ContainerProps = unknown

type Props = {
  items: ShopState['shop']['items']
  appleFromContext: { name: 'apple'; value: number }
  appleFromSelector: { name: 'apple'; value: number }
  appleFromUseMemo: { name: 'apple'; value: number }
  subtotal: number
  tax: number
  total: number
  onClick: () => void
}

export const Component: React.FC<Props> = (props) => (
  <div>
    <h1>Re-render</h1>
    <p>Please turn on on devtools</p>

    <div className="my-2 text-center">
      <button className="btn-blue" type="button" onClick={props.onClick}>
        Add dummy item
      </button>
      <p className="py-2 text-sm text-gray-800">Press this button to rerender the parent component.</p>
    </div>

    <ul className="my-4">
      <li className="py-4">
        <p className="font-bold text-lg">Props from context（useContext） → re-rendered</p>
        <Item item={props.appleFromContext} />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Data source</p>
          <pre>
            <code className="text-blue-700">{`
const { state } = useContext(ShopContext)
const appleFromContext = state.shop.items.find((item) => item.name === 'apple')
        `}</code>
          </pre>
          <br />
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<Item item={props.appleFromContext} />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const Item = (props) => ReactElement'}</code>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">Props from selector（reselect） → re-rendered</p>
        <Item item={props.appleFromSelector} />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<Item item={props.appleFromSelector} />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const Item = (props) => ReactElement'}</code>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">
          Memoized Component → <span>re-rendered</span>
        </p>
        <ContextItem />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<ContextItem />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const ContextItem = () => ReactElement'}</code>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">
          Memoized Component → <span className="text-red-500">skip re-rendering</span>
        </p>
        <MemoizedItem item={props.appleFromContext} />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<MemoizedItem item={props.appleFromContext} />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const MemoizedItem = memo(props) => ReactElement'}</code>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">
          Memoized Component → <span>re-rendered</span>
        </p>
        <Item item={props.appleFromUseMemo} />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<Item item={props.appleFromUseMemo} />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const memoizedApple = useMemo((props) => // some logic, [])'}</code>
          <p>Caution: It may cause a bug because no dependencies array.</p>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">
          Memoized Component → <span>re-rendered</span>
        </p>
        <UseMemoItem />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<UseMemoItem />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const MemoizedItem = () => ReactElement'}</code>
          <code className="text-blue-700">{'const { state } = useContext(ShopContext)'}</code>
          <code className="text-blue-700">{'const item = useMemo(() => // some logic, [state.shop.items])'}</code>
        </details>
      </li>
    </ul>

    <details>
      <summary>Answer</summary>
      <div className="w-128">
        <img src="/images/re-render.png" alt="re-render" />
      </div>
    </details>

    <hr />

    <div className="my-4">
      <p>subtotal: {props.subtotal}</p>
      <p>tax: {props.tax}</p>
      <p>total: {props.total}（subtotal * tax）</p>
    </div>

    <ul>
      {props.items.map((item, i) => (
        <li key={i}>
          name: {item.name}, value: {item.value}
        </li>
      ))}
    </ul>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const { state, addItem } = useContext(ShopContext)

  // apple from context
  const appleFromContext = state.shop.items.find((item) => item.name === 'apple') as { name: 'apple'; value: number }

  // apple from selector
  const appleFromSelector = appleSelector(state)

  // apple from useMemo
  const appleFromUseMemo = useMemo(
    () => state.shop.items.find((item) => item.name === 'apple') as { name: 'apple'; value: number },
    []
  )

  // other selectors
  const subtotal = subtotalSelector(state)
  const tax = taxSelector(state)
  const { total } = totalSelector(state)

  // handler
  const handleClick = useCallback(() => {
    addItem({ name: 'dummy', value: 200 })
  }, [])

  return (
    <Component
      items={state.shop.items}
      appleFromContext={appleFromContext}
      appleFromSelector={appleFromSelector}
      appleFromUseMemo={appleFromUseMemo}
      subtotal={subtotal}
      tax={tax}
      total={total}
      onClick={handleClick}
    />
  )
}

Container.displayName = 'Cart'

export default memo(Container)
