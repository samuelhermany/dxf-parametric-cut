import { useState } from 'react'
import { dXFCreate } from '../../components/dxfCreate'
import { handleClearValues, allValuesFilled } from '../../utils/formUtils'

import img from '../../assets/img/trapezoid_4l.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Imagem } from '../../components/Imagem'
import { NavLink, useLocation } from 'react-router-dom'
import { CaretCircleLeft } from 'phosphor-react'

export function Trapezoid_4l() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')
  const [valueC, setValueC] = useState('')

  const handleClear = () => {
    handleClearValues([setValueA, setValueB, setValueC])
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    if (allValuesFilled(valueA, valueB, valueC)) {
      dXFCreate({ model, valueA, valueB, valueC })
    }

    handleClear()
  }

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <NavLink to="/" title="Página Home">
          <CaretCircleLeft weight="fill" />
        </NavLink>
      </div>
      <main>
        <div className={styles.dimensions}>
          <Imagem imgSrc={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <Input label="A" title="Largura Base" value={valueA} setValue={setValueA} />
          <Input label="B" title="Altura" value={valueB} setValue={setValueB} />
          <Input label="C" title="Largura Topo" value={valueC} setValue={setValueC} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
