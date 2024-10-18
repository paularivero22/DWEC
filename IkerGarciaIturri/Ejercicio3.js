'use strict';

//creamos funcion para crear el cuadrado
function dibujarCuadrado(){
    //pedimos por teclado el numero de lados
    let lado=parseInt(prompt("Introduzca el tamaño de la figura"))
    let caracter1='s';
    let caracter2='b'; 
    // un for que recorra todas las filas
    for(let filas=0;filas<lado;filas++){
      //cada fila se almacena en un string
        let fila='';
      //rellenamos el string con la diagonal principal
      for(let columnas=1;columnas<=filas+1;columnas++){
        fila+=caracter1;
      }
      //rellenamos el string con la diagonal secundaria
      for(let columnas=0;columnas<lado-filas-1;columnas++){
       fila+=caracter2;
      }
      //salto de linea
       fila+='\n';
       //mostramos cada
       console.log(fila);
    }
}

dibujarCuadrado();