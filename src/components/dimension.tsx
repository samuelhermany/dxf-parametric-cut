import React, { useState, ChangeEvent } from 'react'
import { CaretCircleLeft } from 'phosphor-react'
import imgDimensions from '../img/dimensions.png'

import styles from './dimension.module.css'

export function Dimension() {
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  function handlePreviewsPage() {
    console.log('click handlePreviewsPage')
  }
  function handleClear() {
    console.log('click handleClear')
  }

  function handleSaveDXF() {
    console.log('click handleSaveDXF')
  }

  const handleInputChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setValueA(event.target.value)
  }

  const handleInputChangeB = (event: ChangeEvent<HTMLInputElement>) => {
    setValueB(event.target.value)
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
              onChange={handleInputChangeA}
              required
              type="text"
              title="dimensions A"
            />
          </div>
          <div>
            <p>B</p>
            <input
              onChange={handleInputChangeB}
              type="text"
              title="dimensions B"
            />
          </div>
          <footer className={styles.buttons}>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSaveDXF}>Save DXF</button>
          </footer>
        </form>
      </main>
    </div>
  )
}
