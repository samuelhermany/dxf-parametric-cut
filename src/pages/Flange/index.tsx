import React, { useState } from 'react'
import { DXFCreate } from '../../components/dxfCreate'

import img from '../../assets/img/flange.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Imagem } from '../../components/Imagem'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useLocation } from 'react-router-dom'

export function Flange() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')
  const [valueC, setValueC] = useState('')
  const [valueD, setValueD] = useState('')

  function handleClear() {
    setValueA('')
    setValueB('')
    setValueC('')
    setValueD('')
  }

  // Verifica se todos os valores foram preenchidos
  function allValuesFilled(...values: string[]) {
    return values.every(value => value.trim() !== '')
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    if (allValuesFilled(valueA, valueB, valueC, valueD)) {
      DXFCreate({ fileType: model, valueA, valueB, valueC, valueD })
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.dimensions}>
          <Imagem imgSrc={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <Input label="ØA" title="Diâmetro Externo" value={valueA} setValue={setValueA} />
          <Input label="ØB" title="Diâmetro Médio" value={valueB} setValue={setValueB} />
          <Input label="ØC" title="Diâmetro Interno" value={valueC} setValue={setValueC} />
          <Input label="ØD" title="Diâmetro Furação" value={valueD} setValue={setValueD} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
