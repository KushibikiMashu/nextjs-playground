import React from 'react'

export type Props = {
  item: { name: 'apple'; value: number }
}

export const Component: React.FC<Props> = (props) => (
  <p>
    name: {props.item.name}, value: {props.item.value}
  </p>
)

Component.displayName = 'Item'

export default Component
