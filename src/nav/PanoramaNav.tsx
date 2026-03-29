import { PANORAMAS } from '../constants/panoramas'
import styles from './PanoramaNav.module.css'

interface Props {
  currentIndex: number
  onSelect: (index: number) => void
}

export default function PanoramaNav({ currentIndex, onSelect }: Props) {
  return (
    <div className={styles.nav}>
      {PANORAMAS.map((panorama, index) => (
        <button
          key={panorama.id}
          onClick={() => onSelect(index)}
          aria-label={`View ${panorama.name}`}
          aria-current={currentIndex === index ? 'true' : undefined}
          data-testid={`panorama-btn-${index}`}
          className={`${styles.button} ${currentIndex === index ? styles.buttonActive : ''}`}
        >
          {panorama.name}
        </button>
      ))}
    </div>
  )
}