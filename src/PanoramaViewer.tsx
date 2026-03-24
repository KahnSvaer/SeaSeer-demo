import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { usePanoramaControls } from './hooks/usePanoramaControls'
import { PANORAMAS } from './constants/panoramas'

interface Props {
  currentIndex: number
}

export default function PanoramaViewer({ currentIndex }: Props) {
  const mountRef = useRef<HTMLDivElement>((null!))
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null)

  usePanoramaControls(camera)

  useEffect(() => {
    const mount = mountRef.current

    const scene = new THREE.Scene()

    const cam = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    cam.position.set(0,0,0)
    setCamera(cam)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(10, 64, 64)
    const texture = new THREE.TextureLoader().load(PANORAMAS[0].path)
    const material = new THREE.MeshBasicMaterial({ 
      map: texture,
      side: THREE.BackSide 
    })
    materialRef.current = material

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      renderer.render(scene, cam)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (!materialRef.current) return
    const texture = new THREE.TextureLoader().load(PANORAMAS[currentIndex].path)
    materialRef.current.map = texture
    materialRef.current.needsUpdate = true
  }, [currentIndex])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}