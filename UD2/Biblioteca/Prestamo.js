'use strict';

export class Prestamo {
    fechaPrestamo;
    fechaDevolucion;

    constructor(fechaPrestamo, fechaDevolucion) {
        this.fechaPrestamo = new Date(fechaPrestamo); 
        this.fechaDevolucion = new Date(fechaDevolucion); 
    }
}
