'use strict';

function traducirCaracterMorse(caracter) {
    let caracterTraducido = "";

    switch (caracter) {
        case '.-':
            caracterTraducido = 'a';
        case '-..':
            caracterTraducido = 'b';
        case '-.-.':
            caracterTraducido = 'c';
        case '-..':
            caracterTraducido = 'd';
        case '.':
            caracterTraducido = 'e';
        case '..-.':
            caracterTraducido = 'f';
        case '--.':
            caracterTraducido = 'g';
        case '....':
            caracterTraducido = 'h';
        case '..':
            caracterTraducido = 'i';
        case '.---':
            caracterTraducido = 'j';
        case '-.-':
            caracterTraducido = 'k';
        case '.-..':
            caracterTraducido = 'l';
        case '--':
            caracterTraducido = 'm';
        case '-.':
            caracterTraducido = 'n';
        case '---':
            caracterTraducido = 'o';
        case '-..-':
            caracterTraducido = 'p';
        case '--.-':
            caracterTraducido = 'q';
        case '.-.':
            caracterTraducido = 'r';
        case '...':
            caracterTraducido = 's';
        case '-':
            caracterTraducido = 't';
        case '..-':
            caracterTraducido = 'u';
        case '...-':
            caracterTraducido = 'v';
        case '-.--':
            caracterTraducido = 'w';
        case '-..-':
            caracterTraducido = 'x';
        case '-.--':
            caracterTraducido = 'y';
        case '--..':
            caracterTraducido = 'z';
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
    let palabra;
    let traduccion;
    


}

//let morse = [' ', '.', '-'];
//let esMorse = entrada.every(x => morse.include(x));



//se que es morse o no
//si no es morse -> cada carater ocupa un caracter -> fn pasarDeTextoAMorse
//caso contrario 
//fn pasar de morse a TextDecoder


//con una variable cadena, si es morse, tines que dividir por dos espacios seguidos -> sacas las palabras
//luego, para cada palabra, dividir por 1 espacio -> sacas cada caracter morse
//ahora que lo tengo troceado llamo a pasar de morse a texto caracter a caracter