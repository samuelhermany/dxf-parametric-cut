import imgCircle from '../img/circle.svg'
import imgFlange from '../img/flange.svg'
import imgOctagon from '../img/octagon.svg'
import imgSquare from '../img/square.svg'
import imgTrapezoid_4l from '../img/trapezoid_4l.svg'
import imgTrapezoid_5l from '../img/trapezoid_5l.svg'
import imgWasherSquare from '../img/washer_square.svg'
import imgWasher from '../img/washer.svg'
import { LockSimple } from 'phosphor-react'

import styles from './home.module.css'

interface Item {
  model: string
  isActive: boolean
}

interface HomeProps {
  isActiveItems: Item[]
}

export function Home({ isActiveItems }: HomeProps) {
  // Function to check if the item is active (without the lock icon)
  const isActivate = (model: string) =>
    isActiveItems.find(item => item.model === model)?.isActive

  return (
    <main className={styles.homeContainer}>
      <header className={styles.cabecalho}>
        <h1>Export DXF</h1>
      </header>
      <div className={styles.models}>
        <div className={styles.modelType}>
          {isActivate('square') && <LockSimple />}
          <img src={imgSquare} alt="quadrado" />
        </div>
        <div className={styles.modelType}>
          {isActivate('cricle') && <LockSimple />}
          <img src={imgCircle} alt="circle" />
        </div>
        <div className={styles.modelType}>
          {isActivate('whasher') && <LockSimple />}
          <img src={imgWasher} alt="washer" />
        </div>

        <div className={styles.modelType}>
          {isActivate('trapezoid_4l') && <LockSimple />}
          <img src={imgTrapezoid_4l} alt="trapzoid_4l" />
        </div>
        <div className={styles.modelType}>
          {isActivate('flange') && <LockSimple />}
          <img src={imgFlange} alt="flange" />
        </div>
        <div className={styles.modelType}>
          {isActivate('trapezoid_5l') && <LockSimple />}
          <img src={imgTrapezoid_5l} alt="trapzoid_5l" />
        </div>
        <div className={styles.modelType}>
          {isActivate('octagon') && <LockSimple />}
          <img src={imgOctagon} alt="octagon" />
        </div>
        <div className={styles.modelType}>
          {isActivate('washer_square') && <LockSimple />}
          <img src={imgWasherSquare} alt="washer_square" />
        </div>
      </div>
    </main>
  )
}
