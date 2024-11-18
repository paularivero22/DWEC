'use strict';
import { datos } from './datos-taller.js';

export class BD {
    #vehiculos;
    #reparaciones;
    #siguienteVehiculo;
    #siguienteReparacion;

    constructor() {
        let objJSON = datos;

        for(let vehiculo of objJSON.vehiculos) {
            let vehiculoN = new Vehiculo(vehiculo.vehiculoId, vehiculo.matricula, vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.motor);
            let propietario = new Propietario()
            
            
            this.#vehiculos.push(vehiculoN);
        }
        this.#vehiculos = [];
        this.#reparaciones = [];
    }

    obtenerVehiculos() {
                
    }

    obtenerVehiculo(vehiculoId=0, matricula='', teléfono='') {

    }

    crearVehiculo(vehiculo) {

    }

    borrarVehiculo(vehiculoId) {

    }

    obtenerReparaciones(fecha=null, pagado=null, terminado=false) {

    }

    obtenerReparacion(reparacionId) {

    }

    crearReparación(vehiculoId, reparación) {

    }

    borrarReparación(reparacionId) {

    }
}