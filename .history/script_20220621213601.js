const fila1 = [1,2,3,4,5]
const fila2 = [1,2,3,4,5]
const fila3 = [1,2,3,4,5]
const fila4 = [1,2,3,4,5]
const fila5 = [1,2,3,4,5]
const fila6 = [1,2,3,4,5]
const filas = [fila1, fila2, fila3, fila4, fila5, fila6]

for (let index = 0; index < filas.length; index++) {
    console.log(filas[index])
    for (let y = 0; y < 6; y++) {
        console.log(fila+[index][y])
    }
}