import React, { memo, useCallback, useContext } from 'react'
import Item from './Item'
import MemomizedItem from '~/src/components/cart/MemomizedItem'
import { ShopContext, State as ShopState, appleSelector, subtotalSelector, taxSelector, totalSelector } from '~/src/lib'

type ContainerProps = unknown

type Props = {
  items: ShopState['shop']['items']
  apple: { name: 'apple'; value: number }
  subtotal: number
  tax: number
  total: number
  onClick: () => void
}

export const Component: React.FC<Props> = (props) => (
  <div>
    <p>subtotal: {props.subtotal}</p>
    <p>tax: {props.tax}</p>
    <p>total: {props.total}（subtotal * tax）</p>

    <div className="my-4 text-center">
      <button className="btn-blue" type="button" onClick={props.onClick}>
        Add dummy item
      </button>
    </div>

    <div className="my-4">
      <p className="font-bold">Apple</p>
      <Item item={props.apple} />
      <p className="font-bold">Memomized apple</p>
      <MemomizedItem item={props.apple} />
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

  // selectors
  const apple = appleSelector(state)
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
      apple={apple}
      subtotal={subtotal}
      tax={tax}
      total={total}
      onClick={handleClick}
    />
  )
}

Container.displayName = 'Cart'

export default memo(Container)
