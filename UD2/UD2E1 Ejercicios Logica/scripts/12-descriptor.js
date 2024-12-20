'use strict';

function sacarNumero() {
    return Math.floor(Math.random() * 100) + 1;
}

function juegoAdivinanza() {
    let numSecreto = sacarNumero();
    let num;
    let intentos = 0;
    let intentosMaximos = 5;
    let adivinado = false;

    while(intentos < intentosMaximos) {
        num = parseInt(prompt("Introduce un número del 1 al 100"),0);

        if(num > numSecreto) {
            alert('El numero es mayor, intentalo otra vez');
        } else if(num < numSecreto) {
            alert('El numero es menor, intentalo otra vez');
        } else if(num == numSecreto) {
            adivinado = true;
            break;
        }

        intentos++;
    }

    if(adivinado) {
        alert('Felicidades! lo has adivinado era: ' + numSecreto);
    } else {
        alert('Has perdido. El número secreto era: ' + numSecreto); 
    }

}

juegoAdivinanza();