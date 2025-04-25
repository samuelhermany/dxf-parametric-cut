import { LockSimple } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import imgSquare from '../../assets/img/rectangle.svg'
import imgCircle from '../../assets/img/circle.svg'
import imgWasher from '../../assets/img/washer.svg'
import imgTrapezoid_4l from '../../assets/img/trapezoid_4l.svg'
import imgFlange from '../../assets/img/flange.svg'
import imgTrapezoid_5l from '../../assets/img/trapezoid_5l.svg'
import imgEllipse from '../../assets/img/ellipse.svg'
import imgArc1 from '../../assets/img/arc1.svg'
import imgArc2 from '../../assets/img/arc2.svg'
import imgOctagon from '../../assets/img/octagon.svg'
import imgRectangleRound from '../../assets/img/rectangleRound.svg'
import imgCrossRound from '../../assets/img/crossRound.svg'
import imgEar from '../../assets/img/ear.svg'
import imgEarHole from '../../assets/img/earHole.svg'
import imgEarConcave from '../../assets/img/earConcave.svg'
import imgCross from '../../assets/img/cross.svg'
import imgRectangleArc from '../../assets/img/rectangleArc.svg'
import imgClip from '../../assets/img/clip.svg'
import imgWasherSquare from '../../assets/img/washer_square.svg'

import styles from './Home.module.css'

const items = [
  { id: 0, model: 'rectangle', title: 'retangulo', isActive: false, img: imgSquare },
  { id: 1, model: 'circle', title: 'circulo', isActive: false, img: imgCircle },
  { id: 2, model: 'washer', title: 'arruela', isActive: false, img: imgWasher },

  { id: 3, model: 'trapezoid_4l', title: 'trapezio 4l', isActive: false, img: imgTrapezoid_4l },
  { id: 4, model: 'flange', title: 'flange', isActive: true, img: imgFlange },
  { id: 5, model: 'trapezoid_5l', title: 'trapezio 5l', isActive: true, img: imgTrapezoid_5l },
  { id: 6, model: 'ellipse', title: 'elipse', isActive: true, img: imgEllipse },
  { id: 7, model: 'arc1', title: 'arco1', isActive: true, img: imgArc1 },
  { id: 8, model: 'arc2', title: 'arco2', isActive: true, img: imgArc2 },

  { id: 9, model: 'octagon', title: 'octagon', isActive: true, img: imgOctagon },
  { id: 10, model: 'rectangle_round', title: 'retangulo arredondado', isActive: true, img: imgRectangleRound },
  { id: 11, model: 'cross_round', title: 'cruz arredondada', isActive: true, img: imgCrossRound },
  { id: 12, model: 'ear', title: 'orelha', isActive: true, img: imgEar },
  { id: 13, model: 'ear_hole', title: 'orelha furada', isActive: true, img: imgEarHole },
  { id: 14, model: 'ear_concave', title: 'orelha concava', isActive: true, img: imgEarConcave },
  { id: 15, model: 'cross', title: 'cruz', isActive: true, img: imgCross },
  { id: 16, model: 'rectangle_arc', title: 'retanguloComArco', isActive: true, img: imgRectangleArc },
  { id: 17, model: 'clip', title: 'presilha', isActive: true, img: imgClip },
  { id: 18, model: 'washer_square', title: 'arruela quadrada', isActive: true, img: imgWasherSquare },
]

export function Home() {
  // Function to check if the ite*-s active (without the lock icon)
  const isActivate = (model: string) => items.find(item => item.model === model)?.isActive

  return (
    <main className={styles.homeContainer}>
      <header className={styles.cabecalho}>
        <h1>Export DXF</h1>
      </header>
      <div className={styles.models}>
        {items.map(item => (
          <NavLink key={item.id} to={`/${item.model}`} state={{ model: item.model }}>
            <div className={styles.modelType}>
              {/* Se o item estiver ativo, mostra o icone lock */}
              {isActivate(item.model) && <LockSimple />}
              <img src={item.img} alt={item.title} />
            </div>
          </NavLink>
        ))}
      </div>
    </main>
  )
}
