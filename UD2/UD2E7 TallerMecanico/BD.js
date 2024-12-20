'use strict';
import { datos } from './datos-taller.js';
import { GestionMecanica } from './GestionMecanica.js';
import { Propietario } from './Propietario.js';
import { Reparacion } from './Reparacion.js';
import { Trabajo } from './Trabajo.js';
import { Vehiculo } from './Vehiculo.js';


export class BD {
    #vehiculos = [];
    #reparaciones = [];
    #siguienteVehiculo = 1;
    #siguienteReparacion = 1;

    constructor() {
        let objJSON = datos;

        //recoger los vehiculos
        for (let vehiculo of objJSON.vehiculos) {
            let vehiculoN = new Vehiculo(vehiculo.vehiculoId, vehiculo.matricula, vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.motor);

            //añadir el propietario
            vehiculoN.propietario.nombre = vehiculo.propietario.nombre;
            vehiculoN.propietario.telefono = vehiculo.propietario.telefono;
            vehiculoN.propietario.email = vehiculo.propietario.email;

            this.#vehiculos.push(vehiculoN);
        }

        //recoger las reparaciones
        for (let reparacion of objJSON.reparaciones) {
            this.#reparaciones.push(reparacion);
        }
    }

    obtenerVehiculos() {
        return this.#vehiculos;
    }

    obtenerVehiculo(filtro, valor) {
        for (let vehiculo of this.#vehiculos) {
            switch (filtro) {
                case "vehiculoId":
                    if (vehiculo.vehiculoId === valor) {
                        return vehiculo;
                    }
                case "matricula":
                    if (vehiculo.matricula === valor) {
                        return vehiculo;
                    }
                case "telefono":
                    if (vehiculo.propietario.telefono === valor) {
                        return vehiculo;
                    }
            }
        }
    }


    crearVehiculo(vehiculo) {
        this.#vehiculos.push(vehiculo);
    }

    borrarVehiculo(vehiculoId) {
        this.#vehiculos = this.#vehiculos.filter(vehiculo => vehiculo.vehiculoId !== vehiculoId);
    }

    obtenerReparaciones(filtro, valor) {
        for (let reparacion of this.#reparaciones) {
            switch (filtro) {
                case "fecha":
                    if (reparacion.fecha === valor) {
                        return reparacion;
                    }
                case "pagado":
                    if (reparacion.pagado === valor) {
                        return reparacion;
                    }
                case "terminado":
                    if (reparacion.terminado === valor) {
                        return reparacion;
                    }
            }
        }
    }

    obtenerReparacion(reparacionId) {
        for (let reparacion of this.#reparaciones) {
            if (reparacion.reparacionId === reparacionId) {
                return reparacion;
            }
        }
    }

    crearReparacion(vehiculoId, reparacion) {
        let reparacionN = reparacion;
        reparacionN.vehiculoId = vehiculoId;

        this.#reparaciones.push(reparacionN);
    }

    borrarReparación(reparacionId) {
        this.#reparaciones = this.#reparaciones.filter(reparacion => reparacion.reparacionId !== reparacionId);
    }
}