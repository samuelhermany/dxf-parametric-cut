import React, { useState } from 'react'
import { dXFCreate } from '../../components/dxfCreate'
import { handleClearValues, allValuesFilled } from '../../utils/formUtils'

import img from '../../assets/img/arc2.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Imagem } from '../../components/Imagem'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useLocation } from 'react-router-dom'

export function Arc2() {
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
      <main>
        <div className={styles.dimensions}>
          <Imagem imgSrc={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <Input label="ØA" title="Diâmetro Externo" value={valueA} setValue={setValueA} />
          <Input label="ØB" title="Diâmetro Interno" value={valueB} setValue={setValueB} />
          <Input label="C°" title="Ângulo" value={valueC} setValue={setValueC} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
