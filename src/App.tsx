import { useState } from 'react'
import PanoramaViewer from './PanoramaViewer'
import PanoramaNav from './PanoramaNav'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <>
      <PanoramaViewer currentIndex={currentIndex} />
      <PanoramaNav currentIndex={currentIndex} onSelect={setCurrentIndex} />
    </>
  )
}