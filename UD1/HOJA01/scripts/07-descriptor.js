'use strict';

function crearTabla(numero) {
    let tabla='';
    let resultado;

    for(let i=1; i<=10; i++) {
        resultado = numero*i;
        tabla += numero + " x " + i + " = " + resultado + "\n";
    }

    alert(tabla);
}

function crearTablaRango(num1, num2) {
    let tablas='';
    
    for(let i=num1; i<=num2; i++) {
        crearTabla(i);
    }
}
crearTablaRango(2,4);