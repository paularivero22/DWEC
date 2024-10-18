'use strict';
//creamos una funcion que jugara los dados, le pasamos como parametro el numero de lados
function jugarDados(numeroLados) {
    //creamos una funcion anonima dentro de la funcion jugarDados que nos generara un valor aleatorio entre el numero de lados que haya
    function valorAleatorio() {
        //generamos el valor aleatorio con math.random y ponemos Math.floor para que sea entero
        return Math.floor(Math.random() * numeroLados + 1);
    };
    //ahora el closure retornara una funcion anonima con un array con la tirada de dos dados
    return function () {
        //creamos el array
        let resultado = new Array(valorAleatorio(), valorAleatorio());
        return resultado
    }
}
// pedimos el numero de lados y el numero de tiradas
let numeroLados = parseInt(prompt("Inserte el numero de lados que tendra el dado:"));
let numeroTiradas = parseInt(prompt("Numero de tiradas:"));


//instanciamos una funcion tirarDados
let tirarDados = jugarDados(numeroLados);
//creamos estas dos variables para almacenar la cantidad de victorias de cada uno
let victoriasMaquina = 0;
let victoriasJugador = 0;
//creo un for para jugar las veces que ha dicho el usuario
//supongamos que para ganar, la suma de ambos dados tiene que ser mayor que la de el rival
for (let tiradas = 0; tiradas < numeroTiradas; tiradas++) {
    //instanciamos dos arrays cada vez donde se almacenaran las tiradas de ambos
    //rellenamos estos arrays con las tiradas
    let tiradaMaquina = [...tirarDados()];
    let tiradaJugador = [...tirarDados()];
    //sumamos los numero de las tiradas
    let sumaMaquina = tiradaMaquina[0] + tiradaMaquina[1];
    let sumaJugador = tiradaJugador[0] + tiradaJugador[1];
    //aqui se muestran los resultados de cada tirada
    alert(`Ronda ${tiradas + 1}: \n
     Resultado de la maquina: Tirada 1= ${tiradaMaquina[0]}. Tirada 2= ${tiradaMaquina[1]}. Suma= ${sumaMaquina} \n
     Resultado del jugador: Tirada 1= ${tiradaJugador[0]}. Tirada 2= ${tiradaJugador[1]}. Suma= ${sumaJugador}`);
    //se suman las victorias
    if (sumaMaquina < sumaJugador) {
        victoriasJugador++;
    } else if (sumaMaquina > sumaJugador) {
        victoriasMaquina++;
    }
}
//se muestra el ganador o empate
if (victoriasMaquina > victoriasJugador) {
    alert("Ha ganado la maquina, mas suerte la proxima");
} else if (victoriasJugador > victoriasMaquina) {
    alert("ha ganado el jugador, felicidades");
} else {
    alert("Empate");
}