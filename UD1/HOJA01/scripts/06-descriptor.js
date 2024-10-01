'use strict';

function cuadrado() {
    let num = parseInt(prompt("Introduce el tamaño: ", 0));

    let filas = new Array(num);

    for (let i = 0; i < num; ++i) {
        filas[i] = new Array;

        for (let j = 0; j < num; j++) {
            if (i == 0 || i == num - 1 || j == 0 || j == num - 1) {
                filas[i][j] = '*';
            } else {
                filas[i][j] = ' ';
            }
        }
    }
    console.log(filas);
}

function triangulo() {
    let altura = parseInt(prompt('Introduce el tamaño'));
    for (let fila = 0; fila < altura; fila++) {
        let String = "";
        //for para espacios en blanco
        for (let columna = 0; columna < altura - fila - 1; columna++) { //
            String += " ";
        }
        //for para rellenar
        for (let columna = 0; columna < 2 * fila + 1; columna++) {
            String += '*';
        }
        console.log(String);
    }
}

function rombo() {
    let altura = parseInt(prompt('Introduce el tamaño'));

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
}

let opcion;

do {
    alert("Escoge una opcion:\n1. Cuadrado hueco\n2. Triangulo\n3. Rombo\n0. Salir");

    opcion = parseInt(prompt('Introduce la opcion'));

    switch (opcion) {
        case 1:
            cuadrado();
            break;
        case 2:
            triangulo();
            break;
        case 3:
            rombo();
            break;
        case 0:
            alert('Saliendo');
            break;
        default:
            console.log('Opcion no valida');
    }
} while (opcion !== 0);