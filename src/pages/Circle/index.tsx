import { useState } from 'react'
import { DXFCreate } from '../../components/dxfCreate'

import img from '../../assets/img/circle.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Imagem } from '../../components/Imagem'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useLocation } from 'react-router-dom'

export function Circle() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')

  function handleClear() {
    setValueA('')
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    if (valueA !== '') {
      DXFCreate({ fileType: model, valueA })
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.dimensions}>
          <Imagem imgSrc={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          {/* Passa o Value e o State para o componente Input */}
          <Input label="ØA" title="Diâmetro" value={valueA} setValue={setValueA} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
