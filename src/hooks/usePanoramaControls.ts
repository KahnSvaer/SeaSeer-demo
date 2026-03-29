import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function usePanoramaControls(cameraRef: React.RefObject<THREE.PerspectiveCamera | null>) {
  const isDragging = useRef(false)
  const previousMouse = useRef({ x: 0, y: 0 })
  const spherical = useRef(new THREE.Spherical(1, Math.PI / 2, 0))
  const target = new THREE.Vector3()

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      previousMouse.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !cameraRef.current) return 

      const deltaX = e.clientX - previousMouse.current.x
      const deltaY = e.clientY - previousMouse.current.y

      spherical.current.theta -= deltaX * 0.005
      spherical.current.phi -= deltaY * 0.005

      spherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi))

      
      target.setFromSpherical(spherical.current)
      cameraRef.current.lookAt(target)
      previousMouse.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])
}