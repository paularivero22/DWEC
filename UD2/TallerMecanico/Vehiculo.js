'use strict';

export class Vehiculo {
    vehiculoId;
    matricula;
    marca;
    modelo;
    año;
    motor;
    propietario;

    constructor(vehiculoId, matricula, marca, modelo, año, motor) {
        this.vehiculoId = vehiculoId;
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.motor = motor;
        this.propietario = {};
    }
}