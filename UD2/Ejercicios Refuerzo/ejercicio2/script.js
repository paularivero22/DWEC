'use strict';

function fibonacci(longitud) {
    let fibonacci = [];
    fibonacci.push(0);
    fibonacci.push(1);
    let aux=0;

    for(let i = 2; i < longitud; i++) {
        aux = fibonacci[i-1] + fibonacci[i-2];
        fibonacci.push(aux);
    }

    console.log(fibonacci);
}

fibonacci(10);