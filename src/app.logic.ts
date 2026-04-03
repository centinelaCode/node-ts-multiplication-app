import fs from 'fs'
import { yarg } from './config/plugins/yargs.plugin'

// console.log(yarg)

const { b:base, l:limit, s:showTable } = yarg

// let base: number = yarg.b
// let limit = yarg.l
let content = ''
const headerContent = `
=============================
    Tabla del ${base}
=============================
`

content = headerContent + content
for (let i = 1; i < +limit + 1; i++) {
  content += `${base} x ${i} = ${base * i} \n`
}

const path = `outputs`

// si no existe el directorio lo creamos
fs.mkdirSync(path, { recursive: true })

// Escritura en el archivo
fs.writeFileSync(`${path}/tabla-${base}.txt`, content)

// console.log(yarg.s)

// mostrar en pantalla
if ( showTable === true) {
  console.log(content)
}
console.log('Fila create succesfull')
