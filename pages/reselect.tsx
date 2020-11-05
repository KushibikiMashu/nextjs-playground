import React, { useState } from 'react'
import Cart from '~/src/components/cart'
import { ShopContext, State as ShopState, shopState } from '~/src/lib'

type ContainerProps = unknown

type Props = unknown

export const Component: React.FC<Props> = () => (
  <div className="w-64 mx-auto">
    <Cart />
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const [state, update] = useState<ShopState>(shopState)
  const addItem = (item: ShopState['shop']['items'][number]) =>
    update((state) => ({ ...state, shop: { ...state.shop, items: state.shop.items.concat(item) } }))

  return (
    <ShopContext.Provider value={{ state, addItem }}>
      <Component />
    </ShopContext.Provider>
  )
}

Container.displayName = 'ReselectPage'

export default Container
