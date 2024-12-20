'use strict';

function crearTrabajador(trabajadores) {
    //con padStart añadimos caracteres al inicio de una cadena
    let codigo = `E0.${incremento++}`;
    let nombre = promt('Introduce el nombre');
    let categoria = promt('Introduce la categotia');
    let anio = promt('Introduce el año de entrada');

    let trabajador = {};
    trabajador.codigo = codigo;
    trabajador.nombre = nombre;
    trabajador.categoria = categoria;
    trabajador.anio = anio;

    //Almacenar el trabajador en el array
    trabajadores[trabajadores.length] = trabajador;

};

function modificarTrabajdor(trabajdores) {

    let codigo = promt('Introduce el codigo del trabajador');
    let trabajdorEncontrado;

    for (let i = 0; i < trabajadores.length; i++) {

        if (trabajdores.codigo === codigo) {
            // trabajdorEncontrado=i;
            trabajdorEncontrado = trabajadores[i];
            break;

        }
        if (trabajdorEncontrado === undefined) {
            return;
        }
        trabajdorEncontrado.nombre = prompt('Introduce el nombre: ', trabajdorEncontrado.nombre);
        trabajdorEncontrado.categoria = parseInt(promt('Introduce la categoría:', trabajadorEncontrado.categoria));
        trabajdorEncontrado.anio = parseInt(('Introduce el año de contradiccion', trabajadorEncontrado.anio));

    }

    function calcularNominas(trabajdores) {

        let sueldoBase;

        switch (trabajdores.categoria) {
            case 1:
                sueldoBase = 1100;
                break;
            case 2:
                sueldoBase = 1400;
                break;
            case 3:
                sueldoBase = 1900;
                break;
        }

        let aniosContratados = new Date().getFullYear() - trabajdores.anio;
        let plus = sueldoBase * 0.04;
        let sueldoFinal = sueldoBase + (plus * aniosContratados);
        return sueldoFinal;


        let categoria1;
        let categoria2;
        let categoria3;

        for (let i = 0; trabajdores.length; i++) {

            switch (trabajdores.categoria) {
                case 1:
                    categoria1 = calcularNominas(trabajdores[i]);
                    break;
                case 2:
                    categoria2 = calcularNominas(trabajdores[i]);
                    break;
                case 3:
                    categoria3 = calcularNominas(trabajdores[i]);
                    break;

            }

        }
    }

};