import React from 'react'

type FrameProps = {
  scale: number
  children: React.ReactNode
  className?: string
}

export default function DisplayFrame({
  scale,
  children,
  className,
}: FrameProps) {
  return (
    <div className={`relative w-fit max-h-screen ${className ?? ''}`}>
      <div className={`origin-top `} style={{ scale: scale }}>
        {children}
      </div>
    </div>
  )
}
