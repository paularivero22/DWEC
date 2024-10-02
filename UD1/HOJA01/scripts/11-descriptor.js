'use strict';

function esPrimo(numero) {
    if (numero <= 1) return false;
    for (let i = 2; i * i <= numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

function informacionNumeros(num1, num2) {
    let multiplos5 = [];
    let multiplos3 = [];
    let primos = [];


    for (let i = num1; i <= num2; i++) {
        if (i % 3 === 0) {
            multiplos3.push(i);
        }
        if (i % 5 === 0) {
            multiplos5.push(i);
        }

        if (esPrimo(i)) {
            primos.push(i);
        }
    }


    console.log("Multiplos de 5: " + multiplos5);
    console.log("Multiplos de 3:" + multiplos3);
    console.log("Primos: " + primos);
}

let num1 = 1;
let num2 = 40;

informacionNumeros(num1, num2);