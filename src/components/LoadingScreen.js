'use client'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 2000) // 2 segundos de carga

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="loading-screen">
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
