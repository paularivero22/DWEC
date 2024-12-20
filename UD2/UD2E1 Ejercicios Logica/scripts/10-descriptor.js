'use strict';

function contarAparicion(cadena) {
    let conteo = {};

    for (let i of cadena) {
        if (conteo[i]) {
            conteo[i] += 1;

        } else {
            conteo[i] = 1;
        }
    }
    return conteo;
}

let texto = "hola mundo";
let resultado = contarAparicion(texto);
console.log(resultado);