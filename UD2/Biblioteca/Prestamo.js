'use strict';

export class Prestamo {
    fechaPrestamo;
    fechaDevolucion;

    constructor(fechaPrestamo ,fechaDevolucion) {
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
    }
}