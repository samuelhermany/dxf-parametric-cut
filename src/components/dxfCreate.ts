import Drawing from 'dxf-writer'

interface Props {
  model: string // Tipo de arquivo
  [key: string]: string
}

export function dXFCreate({ model, ...props }: Props): void {
  const { valueA, valueB, valueC, valueD } = props

  const draw = new Drawing()
  draw.setUnits('Millimeters')
  let fileType = 'arquivo_modificado'
  fileType = model

  switch (fileType) {
    case 'rectangle':
      createRectangle(draw, valueA, valueB)
      break
    case 'circle':
      createCircle(draw, valueA)
      break
    case 'washer':
      createWasher(draw, valueA, valueB)
      break
    case 'trapezoid_4l':
      createTrapezoid_4l(draw, valueA, valueB, valueC)
      break
    case 'flange':
      createFlange(draw, valueA, valueB, valueC, valueD)
      break
    case 'trapezoid_5l':
      createTrapezoid_5l(draw, valueA, valueB, valueC, valueD)
      break
    case 'washerSquare':
      createWasherSquare(draw, valueA, valueB)
      break
  }

  const blob = new Blob([draw.toDxfString()], { type: 'application/dxf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileType + '.dxf'
  link.click()
}

/**
 * Cria um retangulo
 */
const createRectangle = (draw: Drawing, valueA: string, valueB: string) => {
  const altura = parseFloat(valueB.replace(',', '.'))
  const largura = parseFloat(valueA.replace(',', '.'))

  // drawLine(x1, y1, x2, y2): Drawing;
  draw.drawLine(0, 0, largura, 0)
  draw.drawLine(largura, 0, largura, altura)
  draw.drawLine(largura, altura, 0, altura)
  draw.drawLine(0, altura, 0, 0)
}

/**
 * Cria um círculo
 */
const createCircle = (draw: Drawing, valueA: string) => {
  const raio = parseFloat(valueA.replace(',', '.'))
  // drawCircle(x, y, radius): Drawing;
  draw.drawCircle(0, 0, raio)
}

/**
 * Cria uma arruela
 */
const createWasher = (draw: Drawing, valueA: string, valueB: string) => {
  // raio Externo valuA, raio Interno valueB
  createCircle(draw, valueA)
  createCircle(draw, valueB)
}

/**
 * Cria um trapézio de 4 lados
 */
function createTrapezoid_4l(draw: Drawing, valueA: string, valueB: string, valueC: string) {
  const larguraBase = parseFloat(valueA.replace(',', '.'))
  const altura = parseFloat(valueB.replace(',', '.'))
  const larguraTopo = parseFloat(valueC.replace(',', '.'))
  //   D---C
  //  /     \
  // A-------B
  draw.drawLine(-larguraBase / 2, 0, larguraBase / 2, 0) //A - B = Largura Base
  draw.drawLine(larguraBase / 2, 0, larguraTopo / 2, altura) // B - C = Aresta Altura
  draw.drawLine(larguraTopo / 2, altura, -larguraTopo / 2, altura) // C - D = Largura Superior
  draw.drawLine(-larguraTopo / 2, altura, -larguraBase / 2, 0) // D - A = Aresta Altura
}

/**
 * Cria um flange com 4 lados iguais
 */
function createFlange(draw: Drawing, valueA: string, valueB: string, valueC: string, valueD: string) {
  throw new Error('Function not implemented.')
}

/**
 * Cria um trapézio de 5 lados
 */
function createTrapezoid_5l(draw: Drawing, valueA: string, valueB: string, valueC: string, valueD: string) {
  throw new Error('Function not implemented.')
}

/**
 * Cria uma arruela quadrada
 */
const createWasherSquare = (draw: Drawing, valueA: string, valueB: string) => {
  createRectangle(draw, valueA, valueA)
  createCircle(draw, valueB)
}
