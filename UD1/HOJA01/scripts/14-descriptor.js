'use strict';

//
let alumnos=[
{
    nombre: 'Juan',
    asignaturas:[
        {modulo:'DWEC',nota: 7},
        {modulo:'DAW',nota: 5},
        {modulo:'DWES',nota: 8},
        {modulo:'DIW',nota: 5},
    ]
},
{
    nombre:"Iker",
    asignaturas: [
        {modulo:'DWEC',nota: 6},
        {modulo:'DAW',nota:4},
        {modulo:'DWES',nota:6},
        {modulo:'DIW',nota:7}
    ]
},
{

    nombre:"Angel",
    asignaturas:[
        {modulo:'DWEC',nota:5},
        {modulo:'DAW',nota:6},
        {modulo:'DIW',nota:7},
        {modulo:'DIW',nota:4}

    ]

}


]
// funcion para calcular si un alumno promociona y su media
function promociona(alumnos){

    for(let alumno of alumnos){
        let totalNotas=0;
        let aprobadas=true;
        let pendientes=[];

        alumno.asignaturas.array.forEach(asignaturas => {
            totalNotas+=asignaturas.nota;
            if(asignaturas.nota<5){
                aprobadas=false;
                pendientes.push(asignaturas.modulo);
            }
        });
        //media, valor medio del expediente del alumno
        alumno.media=totalNotas/alumno.asignaturas.lenght;
        alumno.promociona=aprobadas;
        alumno.pendientes=pendientes;
    };

    // funcion para imrpimir los alumnos que promocionan
    function imprimirPromocional(alumnos){
        console.log('Alumnos que promocionan');
        let index=0;
        //recorrer el array
        for(let alumno of alumnos){
            //si el alumno promociona 
            // Índice-Nombre-Pendientes:[pendiente1, pendiente2,etc...
            if(alumno.promociona){
                // Muestra los índices, indice ->
                
                console.log(`${index + 1} - ${alumno.nombre} - Media: ${alumno.media.toFixed(2)}`);

            }
            index++;
        };
    }
    //funcion para imprimir los alumnos que no proporcionan 

    function imprimirNoPromocional(alumnos){
        console.log('Alumnos que no prommocionan');
        let index=0;
        for(let alumno of alumnos){
            //si el alumno no proporciona... 
            if(!alumno.promociona){
                console.log(`${index + 1} - ${alumno.nombre} - Pendientes: ${alumno.pendientes(",")}`);
            }
            index++
        };
    }
    promociona(alumnos);
    imprimirPromocional(alumnos);
    imprimirNoPromocional(alumnos);
    
}