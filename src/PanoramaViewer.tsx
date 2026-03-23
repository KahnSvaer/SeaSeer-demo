import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { usePanoramaControls } from './hooks/usePanoramaControls'
import { PANORAMAS } from './constants/panoramas'

export default function PanoramaViewer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)

  usePanoramaControls(camera)

  useEffect(() => {
    const mount = mountRef.current

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.set(0,0,0)
    setCamera(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(10, 64, 64)
    const texture = new THREE.TextureLoader().load(PANORAMAS[2].path)
    const material = new THREE.MeshBasicMaterial({ 
      map: texture,
      side: THREE.BackSide 
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}