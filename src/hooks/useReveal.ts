import { useEffect, useRef, useState } from 'react'

export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          io.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return { ref, visible }
}
