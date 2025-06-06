import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Router'

import './global.css'

export function App() {
  return (
    <BrowserRouter basename="/dxf-parametric-cut">
      <Router />
    </BrowserRouter>
  )
}
