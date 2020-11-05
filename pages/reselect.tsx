import React from 'react'
import Cart from '~/src/components/cart'
import { ShopContext, shopState } from '~/src/lib'

type ContainerProps = unknown

type Props = unknown

export const Component: React.FC<Props> = () => (
  <div className="w-64 mx-auto">
    <Cart />
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  return (
    <ShopContext.Provider value={shopState}>
      <Component />
    </ShopContext.Provider>
  )
}

Container.displayName = 'ReselectPage'

export default Container
