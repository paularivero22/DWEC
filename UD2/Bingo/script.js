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

        for (let i = 0; i < 9; ++i) {
            let min = i*10;
            let numMax = Math.floor(Math.random()*10)+min;

            for(let j = 0; j < 9 ; i++) {
                carton[i][j] = numMax;
            }
        }
    }
    return carton;
})();

/*function generarAleatorio(minimo,maximo) {
    let rango = maximo - minimo;
    let valorEnRango = Math.random() * rango;
    let sinDecimales = Math.floor(valorEnRango);
    let conDesplazamiento = sinDecimales + minimo;
    return conDesplazamiento;
}*/

function juego(segundos) {
    let carton1 = crearCarton();
    for(let i = 0; i <= 15; i++) {
        sacarNumeros(1,10);
        for(celda of carton1) {
            if(celda === sacarNumeros()) {
                carton1[celda] = '*';
            }    
        }
    }


    

}

window.addEventListener("load", function() { 
    document.getElementById("segundos").addEventListener("submit", function(event) {
        event.preventDefault();
        const segundos = document.getElementById("segundos").value;
        $bingo.juego(segundos);
    });



}