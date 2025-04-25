import { useState } from 'react'
import { dXFCreate } from '../../components/dxfCreate'
import { handleClearValues, allValuesFilled } from '../../utils/formUtils'

import img from '../../assets/img/trapezoid_5l.png'

import styles from '../Rectangle/Rectangle.module.css'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Imagem } from '../../components/Imagem'
import { useLocation } from 'react-router-dom'

export function Trapezoid_5l() {
  const location = useLocation()
  const model = location.state?.model

  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')
  const [valueC, setValueC] = useState('')
  const [valueD, setValueD] = useState('')

  const handleClear = () => {
    handleClearValues([setValueA, setValueB, setValueC, setValueD])
  }

  function handleCreateDXF(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()

    if (allValuesFilled(valueA, valueB, valueC, valueD)) {
      dXFCreate({ model, valueA, valueB, valueC, valueD })
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
          <Input label="A" title="Largura Base" value={valueA} setValue={setValueA} />
          <Input label="B" title="Altura Total" value={valueB} setValue={setValueB} />
          <Input label="C" title="Largura Topo" value={valueC} setValue={setValueC} />
          <Input label="D" title="Altura Parcial" value={valueD} setValue={setValueD} />
          <footer className={styles.buttons}>
            <Button type="button" text="Clear" onClick={handleClear} />
            <Button type="submit" text="Save DXF" onClick={handleCreateDXF} />
          </footer>
        </form>
      </main>
    </div>
  )
}
