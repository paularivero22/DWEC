'use strict';

export class Tarea {
    tareaId;
    titulo;
    prioridad;
    fechaRegistro;
    fechaLimite;
    descripcion;
    responsable;
    completada;

    constructor(tareaId, titulo, prioridad, fechaRegisro, fechaLimite, descripcion, responsable, completada) {
        this.tareaId = tareaId;
        this.titulo = titulo;
        this.prioridad = prioridad;
        this.fechaRegistro = fechaRegisro;
        this.fechaLimite = fechaLimite;
        this.descripcion = descripcion;
        this.responsable = responsable;
        this.completada = completada;
    }

    get titulo() {
        return this.titulo;
    }

    get prioridad() {
        return this.prioridad;
    }

    get fechaLimite() {
        return this._fechaLimite; 
    }
}

document.getElementById('buscador')
document.querySelector('.tabla-')