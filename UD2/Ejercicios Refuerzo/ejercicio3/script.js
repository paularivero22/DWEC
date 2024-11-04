'use strict';

function traducirCaracterMorse(caracter) {
    let caracterTraducido = "";

    switch (caracter) {
        case '.-':
            caracterTraducido = 'a';
            break;
        case '-...':
            caracterTraducido = 'b';
            break;
        case '-.-.':
            caracterTraducido = 'c';
            break;
        case '-..':
            caracterTraducido = 'd';
            break;
        case '.':
            caracterTraducido = 'e';
            break;
        case '..-.':
            caracterTraducido = 'f';
            break;
        case '--.':
            caracterTraducido = 'g';
            break;
        case '....':
            caracterTraducido = 'h';
            break;
        case '..':
            caracterTraducido = 'i';
            break;
        case '.---':
            caracterTraducido = 'j';
            break;
        case '-.-':
            caracterTraducido = 'k';
            break;
        case '.-..':
            caracterTraducido = 'l';
            break;
        case '--':
            caracterTraducido = 'm';
            break;
        case '-.':
            caracterTraducido = 'n';
            break;
        case '---':
            caracterTraducido = 'o';
            break;
        case '-..-':
            caracterTraducido = 'p';
            break;
        case '--.-':
            caracterTraducido = 'q';
            break;
        case '.-.':
            caracterTraducido = 'r';
            break;
        case '...':
            caracterTraducido = 's';
            break;
        case '-':
            caracterTraducido = 't';
            break;
        case '..-':
            caracterTraducido = 'u';
            break;
        case '...-':
            caracterTraducido = 'v';
            break;
        case '-.--':
            caracterTraducido = 'w';
            break;
        case '-..-':
            caracterTraducido = 'x';
            break;
        case '-.--':
            caracterTraducido = 'y';
            break;
        case '--..':
            caracterTraducido = 'z';
            break;
        default:
            caracterTraducido = '';
    }
    return caracterTraducido;
}

function esMorse(entrada) {

    for (let caracter of entrada) {
        let caracterMorse = (caracter === '.' || caracter === '-' || caracter === ' ');

        if (!caracterMorse) {
            return false;
        }
    }

    return true;
}

function traducirFraseMorse(cadena) {
    let traduccion = "";

    if (esMorse(cadena)) {
        //separa la cadena cada 2 espacios
        let palabras = cadena.split("   ");

        for (let palabra of palabras) {
            //separa la cadena cada 1 espacio
            let caracteres = palabra.split(" ");

            for (let caracter of caracteres) {
                traduccion += traducirCaracterMorse(caracter);
            }

            //añade un espacio entre palabras
            traduccion += " ";
        }
    }

    console.log(traduccion.trim());
}

let cadena = ".... --- .-.. .-   -- ..- -. -.. ---";
traducirFraseMorse(cadena);