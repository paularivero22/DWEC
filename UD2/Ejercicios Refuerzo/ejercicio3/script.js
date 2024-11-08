'use strict';

//DICCIONARIO
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

function traducirLetra(letra) {
    let caracterTraducido = "";

    switch (letra) {
        case 'a':
            caracterTraducido = '.-';
            break;
        case 'b':
            caracterTraducido = '-...';
            break;
        case 'c':
            caracterTraducido = '-.-.';
            break;
        case 'd':
            caracterTraducido = '-..';
            break;
        case 'e':
            caracterTraducido = '.';
            break;
        case 'f':
            caracterTraducido = '..-.';
            break;
        case 'g':
            caracterTraducido = '--.';
            break;
        case 'h':
            caracterTraducido = '....';
            break;
        case 'i':
            caracterTraducido = '..';
            break;
        case 'j':
            caracterTraducido = '.---';
            break;
        case 'k':
            caracterTraducido = '-.-';
            break;
        case 'l':
            caracterTraducido = '.-..';
            break;
        case 'm':
            caracterTraducido = '--';
            break;
        case 'n':
            caracterTraducido = '-.';
            break;
        case 'o':
            caracterTraducido = '---';
            break;
        case 'p':
            caracterTraducido = '-..-';
            break;
        case 'q':
            caracterTraducido = '--.-';
            break;
        case 'r':
            caracterTraducido = '.-.';
            break;
        case 's':
            caracterTraducido = '...';
            break;
        case 't':
            caracterTraducido = '-';
            break;
        case 'u':
            caracterTraducido = '..-';
            break;
        case 'v':
            caracterTraducido = '...-';
            break;
        case 'w':
            caracterTraducido = '-.--';
            break;
        case 'x':
            caracterTraducido = '-..-';
            break;
        case 'y':
            caracterTraducido = '-.--';
            break;
        case 'z':
            caracterTraducido = '--..';
            break;
        default:
            caracterTraducido = '';
    }
    return caracterTraducido;
}

//COMPROBACIONES DE TIPO
function esMorse(entrada) {

    for (let caracter of entrada) {
        let caracterMorse = (caracter === '.' || caracter === '-' || caracter === ' ');

        if (!caracterMorse) {
            return false;
        }
    }

    return true;
}

function esNormal(entrada) {
    for (let caracter of entrada) {
        let caracterMorse = (caracter === '.' || caracter === '-' || caracter === ' ');

        if (caracterMorse) {
            return true;
        }
    }
}

//TRADUCCIONES
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

function traducirFrase(cadena) {
    let traduccion = "";

    if (esNormal(cadena)) {
        let palabras = cadena.split(" ");

        for (let palabra of palabras) {
            for (let letra of palabra) {
                traduccion += traducirLetra(letra);
                traduccion += " ";
            }
            traduccion += "  ";
        }
    }
    console.log(traduccion.trim());
}

let cadenaMorse = ".... --- .-.. .-   -- ..- -. -.. ---";
traducirFraseMorse(cadenaMorse);

let cadena = "hola mundo";
traducirFrase(cadena);