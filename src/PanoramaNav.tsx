import { PANORAMAS } from './constants/panoramas'

interface Props {
  currentIndex: number
  onSelect: (index: number) => void
}

export default function PanoramaNav({ currentIndex, onSelect }: Props) {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 10 }}>
      {PANORAMAS.map((panorama, index) => (
        <button
          key={panorama.id}
          onClick={() => onSelect(index)}
          style={{
            padding: '8px 16px',
            background: currentIndex === index ? 'white' : 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentIndex === index ? 'bold' : 'normal',
          }}
        >
          {panorama.name}
        </button>
      ))}
    </div>
  )
}