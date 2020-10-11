import { Drawer } from '@material-ui/core'
import React from 'react'

type Props = {
  anchor: 'bottom' | 'right'
  color: string
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const Component: React.FC<Props> = (props) => (
  <>
    <button className={`mx-4 bg-${props.color}-500 text-white rounded-md p-4`} type="button" onClick={props.onOpen}>
      {props.anchor.toUpperCase()}
    </button>
    <Drawer anchor={props.anchor} open={props.open} onClose={props.onClose} variant="persistent">
      <div className="h-64 w-64 flex justify-center items-center flex-col">
        <span className="text-2xl">{props.anchor.toUpperCase()}</span>
        <button
          className={`my-4 bg-${props.color}-500 text-white rounded-md p-4`}
          type="button"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </Drawer>
  </>
)

Component.displayName = 'Drawer'

export default Component
