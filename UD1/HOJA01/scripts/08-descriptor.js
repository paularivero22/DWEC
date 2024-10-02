'use strict';

function factorial(num) {
    let cadena = "";
    let resultado = 1;

    for (let i = num; i >= 1; i--) {
        resultado *= i;
        cadena += i + "x";
    }
    cadena += "1 = " + resultado;
    return cadena;
}

let continuar = true;

while (continuar) {
    const num = parseInt(prompt("Introduce un número para calcular su factorial:"));
    if (num >= 0) {
        console.log(factorial(num));
    } else {
        console.log("Numero invalido");
    }

    continuar = confirm("¿Deseas continuar?");
}


