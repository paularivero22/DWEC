'use strict';

let $bingo = (function () {
    let cartones = {
        jugador1: [[], [], []],
        jugador2: [[], [], []],
        humano: [[], [], []]
    };
    let datosMarcador = {
        jugador1: [0, 0],
        jugador2: [0, 0],
        humano: [0, 0],
    };
    let bolasSacadas = {};
    return {
        pintarCartones,
        generarCarton,
        iniciarJuego,
        cartones,
        datosMarcador,
        bolasSacadas,
        siguienteBola,
        indicarValor,
        cantarLinea,
        cantarBingo,
        alguienGano,
        verificarCartonesNoHumanos,
        comprobarNumeroNoHumano,
        resumen,
        actualizarMarcadores,
    };



    function iniciarJuego() {
        cartones.jugador1 = generarCarton();
        cartones.jugador2 = generarCarton();
        cartones.jugador3 = generarCarton();
    }


    function generarCarton() {
        let carton = [[], [], []]; // Iniciamos el cartón como un array de arrays
        let usados = new Set(); // Conjunto para almacenar los números usados

        // Generar números aleatorios para cada columna y rellenar el cartón
        for (let columna = 0; columna < 9; columna++) { // 9 columnas
            let max = (columna + 1) * 10; // Máximo valor de la columna
            let min = max - 9; // Mínimo valor de la columna

            let numerosColumna = [];

            // Generar 3 números únicos para la columna
            while (numerosColumna.length < 3) {
                let numero = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!usados.has(numero)) {
                    usados.add(numero); // Añadir al conjunto de números usados
                    numerosColumna.push(numero); // Añadir al array de la columna
                }
            }
            // Ordenar los números dentro de la columna
            numerosColumna.sort((a, b) => a - b);

            // Asignar los números generados a la columna correspondiente en el cartón
            for (let fila = 0; fila < 3; fila++) {
                carton[fila][columna] = numerosColumna[fila] || '*'; // Asignar '*' si no hay número
            }
        }

        // Rellenar con asteriscos algunas posiciones aleatorias (para tener 4 números por fila)
        for (let fila = 0; fila < 3; fila++) {
            let asteriscos = 0;
            while (asteriscos < 4) { // 4 espacios vacíos por fila
                let columna = Math.floor(Math.random() * 9); // Columna aleatoria
                if (carton[fila][columna] !== '*') {
                    carton[fila][columna] = '*';
                    asteriscos++;
                }
            }
        }
        return carton;
    }
})();

function pintarCartones(jugador) {
    //primer carton 
    document.getElementById('comenzar').addEventListener('click', function () {
        let carton = $bingo.cartones[jugador]; // Accedemos al cartón del jugador
        let contenido = '';  // Inicia la cadena para contener el HTML

        for (let fila = 0; fila < 3; fila++) {
            contenido += '<div style="display: flex;">'; // Cada fila del cartón es un div con display: flex
            for (let columna = 0; columna < 9; columna++) {
                // Se crea cada celda con el valor correspondiente del cartón (o vacío si no tiene valor)
                contenido += '<div class="contenedor">' + (carton[fila][columna] || '') + '</div>';
            }
            contenido += '</div>'; // Cerramos el div de la fila
        }

        document.getElementById(jugador).innerHTML = contenido; // Insertamos el contenido generado en el div del jugador
    });
}


function siguienteBola(Bolas) {
    if (bolasSacadas.length >= 90) return;

    let nuevaBola;
    do {
        nuevaBola = Math.floor(Math.random() * 90) + 1;
    } while (bolasSacadas.includes(nuevaBola));

    bolasSacadas.push(nuevaBola);
    mostrarBolas();

    verificarCartonesNoHumanos()
}

function mostrarBolas() {
    let bolasContainer = document.getElementById('bolasSacadas');
    bolasContainer.innerHTML = bolasSacadas.map(bola => `<span>${bola}</span>`).join(' ');
}

function indicarValor() {
    let cartonHumano = cartones.humano;
    for (let fila = 0; fila < 3; fila++) {
        for (let columna = 0; columna < 9; columna++) {
            if (cartonHumano[fila][columna] === numero) {
                cartonHumano[fila][columna] = 'X'; // Marca el número como "tachado"
                return true; // Retorna true si el número fue encontrado y marcado
            }
        }
    }
    return false; // Retorna false si el número no está en el cartón del jugador humano
}

function cantarLinea() {
    let cartonHumano = cartones.humano;
    for (let fila = 0; fila < 3; fila++) {
        let esLinea = cartonHumano[fila].every(celda => celda === 'X' || celda === '*');
        if (esLinea) {
            datosMarcador.humano[0]++; // Incrementa el contador de líneas del humano
            actualizarMarcadores();
            alert('¡Línea cantada!');
            return true;
        }
    }
    alert('No hay línea en tu cartón.');
    return false;
}

function cantarBingo() {
    let cartonHumano = cartones.humano;
    let esBingo = true;
    for (let fila = 0; fila < 3; fila++) {
        for (let columna = 0; columna < 9; columna++) {
            if (cartonHumano[fila][columna] !== 'X' && cartonHumano[fila][columna] !== '*') {
                esBingo = false;
                break;
            }
        }
    }

    if (esBingo) {
        datosMarcador.humano[1]++; // Incrementa el contador de bingos del humano
        actualizarMarcadores();
        alert('¡Bingo cantado!');
    } else {
        alert('No tienes un bingo completo en tu cartón.');
    }
    return esBingo;
}

function alguienGano() {
    for (let jugador in datosMarcador) {
        if (datosMarcador[jugador][1] > 0) { // Si algún jugador tiene 1 o más bingos
            clearInterval(intervaloBolas); // Detiene el intervalo de bolas
            alert(`¡${jugador} ha ganado con un bingo!`);
            return true;
        }
    }
    return false;
}

function verificarCartonesNoHumanos() {
    for (let jugador in cartones) {
        if (jugador !== 'humano') {
            comprobarNumeroNoHumano(cartones[jugador], bolasSacadas[bolasSacadas.length - 1]);
        }
    }
}

function comprobarNumeroNoHumano() {
    for (let fila = 0; fila < 3; fila++) {
        for (let columna = 0; columna < 9; columna++) {
            if (carton[fila][columna] === numero) {
                carton[fila][columna] = 'X'; // Marca el número como sacado
                return;
            }
        }
    }
}

function actualizarMarcadores() {
    resumen();
}


function resumen() {
    document.getElementById('comenzar').addEventListener('click', function () {
        let contenido = '';  // Inicia la cadena para contener el HTML
        for (let datos in $bingo.datosMarcador) {
            contenido += `<p>${datos}: ${$bingo.datosMarcador[datos][0]} lineas y ${$bingo.datosMarcador[datos][1]} bingos</p>`;
        }
        // Insertamos el contenido generado en el div de resumen
        document.getElementById('resumen').innerHTML = contenido;
    });
}


window.addEventListener('load', function () {
    $bingo.iniciarJuego();
    $bingo.pintarCartones('jugador1');
    $bingo.pintarCartones('jugador2');
    $bingo.pintarCartones('jugador3');
    $bingo.resumen();
});
