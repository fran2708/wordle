const fila1 = [1,2,3,4,5]
const fila2 = [1,2,3,4,5]
const fila3 = [1,2,3,4,5]
const fila4 = [1,2,3,4,5]
const fila5 = [1,2,3,4,5]
const fila6 = [1,2,3,4,5]
const filas = [fila1, fila2, fila3, fila4, fila5, fila6]

for (let xRow = 0; xRow < filas.length; xRow++) {
    console.log(filas[xRow])
    for (let yColumn = 0; yColumn < 6; yColumn++) {
        console.log(filas[xRow][yColumn])
    }
}