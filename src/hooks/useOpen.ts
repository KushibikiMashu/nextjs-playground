import { useCallback } from 'react'
import { useToggle } from 'react-use'

export default function useOpen(initialState = false) {
  const [isOpen, toggle] = useToggle(initialState)
  const handleOpen = useCallback(() => toggle(true), [])
  const handleClose = useCallback(() => toggle(false), [])

  return { isOpen, handleOpen, handleClose }
}
