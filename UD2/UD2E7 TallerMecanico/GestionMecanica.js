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
        // Obtener el contenedor principal donde se va a insertar el contenido
        const contenedor = document.querySelector(selector);

        // Generar el HTML base (cabecera, navegación)
        contenedor.innerHTML = this.#generaHTMLBase();

        // Agregar los eventos a los enlaces de navegación
        this.agregarEventos();

        // Cargar los vehículos por defecto al cargar la página
        this.mostrarVehiculos();
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

    <div id="app">

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
        for (let vehiculo of vehiculos) {
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

        for (let vehiculo of vehiculos) {
            if (vehiculo.vehiculoId === vehiculoId) {
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
        let reparaciones = this.#clienteBD.obtenerReparaciones("vehiculoId", vehiculoId);
        let vehiculo = this.#clienteBD.obtenerVehiculo("id", vehiculoId);
        return `
            <h2>Reparaciones de ${vehiculo.matricula}</h2>
            <button id="nuevaReparacion" data-vehiculo-id="${vehiculoId}">Nueva Reparación</button>
            <ul>
                ${reparaciones
                .map(r => `
                        <li>
                            <strong>${r.fecha}</strong> - ${r.terminado ? "Terminado" : "Pendiente"}
                            <button data-id="${r.id}" class="verReparacion">Ver</button>
                            <button data-id="${r.id}" class="borrarReparacion">Borrar</button>
                        </li>
                    `)
                .join("")}
            </ul>
        `;
    }

    #generarHTMLReparaciones(reparaciones) {
        return `
        <h2>Listado de Reparaciones</h2>
        <ul>
            ${reparaciones
                .map(reparacion => `
                    <li>
                        <strong>Fecha:</strong> ${reparacion.fecha} - 
                        <strong>Vehículo:</strong> ${this.#clienteBD.obtenerVehiculo("id", reparacion.vehicucloId)?.matricula || "Desconocido"} - 
                        <strong>Estado:</strong> ${reparacion.terminado ? "Terminado" : "En Proceso"} - 
                        <strong>Pagado:</strong> ${reparacion.pagado ? "Sí" : "No"}
                        <button data-id="${reparacion.id}" class="verReparacion">Ver</button>
                        <button data-id="${reparacion.id}" class="borrarReparacion">Borrar</button>
                    </li>
                `).join("")}
        </ul>
    `;
    }

    #generarHTMLReparacion(reparaciónId = 0, vehiculoId = 0) {
        let reparación;
        if (reparaciónId) {
            reparación = this.#clienteBD.obtenerReparacion(reparaciónId);
        } else {
            reparación = { id: 0, vehiculoId, fecha: "", terminado: false, pagado: false, trabajos: [] };
        }


        let vehiculo = this.#clienteBD.obtenerVehiculo("id", reparación.vehiculoId);

        return `
        <h2>${reparaciónId ? "Editar Reparación" : "Nueva Reparación"}</h2>
        <h3>Vehículo: ${vehiculo.matricula} - Teléfono: ${vehiculo.propietario.telefono}</h3>
        <form id="formReparacion">
            <label>Fecha:</label>
            <input type="date" id="fecha" value="${reparación.fecha || new Date().toISOString().split("T")[0]}" required>

            <label>Terminado:</label>
            <input type="checkbox" id="terminado" ${reparación.terminado ? "checked" : ""}>

            <label>Pagado:</label>
            <input type="checkbox" id="pagado" ${reparación.pagado ? "checked" : ""}>

            <h3>Trabajos</h3>
            <div id="listaTrabajos">
                ${reparación.trabajos
                .map((trabajo, index) => `
                        <div class="trabajo">
                            <input type="text" value="${trabajo.descripcion}" placeholder="Descripción" required>
                            <input type="number" value="${trabajo.precio}" placeholder="Precio (€)" required>
                            <button type="button" class="borrarTrabajo" data-index="${index}">Borrar</button>
                        </div>
                    `).join("")}
            </div>

            <button type="button" id="agregarTrabajo">Añadir Trabajo</button>
            <button type="submit">${reparaciónId ? "Guardar Cambios" : "Crear Reparación"}</button>
        </form>
    `;
    }

    obtenerVehiculos() {
        return this.#clienteBD.obtenerVehiculos();
    }

    obtenerReparaciones() {
        return this.#clienteBD.obtenerReparaciones();
    }

    agregarEventos() {
        document.getElementById("inicio").addEventListener("click", () => this.mostrarInicio());
        document.getElementById("listado").addEventListener("click", () => this.mostrarVehiculos());
        document.getElementById("noTerminadas").addEventListener("click", () => this.mostrarReparacionesNoTerminadas());
        document.getElementById("noPagadas").addEventListener("click", () => this.mostrarReparacionesNoPagadas());
        document.getElementById("presupuestos").addEventListener("click", () => this.mostrarPresupuestos());
    }




    mostrarInicio() {
        this.#contenedor.innerHTML = `
            <h1>Gestion de taller</h1>
        `;
    }

    mostrarVehiculos() {
        const vehiculos = this.obtenerVehiculos();
        this.#contenedor.innerHTML = this.generarHTMLVehiculos(vehiculos);
    }

    mostrarReparacionesNoTerminadas() {
        const reparaciones = this.obtenerReparaciones().filter(r => !r.terminada);
        this.#contenedor.innerHTML = this.generarHTMLReparaciones(reparaciones);
    }

    mostrarReparacionesNoPagadas() {
        const reparaciones = this.obtenerReparaciones().filter(r => !r.pagada);
        this.#contenedor.innerHTML = this.generarHTMLReparaciones(reparaciones);
    }

    mostrarPresupuestos() {
        const presupuestos = this.#clienteBD.obtenerReparaciones("presupuesto", true);
        this.#contenedor.innerHTML = `
            <h2>Presupuestos Pendientes</h2>
            <ul>
                ${presupuestos
                .map(p => `
                        <li>
                            <strong>Vehículo:</strong> ${this.#clienteBD.obtenerVehiculo("vehiculoId", p.vehiculoId)?.matricula || "Desconocido"} 
                            <strong>Fecha:</strong> ${p.fecha}
                            <button data-id="${p.reparacionId}" class="verReparacion">Ver</button>
                        </li>
                    `).join("")}
            </ul>
        `;
    }
}