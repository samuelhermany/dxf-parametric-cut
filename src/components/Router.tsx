import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts'

import { Home } from '../pages/Home'
import { Rectangle } from '../pages/Rectangle'
import { Circle } from '../pages/Circle'
import { Washer } from '../pages/Washer'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/rectangle" element={<Rectangle />} />
        <Route path="/circle" element={<Circle />} />
        <Route path="/washer" element={<Washer />} />
      </Route>
    </Routes>
  )
}
