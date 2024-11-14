import { useEffect, useRef } from 'react'

export default function useClickOutside(callback?: () => void) {
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        callback?.()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [callback])

  return {
    nodeRef,
  }
}
