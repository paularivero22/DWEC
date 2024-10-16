'use strict';

const $bingo = (function () {
    function sacarNumeros(min, max) {
        return (int)(Math.random() * ((max - min) + 1)) + min;
    }

    function crearCarton() {
        carton = [
            [],
            [],
            []
        ];

        for (let i = 0; i < carton.length; ++i) {
            let min = i*10;
            let numMax = Math.floor(Math.random()*10)+min;

            for(let j = 0; j < 9 ; i++) {
                carton[i][j] = ;
            }
        }
    }
})();

function generarAleatorio(minimo,maximo) {
    let rango = maximo - minimo;
    let valorEnRango = Math.random() * rango;
    let sinDecimales = Math.floor(valorEnRango);
    let conDesplazamiento = sinDecimales + minimo;
    return conDesplazamiento;
}