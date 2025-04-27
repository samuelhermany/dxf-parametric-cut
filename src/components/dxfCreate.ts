import Drawing from 'dxf-writer'
import { DxfWriter, point3d } from '@tarikjabiri/dxf'

interface Props {
  model: string // Tipo de arquivo
  [key: string]: string
}

export function dXFCreate({ model, ...props }: Props): void {
  const { valueA, valueB, valueC, valueD } = props
  // Cria as versões em número apenas se existirem
  const floatA = valueA ? parseFloat(valueA.replace(',', '.')) : undefined
  const floatB = valueB ? parseFloat(valueB.replace(',', '.')) : undefined
  const floatC = valueC ? parseFloat(valueC.replace(',', '.')) : undefined
  const floatD = valueD ? parseFloat(valueD.replace(',', '.')) : undefined

  let fileType = 'arquivo_modificado'
  fileType = model

  // Serve para todos os aquivos, exceto elipse
  let draw: Drawing | null = null
  let dxfWriter: DxfWriter | null = null // Serve para elipse

  if (fileType !== 'ellipse') {
    draw = new Drawing()
    draw.setUnits('Millimeters')
  } else {
    dxfWriter = new DxfWriter()
    dxfWriter.setUnits(4) // 4 = Millimeters
  }

  switch (fileType) {
    case 'rectangle':
      if (draw && floatA !== undefined && floatB !== undefined) {
        createRectangle(draw, floatA, floatB)
      }
      break
    case 'circle':
      if (draw && floatA !== undefined) {
        createCircle(draw, floatA)
      }
      break
    case 'washer':
      if (draw && floatA !== undefined && floatB !== undefined) {
        createWasher(draw, floatA, floatB)
      }
      break
    case 'trapezoid_4l':
      if (draw && floatA !== undefined && floatB !== undefined && floatC !== undefined) {
        createTrapezoid_4l(draw, floatA, floatB, floatC)
      }
      break
    case 'flange':
      if (draw && floatA !== undefined && floatB !== undefined && floatC !== undefined && floatD !== undefined) {
        createFlange(draw, floatA, floatB, floatC, floatD)
      }
      break
    case 'trapezoid_5l':
      if (draw && floatA !== undefined && floatB !== undefined && floatC !== undefined && floatD !== undefined) {
        createTrapezoid_5l(draw, floatA, floatB, floatC, floatD)
      }
      break
    case 'ellipse':
      if (dxfWriter && floatA !== undefined && floatB !== undefined) {
        createEllipse(dxfWriter, floatA, floatB)
      }
      break
  }

  // Verifica se o tipo for nulo será paasado com undefinded
  salvarArquivo(fileType, draw ?? undefined, dxfWriter ?? undefined)
}

/**
 * Salva o arquivo, 2 primeiros parametros (sempre só um é passado)
 */
function salvarArquivo(fileType: string, draw?: Drawing, dxfWriter?: DxfWriter) {
  // Para todos os tipos "toDxfString()" | para elipse "stringify()"
  const content = draw ? draw!.toDxfString() : dxfWriter!.stringify()

  const blob = new Blob([content], { type: 'application/dxf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileType + '.dxf'
  link.click()

  // Limpa a memória
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 100) // espera 100ms antes de revogar
}

/**
 * Cria um retangulo
 */
const createRectangle = (draw: Drawing, valueA: number, valueB: number) => {
  // drawLine(x1, y1, x2, y2): Drawing;
  draw.drawLine(0, 0, valueA, 0)
  draw.drawLine(valueA, 0, valueA, valueB)
  draw.drawLine(valueA, valueB, 0, valueB)
  draw.drawLine(0, valueB, 0, 0)
}

/**
 * Cria um círculo
 */
const createCircle = (draw: Drawing, valueA: number, x: number = 0, y: number = 0) => {
  // drawCircle(x, y, radius): Drawing;
  draw.drawCircle(x, y, valueA / 2)
}

/**
 * Cria uma arruela
 */
const createWasher = (draw: Drawing, valueA: number, valueB: number) => {
  // raio Externo valuA, raio Interno valueB
  createCircle(draw, valueA)
  createCircle(draw, valueB)
}

/**
 * Cria um trapézio de 4 lados
 */
function createTrapezoid_4l(draw: Drawing, valueA: number, valueB: number, valueC: number) {
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
function createFlange(draw: Drawing, valueA: number, valueB: number, valueC: number, valueD: number) {
  // A=Diâmetro Externo | B=Diâmetro Médio | C=Diâmetro Interno | D=Diâmetro Furação
  createCircle(draw, valueA)
  createCircle(draw, valueC)

  const diametroMedio = parseFloat(valueB.replace(',', '.'))
  // Furação = Superior | Direita | Inferior | Esquerda
  createCircle(draw, valueD, 0, diametroMedio / 2)
  createCircle(draw, valueD, diametroMedio / 2, 0)
  createCircle(draw, valueD, 0, -diametroMedio / 2)
  createCircle(draw, valueD, -diametroMedio / 2, 0)
}

/**
 * Cria um trapézio de 5 lados
 */
function createTrapezoid_5l(draw: Drawing, valueA: number, valueB: number, valueC: number, valueD: number) {
  const larguraBase = parseFloat(valueA.replace(',', '.'))
  const alturaTotal = parseFloat(valueB.replace(',', '.'))
  const larguraTopo = parseFloat(valueC.replace(',', '.'))
  const alturaParcial = parseFloat(valueD.replace(',', '.'))
  //   E---D
  //  /     \
  // F       C
  // |       |
  // A-------B
  draw.drawLine(-larguraBase / 2, 0, larguraBase / 2, 0) //A - B = Largura Base
  draw.drawLine(larguraBase / 2, 0, larguraBase / 2, alturaParcial) // B - C = Aresta Altura Parcial
  draw.drawLine(larguraBase / 2, alturaParcial, larguraTopo / 2, alturaTotal) // C - D = Aresta Altura Total
  draw.drawLine(larguraTopo / 2, alturaTotal, -larguraTopo / 2, alturaTotal) // D - E = Largura Superior
  draw.drawLine(-larguraTopo / 2, alturaTotal, -larguraBase / 2, alturaParcial) // C - D = Aresta Altura Total
  draw.drawLine(-larguraBase / 2, alturaParcial, -larguraBase / 2, 0) // D - A = Aresta Altura Total
}

/**
 * Ciar uma Elipse
 */
function createEllipse(dxfWriter: DxfWriter, valueA: number, valueB: number) {
  // Calcula centro e semi-eixos em X | Y
  const halfWidth = parseFloat(valueA.replace(',', '.')) / 2
  const halfHeight = parseFloat(valueB.replace(',', '.')) / 2

  // addEllipse(center, majorAxisEnd, axisRatio, startParam, endParam)
  dxfWriter.addEllipse(
    point3d(halfWidth, halfHeight, 0),
    point3d(halfWidth, 0, 0), // Vetor do fim do eixo maior (relativo ao centro)
    halfHeight / halfWidth, // razão (axisRatio) = ry / rx
    0, // startParam (0 rad)
    2 * Math.PI // endParam (2π rad = volta completa)
  )
}
