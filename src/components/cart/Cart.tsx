import React, { memo, useContext } from 'react'
import { ShopContext, subtotalSelector, taxSelector, totalSelector } from '~/src/lib'

type ContainerProps = unknown

type Props = {
  subtotal: number
  tax: number
  total: number
}

export const Component: React.FC<Props> = (props) => (
  <div>
    <p>subtotal: {props.subtotal}</p>
    <p>tax: {props.tax}</p>
    <p>total: {props.total}（subtotal * tax）</p>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const state = useContext(ShopContext)
  const subtotal = subtotalSelector(state)
  const tax = taxSelector(state)
  const { total } = totalSelector(state)

  return <Component subtotal={subtotal} tax={tax} total={total} />
}

Container.displayName = 'Cart'

export default memo(Container)
