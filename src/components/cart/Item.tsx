import React from 'react'
import { AppleItem } from '~/src/lib'

export type Props = {
  item: AppleItem
}

export const Component: React.FC<Props> = (props) => (
  <p>
    name: {props.item.name}, value: {props.item.value}
  </p>
)

Component.displayName = 'Item'

export default Component
