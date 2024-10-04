'use strict';

function sacarNumero(num) {
    return Math.floor(Math.random() * num) + 1;
}


function juegoMates() {
    let continuar;
    let intentos = 0;
    let intentosMaximos = 4;
    let operador;
    let resultado = 0;
    let pregunta = "";
    let respuesta = 0;
    let acertado;
    let respuestas = [];

    do {
        for (let i = 0; i <= 4; i++) {
            let num1 = sacarNumero(10);
            let num2 = sacarNumero(10);
            operador = sacarNumero(4);

            resultado = 0;

            switch (operador) {
                case 1:
                    resultado = num1 + num2;
                    pregunta = num1 + " + " + num2;
                    alert(pregunta);
                    break;
                case 2:
                    if (num1 > num2) {
                        resultado = num1 - num2;
                        pregunta = num1 + " - " + num2;
                    } else {
                        resultado = num2 - num1;
                        pregunta = num2 + " - " + num1;
                    }
                    alert(pregunta);
                    break;
                case 3:
                    resultado = num1 * num2;
                    pregunta = num1 + " * " + num2;
                    alert(pregunta);
                    break;
                case 4:
                    if (num1 > num2 && num1 % num2 == 0) {
                        resultado = num1 / num2;
                        pregunta = num1 + " / " + num2;
                    } else if(num2 > num1 && num2 % num1 == 0){
                        resultado = num2 / num1;
                        pregunta = num2 + " / " + num1;
                    } else {
                        resultado = num2 + num1;
                        pregunta = num2 + " + " + num1;
                    }
                    alert(pregunta);
                    break;

                default:
                    resultado = 0;
                    alert("error");
                    break;
            }
            respuesta = parseInt(prompt("Introduce el resultado"), 0);

            if (respuesta == resultado) {
                acertado = true;
                alert("Correcto");
            } else {
                acertado = false;
                alert("Fallado");
            }

            /* respuestas[i] = { pregunta, respuesta, acertado };
            for (let i = 0; i < respuestas.length; i++) {
                alert("Pregunta: " + respuestas[i].pregunta);
                alert("Respuesta Correcta: " + respuestas[i].respuesta);
                alert("Acertado?: " + respuestas[i].acertado);
            } */
        }

        continuar = prompt("Desea continuar (s/n)");
        if (continuar == "s") {
            intentos = 0;
        } else {
            break;
        }
    } while (continuar == "s");
}

juegoMates();