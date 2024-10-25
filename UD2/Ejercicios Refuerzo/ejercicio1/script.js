'use strict';

function comprobarAnagrama(palabra1, palabra2) {
    let esAnagrama = true;

    if (!(palabra1 === palabra2)) {
        for (let caracter of palabra1) {
            if (palabra2.includes(caracter) && (palabra1.length == palabra2.length)) {
                esAnagrama = true;
            } else {
                esAnagrama = false;
            }
        }
        if (esAnagrama) {
            console.log('La palabra 1 es anagrama de la palabra 2');
        } else {
            console.log('La palabra 1 NO es anagrama de la palabra 2');
        }
    } else {
        console.log('Las palabras son iguales');
    }
}

comprobarAnagrama('camello', 'melloca');