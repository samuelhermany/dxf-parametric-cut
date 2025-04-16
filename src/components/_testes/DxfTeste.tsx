// import Drawing from 'dxf-writer'
import { useEffect } from 'react'
import DxfParser from 'dxf-parser'

export function DxfTeste() {
  const gerarDxfBasico = lines => {
    let dxf = `0\nSECTION\n2\nENTITIES\n`

    lines.forEach(line => {
      const [start, end] = line.vertices
      dxf += `0\nLINE\n8\n0\n10\n${start.x}\n20\n${start.y}\n30\n0\n11\n${end.x}\n21\n${end.y}\n31\n0\n`
    })

    dxf += `0\nENDSEC\n0\nEOF\n`
    return dxf
  }

  const baixarDxf = (conteudo, nomeArquivo = 'arquivo_modificado.dxf') => {
    const blob = new Blob([conteudo], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = nomeArquivo
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const modifyLineLength = (line, newLength) => {
    // Cálculo do vetrto da linha
    const dx = line.vertices[0].x - line.vertices[1].x
    const dy = line.vertices[0].y - line.vertices[1].y
    // Comprimento da linha
    const length = Math.sqrt(dx * dx + dy * dy)
    // Transforma em vetro unitário para manter a direçã oda linha
    const dirX = dx / length
    const dirY = dy / length

    return {
      ...line,
      vertices: [
        line.vertices[0],
        {
          x: line.vertices[0].x + dirX * newLength,
          y: line.vertices[0].y + dirY * newLength,
        },
      ],
    }
  }

  useEffect(() => {
    const loadDxf = async () => {
      const response = await fetch('/fileRectangle.dxf')
      const dxfText = await response.text()

      const parser = new DxfParser()
      const dxf = parser.parseSync(dxfText)

      const lines = dxf.entities.filter(e => e.type === 'LINE')

      // Modificações
      if (lines.length >= 3) {
        lines[0] = modifyLineLength(lines[0], 500)
        lines[2] = modifyLineLength(lines[2], 500)
        lines[1] = modifyLineLength(lines[1], 75)
        lines[3] = modifyLineLength(lines[3], 75)
      }

      // Converter JSON -> DXF string
      const dxfOutput = gerarDxfBasico(lines) // <-- aqui vai sua função de exportação

      // Baixar o novo DXF
      baixarDxf(dxfOutput)
    }

    loadDxf()
  }, [])
}
