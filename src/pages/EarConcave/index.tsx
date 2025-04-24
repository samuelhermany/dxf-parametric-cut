import { useState } from 'react'
import { DXFCreate } from '../../components/dxfCreate'

import img from '../../assets/img/earConcave.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Imagem } from '../../components/Imagem'
import { useLocation } from 'react-router-dom'

export function EarConcave() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  function handleClear() {
    setValueA('')
    setValueB('')
  }

  // Verifica se todos os valores foram preenchidos
  function allValuesFilled(...values: string[]) {
    return values.every(value => value.trim() !== '')
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    if (allValuesFilled(valueA, valueB)) {
      DXFCreate({ fileType: model, valueA, valueB })
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.dimensions}>
          <Imagem imgSrc={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <Input label="A" title="Largura" value={valueA} setValue={setValueA} />
          <Input label="B" title="Altura" value={valueB} setValue={setValueB} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
