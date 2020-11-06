import React, { memo } from 'react'
import { Props as ItemProps } from './Item'

type Props = ItemProps

export const Component: React.FC<Props> = (props) => (
  <p>
    name: {props.item.name}, value: {props.item.value}
  </p>
)

Component.displayName = 'MemoizedItem'

export default memo(Component)
