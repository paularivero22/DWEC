'use strict';
let $yedra=function(){

//creamos el array de objetos JSON alumno
const alumnos = {
    alumno1: {
        nombre: "Iker Garcia Iturri",
        nota: 8,
        modulo: ["DWEC", "DWES"],
        convocatorias: 4,
    },
    alumno2: {
        nombre: "Elsa",
        nota: 7,
        modulo: ["DWEC", "DWES"],
        convocatorias: 3,
    },
    alumno3: {
        nombre: "Victor",
        nota: 10,
        modulo: ["DWEC"],
        convocatorias: 2,
    },
    alumno4: {
        nombre: "Alberto Gonzalez Fernandez",
        nota: 2,
        modulo: ["DWEC", "DWES"],
        convocatorias: 3,
    },
    alumno5: {
        nombre: "Angel Fernandez Labrador",
        nota: 1,
        modulo: ["DWES"],
        convocatorias: 2,
    },
    alumno6: {
        nombre: "David Llanillo",
        nota: 9,
        modulo: ["DWES"],
        convocatorias: 1,
    }

}

//funcion para listar a los alumnos suspensos, mostrando unicamente el nombre del alumno, la nota y el modulo
function alumnosSuspensos() {
    //creamos un array JSON para almacenar los suspensos
    let alumnosSuspensos = {};
    //con un for recorremos el array de los alumnos
    for (let alumno in alumnos) {
        if (alumnos[alumno].nota < 5) {
            //instanciamos un alumno con los datos pedidos 
            let alumnoC = {
                nombre: alumnos[alumno].nombre,
                nota: alumnos[alumno].nota,
                modulo: alumnos[alumno].modulo
            }
            //metemos ese alumno dentro del JSON
            alumnosSuspensos[alumnoC];
            alumnosSuspensos[alumnoC] = alumnoC;
        }
    }
    return alumnosSuspensos;
}


function estadisticasModulo() {
    //creamos las variables que necesitamos
    let notaMediaC=0;
    let notaMediaS=0;
    let totalC=0;
    let totalS=0;
    let cantidadAlumnosC = 0;
    let cantidadAlumnosS = 0;
    let convocatoriasMediasC=0;
    let convocatoriasMediasS=0;
    let totalConvocatoriasC=0;
    let totalConvocatoriasS=0;
    //sacamos cada dato
    for (let alumno in alumnos) {
        if (alumnos[alumno].modulo["DWES"]) {
            cantidadAlumnosS++;
            totalS += alumnos[alumno].nota;
            totalConvocatoriasS+=alumnos[alumno].convocatorias;
        }
        if(alumnos[alumno].modulo["DWEC"]){
            cantidadAlumnosC++;
            totalC+=alumnos[alumno].nota;
            totalConvocatoriasC+=alumnos[alumno].convocatorias;
        }
    }
    //medias
    notaMediaC=float(totalC/cantidadAlumnosC,2);
    notaMediaS=float(totalS/cantidadAlumnosS,2);
    convocatoriasMediasC=float(totalConvocatoriasC/cantidadAlumnosC,2);
    convocatoriasMediasS=float(totalConvocatoriasS/cantidadAlumnosS,2);
    //lo añadimos al JSON
    let  modulos={
        DWES:{
            nombre:"DWES",
            notaMedia:notaMediaS,
            convocatoriasMedias:convocatoriasMediasS,
        },
        DWEC:{
            nombre:"DWEC",
            notaMedia:notaMediaC,
            convocatoriasMedias:convocatoriasMediasC,
        }
    }
 return modulos;
}


function devolverDatosJSON(){

}

function cargarNuevaCadena(){

}


console.log("A continuacion se muestran los alumnos suspensos");
let suspensos={};
suspensos=[...alumnosSuspensos()];

}