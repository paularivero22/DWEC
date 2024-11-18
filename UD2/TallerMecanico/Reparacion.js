'use strict';

export class Reparacion {
    reparacionId; 
    vehiculoId;
    descripcion;
    fecha;
    kilometros;
    presupuesto;
    aprobada;
    pagado;
    terminado;
    trabajos;

    constructor(reparacionId, vehiculoId, descripcion, fecha, kilometros, presupuesto, aprobada, pagada, terminado) {
        this.reparacionId = reparacionId;
        this.vehiculoId = vehiculoId;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this. kilometros = kilometros;
        this.presupuesto = presupuesto;
        this.aprobada = aprobada;
        this.pagado = pagada;
        this.terminado = terminado;
        this.trabajos = [];
    }
}