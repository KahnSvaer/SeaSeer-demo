import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PanoramaViewer() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.set(0,0,0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(10, 64, 64)
    const material = new THREE.MeshNormalMaterial({ side: THREE.BackSide })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}