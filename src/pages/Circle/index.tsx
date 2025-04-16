import { useState, ChangeEvent, FormEvent } from 'react'
import { DXFCreate } from '../../components/dxfCreate'

import img from '../../img/circle.png'

import styles from '../Rectangle/Rectangle.module.css'

export function Circle() {
  const [valueA, setValueA] = useState('')

  function handleClear() {
    setValueA('')
  }

  const handleInputChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setValueA(event.target.value)
  }

  // Valida números, e apensas um ponto ou vírgula
  function handleInputInvalid(event: FormEvent<HTMLInputElement> & { data: string }) {
    const input = event.currentTarget
    const currentValue = input.value
    const newChar = event.data

    if (!newChar) return

    // Valida mais de um vírgula
    const cursorPos = input.selectionStart ?? currentValue.length
    const finalValue =
      currentValue.slice(0, cursorPos) + newChar + currentValue.slice(cursorPos)

    // Só permite números, ponto ou vírgula
    if (!/^\d*([,]\d*)?$/.test(finalValue)) {
      event.preventDefault()
    }
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    if (valueA !== '') {
      DXFCreate({ fileType: 'circle', valueA })
    }
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.dimensions}>
          <img src={img} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <div>
            <p>D</p>
            <input
              type="text"
              name="dimensions A"
              title="Diâmetro"
              placeholder="Digite um valor"
              onInput={handleInputChangeA}
              onBeforeInput={handleInputInvalid}
              value={valueA}
              required
            />
          </div>
          <footer className={styles.buttons}>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" onClick={handleCreateDXF}>
              Save DXF
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}
