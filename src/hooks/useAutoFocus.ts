import { useEffect, useRef } from 'react'

export default function useAutoFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    node.focus()
  }, [])

  return ref
}
