'use strict';

(function() {
    let altura = parseInt(prompt('Introduce un número'));

    // Primer for para construir la pirámide hacia arriba
    for (let fila = 0; fila < altura / 2; fila++) {
        let String = "";
        // for para espacios en blanco
        for (let columna = 0; columna < altura - fila - 1; columna++) {
            String += " ";
        }
        // for para rellenar con '*'
        for (let columna = 0; columna < 2 * fila + 1; columna++) {
            String += '*';
        }
        console.log(String);
    }

    // Segundo for para construir la pirámide hacia abajo (invertida)
    for (let fila = Math.floor(altura / 2) - 1; fila >= 0; fila--) {
        let String = "";
        // for para espacios en blanco
        for (let columna = 0; columna < altura - fila - 1; columna++) {
            String += " ";
        }
        // for para rellenar con '*'
        for (let columna = 0; columna < 2 * fila + 1; columna++) {
            String += "*";
        }
        console.log(String);
    }
})();
