'use strict';

const $bingo = (function () {
    let cartones = [];
    let marcador = [];
    let bolasSacadas = [];
    let juegoEnCurso = false;
    /*
    {
        valor: 12,
        marcado: true
    }
    */
    function generarNumeros(min, max) {
        let numeros = [];
        for (let i = min; i <= max; i++) {
            numeros.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return numeros;
    }

    function generarCarton() {
        let carton = [];

        for (let i = 0; i < 3; ++i) { // 3 filas
            let fila = [];
            for (let columna = 0; columna < 9; ++columna) { // 9 columnas por fila
                let min = columna * 10; // Mínimo valor de la columna
                let max = min + 9; // Máximo valor de la columna
                let numero = Math.floor(Math.random() * (max - min + 1)) + min; // Generar un número aleatorio entre min y max
                // Agregar número a la fila
                fila.push(
                    {
                        valor: numero,
                        marcado: false
                    }
                );
            }
            carton.push(fila);
        }

        //mostrar carton
        for (let fila = 0; fila < carton.length; fila++) {
            console.log(carton[fila]);
        }
        return carton;
    }

    function pintarCarton(id, carton) {
        // Obtener el contenedor del cartón por su id
        let contenedorCarton = document.getElementById(id);

        // Inicializamos una variable para ir construyendo el HTML
        let htmlCarton = '';

        // recorrer filas 
        for (let fila = 0; fila < 3; fila++) {
            htmlCarton += '<div class="fila">';

            // recorrer columnas 
            for (let col = 0; col < 9; col++) {
                if (carton[fila][col] === null) {
                    valorCelda = '*'; // Si es null, usamos '*'
                } else {
                    valorCelda = carton[fila][col]; // Si no, usamos el valor del cartón
                }
                htmlCarton += '<div class="celda">' + valorCelda + '</div>'; // Agregamos el valor en un div con clase 'celda'
            }

            htmlCarton += '</div>';
        }

        contenedorCarton.innerHTML = htmlCarton;
    }

    function sacarBola() {
        if (bolasSacadas.length >= 90) {
            console.log("Todas las bolas han sido sacadas");
            return;
        }

        let bola;
        do {
            bola = Math.floor(Math.random() * 90) + 1;
        } while (bolasSacadas.includes(bola));

        bolasSacadas.push(bola);
        return bola;
    }


    function verificarCelda(carton) {

    }


    function iniciarJuego(intervaloSegundos) {
        if (juegoEnCurso) return;
        juegoEnCurso = true;

        bolasSacadas = [];
        marcador = Array(3).fill({ lineas: 0, bingos: 0 });
        generarCartones();
        actualizarInterfaz();
    }

    return {


    };
})();

window.addEventListener("load", function () {
    document.getElementById("segundos").addEventListener("submit", function (event) {
        event.preventDefault();
        const segundos = document.getElementById("segundos").value;
        $bingo.juego(segundos);
    });


});