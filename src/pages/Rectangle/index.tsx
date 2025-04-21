import { useState } from 'react'
import { DXFCreate } from '../../components/dxfCreate'

import img from '../../img/rectangle.png'

import styles from './Rectangle.module.css'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Imagem } from '../../components/Imagem'

export function Rectangle() {
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  function handleClear() {
    setValueA('')
    setValueB('')
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    if (valueA !== '' && valueB !== '') {
      DXFCreate({ fileType: 'rectangle', valueA, valueB })
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.dimensions}>
          <Imagem imgSrc={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <Input label="D1" title="Largura" value={valueA} setValue={setValueA} />
          <Input label="D2" title="Comprimento" value={valueB} setValue={setValueB} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
