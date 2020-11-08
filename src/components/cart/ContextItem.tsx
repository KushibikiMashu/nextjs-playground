import React, { useContext } from 'react'
import { Props as ItemProps } from '~/src/components/cart/Item'
import { ShopContext, getAppleItem } from '~/src/lib'

type ContainerProps = unknown

type Props = ItemProps

const Component: React.FC<Props> = (props) => (
  <p>
    name: {props.item.name}, value: {props.item.value}
  </p>
)

const Container: React.FC<ContainerProps> = () => {
  const { state } = useContext(ShopContext)
  const item = getAppleItem(state.shop.items)

  return <Component item={item} />
}

Container.displayName = 'ContextItem'

export default Container
