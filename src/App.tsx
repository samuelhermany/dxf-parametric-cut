import { Dimension } from './components/dimension'
import { Home } from './components/home'

import './global.css'

const items = [
  { model: 'circle', isActive: false },
  { model: 'flange', isActive: true },
  { model: 'octagon', isActive: true },
  { model: 'square', isActive: false },
  { model: 'trapezoid_4l', isActive: true },
  { model: 'trapezoid_5l', isActive: true },
  { model: 'washer_square', isActive: true },
  { model: 'whasher', isActive: false },
]
export function App() {
  return <Dimension />
  // return <Home isActiveItems={items} />
}
