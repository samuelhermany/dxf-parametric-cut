import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts'

import { Home } from '../pages/Home'
import { Rectangle } from '../pages/Rectangle'
import { Circle } from '../pages/Circle'
import { Washer } from '../pages/Washer'
import { Trapezoid_4l } from '../pages/Trapezoid_4l'
import { Flange } from '../pages/Flange'
import { Trapezoid_5l } from '../pages/Trapezoid_5l'
import { Ellipse } from '../pages/Elipse'
import { Arc1 } from '../pages/Arc1'
import { Arc2 } from '../pages/Arc2'
import { Octagon } from '../pages/Octagon'
import { RectangleRound } from '../pages/RectangleRound'
import { CrossRound } from '../pages/CrossRound'
import { Ear } from '../pages/Ear'
import { EarHole } from '../pages/EarHole'
import { EarConcave } from '../pages/EarConcave'
import { Cross } from '../pages/Cross'
import { RectangleArc } from '../pages/RectangleArc'
import { Clip } from '../pages/Clip'
import { WasherSquare } from '../pages/WasherSquare'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/rectangle" element={<Rectangle />} />
        <Route path="/circle" element={<Circle />} />
        <Route path="/washer" element={<Washer />} />

        <Route path="/trapezoid_4l" element={<Trapezoid_4l />} />
        <Route path="/flange" element={<Flange />} />
        <Route path="/trapezoid_5l" element={<Trapezoid_5l />} />

        <Route path="/ellipse" element={<Ellipse />} />
        <Route path="/arc1" element={<Arc1 />} />
        <Route path="/arc2" element={<Arc2 />} />

        <Route path="/octagon" element={<Octagon />} />
        <Route path="/rectangle_round" element={<RectangleRound />} />
        <Route path="/cross_round" element={<CrossRound />} />

        <Route path="/ear" element={<Ear />} />
        <Route path="/ear_hole" element={<EarHole />} />
        <Route path="/ear_concave" element={<EarConcave />} />

        <Route path="/cross" element={<Cross />} />
        <Route path="/rectangle_arc" element={<RectangleArc />} />
        <Route path="/clip" element={<Clip />} />
        <Route path="/washer_square" element={<WasherSquare />} />
      </Route>
    </Routes>
  )
}
