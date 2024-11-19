'use strict';
import { BD } from './BD.js';

export class GestionMecanica {
    #clienteBD;
    #contenedor;

    constructor(contenedor) {
        this.contenedor = contenedor;
        this.#clienteBD = new BD();
    }

    iniciarApp(selector) {
        
    }

    #generaHTMLBase() {
        return `
            <header>
        <h1>Gestión de Biblioteca</h1>
    </header>

    <nav>
        <ul>
            <li><a href="#" id="inicio">Inicio</a></li>
            <li><a href="#" id="listado">Vehiculos</a></li>
            <li><a href="#" id="noTerminadas">Reparaciones no terminados</a></li>
            <li><a href="#" id="noPagadas">Reparaciones</a></li>
            <li><a href="#" id="presupuestos">Presupuestos</a></li>
        </ul>
    </nav>

    <div id="resultados">

    </div>
    `;
    }

    #generarHTMLInicio() {
        return `
        <h1>Buscar Vehículo</h1>
        <form id="buscador">
          <label for="matricula">Matrícula:</label>
          <input type="text" id="matricula" placeholder="Introduce matrícula">
          
          <label for="telefono">Teléfono:</label>
          <input type="text" id="telefono" placeholder="Introduce teléfono">

          <button type="button" onclick="buscarVehiculos()">Buscar</button>
        </form>
        <h2>Resultados</h2>
        <ul id="resultados">
          
        </ul>
        `;
    }

    #generarHTMLVehiculos(vehiculos) {
        let HTML = `<div>`;
        for(let vehiculo of vehiculos) {
            HTML += `<div class="fila">
                <div>${vehiculo.vehiculoId}</div>
                <div>${vehiculo.matricula}</div>
                <div>${vehiculo.marca}</div>
                <div>${vehiculo.modelo}</div>
                <div>${vehiculo.año}</div>
                <div>${vehiculo.motor}</div>
                <div>${vehiculo.propietario}</div>
            </div>
            `;
        }
        HTML += `<button class="crearVehiculo">Crear Vehiculo</button>`;
        HTML += `</div>`;
        return HTML;
    }

    #generarHTMLVehiculo(vehiculoId) {
        let vehiculos = this.#clienteBD.obtenerVehiculos();
        let vehiculoEncontrado;
        
        for(let vehiculo of vehiculos) {
            if(vehiculo.vehiculoId === vehiculoId) {
                vehiculoEncontrado = vehiculo;
            }
        }
        
        return `<form id="editar-libro-form">
            <h2>Editar Libro</h2>
            <p>ID: ${vehiculoEncontrado.vehiculoId}</p>

            <label for="matricula">Matricula: </label>
            <input type="text" name="matricula" id="matricula" value="${vehiculoEncontrado.matricula}" required></input>
            
            <label for="marca">Marca: </label>
            <input type="text" name="marca" id="marca" value="${vehiculoEncontrado.marca}" required></input>

            <label for="modelo">Modelo: </label>
            <input type="text" name="modelo" id="modelo" value="${vehiculoEncontrado.modelo}" required></input>

            <label for="año">Año: </label>
            <input type="text" name="año" id="año" value="${vehiculoEncontrado.año}" required></input>

            <label for="motor">Motor: </label>
            <input type="text" name="motor" id="motor" value="${vehiculoEncontrado.motor}" required></input>
            
            <label for="propietario">Propietario: </label>
            <input type="text" name="propietario" id="propietario" value="${vehiculoEncontrado.propietario}" required></input>

            <button type="submit">Guardar Cambios</button>
        </form>`;
    }

    #generarHTMLReparacionesVehiculo(vehiculoId) {

    }

    #generarHTMLReparaciones(reparaciones) {

    }

    #generarHTMLReparación(reparaciónId=0, vehiculoId=0) {

    }


}