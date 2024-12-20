'use strict';

let num;
let mayor = 1;
let menor = 1;
let suma = 0;
let media = 0;
let total = 0;

do {

    num = parseInt(prompt('Introduce un numero', undefined));

    if (num != 0) {
        if (num > mayor) {
            mayor = num;
        }

        if (num < menor) {
            menor = num;
        }

        suma += num;
        total++;
        media = suma / total;
    }
} while (num !== 0);

alert('Mayor: ' + mayor + '\n'
    + 'Menor: ' + menor + '\n' + 'Suma: ' + suma + '\n' + 'Media: ' + media + '\n'
    + 'Total: ' + total + ' numeros' + '\n');