import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'

import './global.css'

export function App() {
  return (
    <BrowserRouter basename="/dxf-parametric-cut">
      <Router />
    </BrowserRouter>
  )
}
