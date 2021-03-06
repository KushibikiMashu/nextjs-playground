import React, { useCallback, useContext, useMemo } from 'react'
import ContextItem from './ContextItem'
import Item from './Item'
import MemoizedItem from './MemoizedItem'
import UseMemoItem from './UseMemoItem'
import {
  AppleItem,
  ShopContext,
  State as ShopState,
  appleSelector,
  getAppleItem,
  subtotalSelector,
  taxSelector,
  totalSelector,
} from '~/src/lib'

type ContainerProps = unknown

type Props = {
  items: ShopState['shop']['items']
  appleFromContext: AppleItem
  appleFromSelector: AppleItem
  appleFromUseMemo: AppleItem
  subtotal: number
  tax: number
  total: number
  onClick: () => void
}

export const Component: React.FC<Props> = (props) => (
  <div>
    <h1 className="text-2xl font-bold">Re-render</h1>
    <p className="mt-2">Please turn on &quot;Highlight updates when components render&quot; in React devtools</p>

    <div className="mt-8 mb-2 text-center">
      <button className="btn-blue" type="button" onClick={props.onClick}>
        Add dummy item
      </button>
      <p className="py-2 text-sm text-gray-800">Press this button to rerender the parent component.</p>
    </div>

    <ul className="my-4">
      <li className="py-4">
        <p className="font-bold text-lg">1. Props from context（useContext） → re-rendered</p>
        <Item item={props.appleFromContext} />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Data source</p>
          <pre>
            <code className="text-blue-700">
              {`
const { state } = useContext(ShopContext)
const appleFromContext = state.shop.items.find((item) => item.name === 'apple')
`}
            </code>
          </pre>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<Item item={props.appleFromContext} />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const Item = (props) => ReactElement'}</code>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">
          2. Props from selector（reselect）
          <br /> → re-rendered and skipped re-calculating
        </p>
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
          3. Props from context(useContext) → <span>re-rendered</span>
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
          4. Memoized Component → <span className="text-red-500">skipped re-rendering(fastest)</span>
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
          5. Props from useMemo → <span>re-rendered</span>
        </p>
        <Item item={props.appleFromUseMemo} />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<Item item={props.appleFromUseMemo} />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const memoizedApple = useMemo((props) => // some logic, [])'}</code>
          <p>Caution: It may cause a bug because of no dependencies array.</p>
        </details>
      </li>
      <li className="py-4">
        <p className="font-bold text-lg">
          6. Props from useContext and useMemo → <span>re-rendered</span>
        </p>
        <UseMemoItem />
        <details>
          <summary>Details</summary>
          <p className="mt-2">Usage</p>
          <code className="text-blue-700">{'<UseMemoItem />'}</code>
          <br />
          <p className="mt-2">Component Definition</p>
          <code className="text-blue-700">{'const MemoizedItem = () => ReactElement'}</code>
          <br />
          <code className="text-blue-700">{'const { state } = useContext(ShopContext)'}</code>
          <br />
          <code className="text-blue-700">{'const item = useMemo(() => // some logic, [state.shop.items])'}</code>
        </details>
      </li>
    </ul>

    <details>
      <summary>Actual Rendering</summary>
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
  const appleFromContext = getAppleItem(state.shop.items)

  // apple from selector
  const appleFromSelector = appleSelector(state)

  // apple from useMemo
  const appleFromUseMemo = useMemo(() => getAppleItem(state.shop.items), [])

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

export default Container
