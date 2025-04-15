import { useState, ChangeEvent, FormEvent } from 'react'
import { CaretCircleLeft } from 'phosphor-react'
import imgDimensions from '../img/dimensions.png'

import styles from './dimension.module.css'
import { CreateDXF } from './createDXF'

export function Dimension() {
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  function handlePreviewsPage() {
    console.log('click handlePreviewsPage')
  }
  function handleClear() {
    setValueA('')
    setValueB('')
  }

  const handleInputChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setValueA(event.target.value)
  }

  const handleInputChangeB = (event: ChangeEvent<HTMLInputElement>) => {
    setValueB(event.target.value)
  }

  // Valida números, e apensas um ponto ou vírgula
  function handleInputInvalid(
    event: FormEvent<HTMLInputElement> & { data: string }
  ) {
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

  return (
    <div className={styles.container}>
      <CaretCircleLeft weight="fill" onClick={handlePreviewsPage} />
      <main>
        <div className={styles.dimensions}>
          <img src={imgDimensions} alt="dimensions" />
        </div>
        <form className={styles.inputs}>
          <div>
            <p>A</p>
            <input
              type="text"
              name="dimensions A"
              title="dimensions A"
              placeholder="Digite um valor"
              onInput={handleInputChangeA}
              onBeforeInput={handleInputInvalid}
              value={valueA}
              required
            />
          </div>
          <div>
            <p>B</p>
            <input
              type="text"
              title="dimensions B"
              placeholder="Digite um valor"
              onInput={handleInputChangeB}
              onBeforeInput={handleInputInvalid}
              value={valueB}
              required
            />
          </div>
          <footer className={styles.buttons}>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" onClick={() => CreateDXF({ valueA, valueB })}>
              Save DXF
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}
