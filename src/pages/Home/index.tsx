import imgCircle from '../../img/circle.svg'
import imgFlange from '../../img/flange.svg'
import imgOctagon from '../../img/octagon.svg'
import imgSquare from '../../img/rectangle.svg'
import imgTrapezoid_4l from '../../img/trapezoid_4l.svg'
import imgTrapezoid_5l from '../../img/trapezoid_5l.svg'
import imgWasherSquare from '../../img/washer_square.svg'
import imgWasher from '../../img/washer.svg'
import { LockSimple } from 'phosphor-react'

import styles from './Home.module.css'
import { NavLink } from 'react-router-dom'

const items = [
  { model: 'circle', isActive: false },
  { model: 'flange', isActive: true },
  { model: 'octagon', isActive: true },
  { model: 'rectangle', isActive: false },
  { model: 'trapezoid_4l', isActive: true },
  { model: 'trapezoid_5l', isActive: true },
  { model: 'washer_square', isActive: true },
  { model: 'whasher', isActive: false },
]

export function Home() {
  // Function to check if the item is active (without the lock icon)
  const isActivate = (model: string) => items.find(item => item.model === model)?.isActive

  return (
    <main className={styles.homeContainer}>
      <header className={styles.cabecalho}>
        <h1>Export DXF</h1>
      </header>
      <div className={styles.models}>
        <NavLink to="/rectangle" title="retangulo">
          <div className={styles.modelType}>
            {isActivate('rectangle') && <LockSimple />}
            <img src={imgSquare} alt="rectangle" />
          </div>
        </NavLink>
        <NavLink to="/circle" title="circulo">
          <div className={styles.modelType}>
            {isActivate('circle') && <LockSimple />}
            <img src={imgCircle} alt="circle" />
          </div>
        </NavLink>
        <NavLink to="/washer" title="arruela">
          <div className={styles.modelType}>
            {isActivate('whasher') && <LockSimple />}
            <img src={imgWasher} alt="washer" />
          </div>
        </NavLink>

        <NavLink to="/trapezoid_4l" title="Trapézio 4 lados">
          <div className={styles.modelType}>
            {isActivate('trapezoid_4l') && <LockSimple />}
            <img src={imgTrapezoid_4l} alt="trapzoid_4l" />
          </div>
        </NavLink>
        <NavLink to="/flange" title="flange">
          <div className={styles.modelType}>
            {isActivate('flange') && <LockSimple />}
            <img src={imgFlange} alt="flange" />
          </div>
        </NavLink>
        <NavLink to="/trapezoid_5l" title="Trapézio 5 lados">
          <div className={styles.modelType}>
            {isActivate('trapezoid_5l') && <LockSimple />}
            <img src={imgTrapezoid_5l} alt="trapzoid_5l" />
          </div>
        </NavLink>
        <NavLink to="/octagon" title="Octagono">
          <div className={styles.modelType}>
            {isActivate('octagon') && <LockSimple />}
            <img src={imgOctagon} alt="octagon" />
          </div>
        </NavLink>
        <NavLink to="/washer_square" title="Arruela quadrada">
          <div className={styles.modelType}>
            {isActivate('washer_square') && <LockSimple />}
            <img src={imgWasherSquare} alt="washer_square" />
          </div>
        </NavLink>
      </div>
    </main>
  )
}
