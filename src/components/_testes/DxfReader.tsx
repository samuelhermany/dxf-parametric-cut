import React, { useEffect, useState } from 'react'
import DxfParser from 'dxf-parser'

export function DxfReader() {
  const [entities, setEntities] = useState([])

  const modifyLineLength = (line, newLength) => {
    const dx = line.vertices[0].x - line.vertices[1].x
    const dy = line.vertices[0].y - line.vertices[1].y
    const length = Math.sqrt(dx * dx + dy * dy)

    const dirX = dx / length
    const dirY = dy / length

    return {
      ...line,
      end: {
        x: line.vertices[0].x + dirX * newLength,
        y: line.vertices[0].y + dirY * newLength,
      },
    }
  }

  function modificarLinhas(lines) {
    lines[0] = modifyLineLength(lines[0], 150) // nova medida da 1ª linha
    lines[2] = modifyLineLength(lines[2], 75) // nova medida da 3ª linha
  }

  useEffect(() => {
    const loadDxf = async () => {
      try {
        const response = await fetch('/fileRectangle.dxf')
        const dxfText = await response.text()

        const parser = new DxfParser()
        const dxf = parser.parseSync(dxfText)

        const lines = dxf.entities.filter(e => e.type === 'LINE')
        const arcs = dxf.entities.filter(e => e.type === 'ARC')
        const circles = dxf.entities.filter(e => e.type === 'CIRCLE')

        console.log({ lines })
        console.log({ arcs })
        console.log({ circles })

        modificarLinhas(lines)
        console.log('Linhas modificadas:', lines)

        setEntities([...lines, ...arcs, ...circles])
      } catch (error) {
        console.error('Erro ao carregar o DXF:', error)
      }
    }

    loadDxf()
  }, [])

  return (
    <div>
      <h2>Segmentos do DXF:</h2>
      <pre>{JSON.stringify(entities, null, 2)}</pre>
    </div>
  )
}
