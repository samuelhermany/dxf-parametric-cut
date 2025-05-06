import React, { useState } from 'react'
import { dXFCreate } from '../../components/dxfCreate'
import { handleClearValues, allValuesFilled } from '../../utils/formUtils'

import img from '../../assets/img/arc1.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Imagem } from '../../components/Imagem'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { NavLink, useLocation } from 'react-router-dom'
import { CaretCircleLeft } from 'phosphor-react'

export function Arc1() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  const handleClear = () => {
    handleClearValues([setValueA, setValueB])
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    if (allValuesFilled(valueA, valueB)) {
      dXFCreate({ model, valueA, valueB })
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
          <Input label="ØA" title="Diâmetro" value={valueA} setValue={setValueA} />
          <Input label="B°" title="Ângulo" value={valueB} setValue={setValueB} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
