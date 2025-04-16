import Drawing from 'dxf-writer'

interface Props {
  fileType: string // Tipo de arquivo
  [key: string]: string
}

export function DXFCreate({ fileType, ...props }: Props): void {
  const { valueA, valueB } = props

  const draw = new Drawing()
  draw.setUnits('Millimeters')
  let nameFile = 'arquivo_modificado'

  switch (fileType) {
    case 'rectangle':
      CreateRectangle(draw, valueA, valueB)
      nameFile = 'retangulo'
      break
    case 'circle':
      CreateCircle(draw, valueA)
      nameFile = 'circulo'
      break
    case 'washer':
      CreateWasher(draw, valueA, valueB)
      nameFile = 'arruela'
      break
    case 'washerSquare':
      CreateWasherSquare(draw, valueA, valueB)
      nameFile = 'arruela_quadrada'
      break
  }

  const blob = new Blob([draw.toDxfString()], { type: 'application/dxf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = nameFile + '.dxf'
  link.click()
}

/**
 * Cria um círculo
 */
const CreateCircle = (draw: Drawing, valueA: string) => {
  const raio = parseFloat(valueA.replace(',', '.'))
  // drawCircle(x, y, radius): Drawing;
  draw.drawCircle(0, 0, raio)
}

/**
 * Cria um retangulo
 */
const CreateRectangle = (draw: Drawing, valueA: string, valueB: string) => {
  const comprimento = parseFloat(valueB.replace(',', '.'))
  const largura = parseFloat(valueA.replace(',', '.'))

  // drawLine(x1, y1, x2, y2): Drawing;
  draw.drawLine(0, 0, largura, 0)
  draw.drawLine(largura, 0, largura, comprimento)
  draw.drawLine(largura, comprimento, 0, comprimento)
  draw.drawLine(0, comprimento, 0, 0)
}

/**
 * Cria uma arruela
 */
const CreateWasher = (draw: Drawing, valueA: string, valueB: string) => {
  // raio Externo valuA, raio Interno valueB
  CreateCircle(draw, valueA)
  CreateCircle(draw, valueB)
}

/**
 * Cria uma arruela quadrada
 */
const CreateWasherSquare = (draw: Drawing, valueA: string, valueB: string) => {
  CreateRectangle(draw, valueA, valueA)
  CreateCircle(draw, valueB)
}
