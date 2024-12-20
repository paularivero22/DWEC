'use strict';

(function () {
    let num = parseInt(prompt("Introduce un numero9: ", 0));

    let filas = new Array(num);

    for (let i = 0; i < num; ++i) {
        filas[i] = new Array;

        for (let j = 0; j < num; j++) {
            if(i == 0 || i == num-1 ||j == 0 || j == num -1) {
                filas[i][j] = '*';
            } else {
                filas[i][j] = ' ';
            }
        }
    }
    console.log(filas);
}
)();