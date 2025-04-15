// App.jsx
import Drawing from 'dxf-writer'

interface Props {
  valueA: string // comprimento
  valueB: string // largura
}

// const mmToInch = (mm: number) => mm / 25.4

export function CreateDXF({ valueA, valueB }: Props): void {
  const comprimento = parseFloat(valueB.replace(',', '.'))
  const largura = parseFloat(valueA.replace(',', '.'))

  const draw = new Drawing()
  draw.setUnits('Millimeters')

  // Exemplo: retângulo
  // drawLine(x1, y1, x2, y2): Drawing;
  draw.drawLine(0, 0, largura, 0)
  draw.drawLine(largura, 0, largura, comprimento)
  draw.drawLine(largura, comprimento, 0, comprimento)
  draw.drawLine(0, comprimento, 0, 0)

  const blob = new Blob([draw.toDxfString()], { type: 'application/dxf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'desenho.dxf'
  link.click()
}
