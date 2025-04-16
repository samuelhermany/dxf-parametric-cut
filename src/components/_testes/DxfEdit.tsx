export function DxfEdit() {
  lerDxf()
}

async function lerDxf() {
  try {
    const response = await fetch('/fileRectangle.dxf') // Sem 'public/' na URL
    if (!response.ok) throw new Error('Erro ao buscar o arquivo')

    const texto = await response.text()
    console.log('Conteúdo do DXF:', texto)

    // Aqui você pode processar o conteúdo como quiser
  } catch (erro) {
    console.error('Erro na leitura do DXF:', erro)
  }
}
