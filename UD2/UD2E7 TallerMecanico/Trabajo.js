'use strict';

export class Trabajo {
    concepto;
    precioUnitario;
    cantidad;
    totalTrabajo;

    constructor(concepto, precioUnitario, cantidad, totalTrabajo) {
        this.concepto = concepto;
        this.precioUnitario = precioUnitario;
        this.totalTrabajo = totalTrabajo;
    }
}