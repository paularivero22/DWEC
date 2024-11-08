'use strict';

function comprobarParentesis(cadena) {
    let parentesisApertura = 0;
    let parentesisCierre = 0;
    let corchetesApertura = 0;
    let corchetesCierre = 0;
    let llavesApertura = 0;
    let llavesCierre = 0;
    let correcto;

    for (let caracter of cadena) {
        if (caracter === "(") {
            parentesisApertura++;
        }

        if (caracter === ")") {
            parentesisCierre++;
        }

        if (caracter === "[") {
            corchetesApertura++;
        }

        if (caracter === "]") {
            corchetesCierre++;
        }

        if (caracter === "{") {
            llavesApertura++;
        }

        if (caracter === "}") {
            llavesCierre++;
        }
    }

    if ((parentesisApertura === parentesisCierre) && (corchetesApertura === corchetesCierre) && (llavesApertura === llavesCierre)) {
        correcto = true;
    } else {
        correcto = false;
    }
    if (correcto) {
        console.log("Correcto");
    } else {
        console.log("Incorrecto");
    }
}

let funcion = "{ [ a * ( c + d ) ] - 5 }";
comprobarParentesis(funcion);

let funcion2 = "{ [[[ a * ( c + d ) ] - 5 }";
comprobarParentesis(funcion2);