'use strict';
import {datos} from `./datos.js`;

class Alumno {
    nombre;
    dni;
    asignaturas;
    telefono;
    email;

    constructor(nombre, dni, asignaturas, telefono, email) {
        this.nombre = nombre;
        this.dni = dni;
        this.asignaturas = asignaturas;
        this.telefono = telefono;
        this.email = email; 
    }

}