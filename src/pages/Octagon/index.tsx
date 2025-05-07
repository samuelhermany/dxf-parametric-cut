import { useState } from 'react'
import { dXFCreate } from '../../components/dxfCreate'
import { handleClearValues, allValuesFilled } from '../../utils/formUtils'

import img from '../../assets/img/octagon.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Imagem } from '../../components/Imagem'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { NavLink, useLocation } from 'react-router-dom'
import { CaretCircleLeft } from 'phosphor-react'

export function Octagon() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')

  const handleClear = () => {
    handleClearValues([setValueA])
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    if (allValuesFilled(valueA)) {
      dXFCreate({ model, valueA })
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
          {/* Passa o Value e o State para o componente Input */}
          <Input label="A" title="Largura" value={valueA} setValue={setValueA} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
