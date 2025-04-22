import React, { useState } from 'react'
import { DXFCreate } from '../../components/dxfCreate'

import img from '../../assets/img/washer.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Imagem } from '../../components/Imagem'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export function Washer() {
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  function handleClear() {
    setValueA('')
    setValueB('')
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    if (valueA !== '' && valueB !== '') {
      DXFCreate({ fileType: 'washer', valueA, valueB })
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
          <Input label="ØB" title="Diâmetro Interno" value={valueB} setValue={setValueB} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
