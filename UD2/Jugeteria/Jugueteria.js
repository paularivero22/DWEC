'use strict';
import { datos } from './datos.js';
import { Juguete } from './Juguete.js';
class Jugueteria {
    #contenedor;
    #juguetes;
    #contador;

    constructor() {
        this.#juguetes = [];
        this.#contador = 0;

        for (const juguete of datos) {
            let jugueteN = new Juguete(juguete.jugueteId, juguete.nombre, juguete.marca, juguete.precio.toFixed(2));
            this.#juguetes.push(jugueteN);
        }
    }

    iniciarApp(selector) {
        this.#contenedor = document.querySelector(selector);
        if (!this.#contenedor) {
            alert("Contenedor no encontrado");
            return;
        }
        this.#navegarInicio();
    }

    obtenerJuguetes(filtro = '') {
        let resultado;

        if (filtro.trim.length < 0) {
            resultado = this.#juguetes;
        } else {
            for (let juguete of this.#juguetes) {
                if (juguete.nombre == filtro) {
                    resultado += juguete;
                }
            }
        }
        return resultado;
    }

    obtenerJuguete(jugueteId) {
        for (let juguete of this.#juguetes) {
            if (juguete.jugueteId == jugueteId) {
                return juguete;
            }
        }
    }

    crearJuguete(nuevo) {
        this.#juguetes.push(nuevo);
    }

    borrarJuguete(jugueteId) {
        this.#juguetes = this.#juguetes.filter(juguete => juguete.jugueteId !== jugueteId);
    }

    #navegarInicio() {
        this.#contenedor.innerHTML = `
        ${this.generarHTMLNavegacion()}
        ${this.generarHTMLBuscador()}
        ${this.generarHTMLListado(this.#juguetes)}
    `;
        this.asignarEventos();
    }

    #navegarListadoJuguetes() {
        let html;

        for (let juguete of this.#juguetes) {
            html += juguete.generarHTMLPropiedades();
        }

        this.#contenedor.innerHTML(html);
    }

    #navegarPropiedades(juguete) {

    }

    asignarEventos() {
        
    }

    generarHTMLNavegacion() {
        return `
        <nav data-componente="navegacion" class="jg-navegacion">
            <ul>
                <li><a href="#" data-destino="inicio">Inicio</a></li>
                <li><a href="#" data-destino="listadojuguetes">Listado</a></li>
            </ul>
        </nav>
    `;
    }

    generarHTMLBuscador() {
        return `
        <form data-componente="buscador" name="jg-buscador">
            <input type="text" id="jg-buscador-filtro" placeholder="Buscar por nombre..." />
            <button type="submit">Buscar</button>
        </form>
    `;
    }

    generarHTMLListado(listaJuguetes) {
        let listadoHTML = `
            <div data-componente="listado" class="jg-tabla">
                <div class="jg-tabla-fila jg-cabecera">
                    <div>Nombre</div>
                    <div>Marca</div>
                    <div>Precio</div>
                    <div>Acciones</div>
                </div>
        `;
    
        for (let i = 0; i < listaJuguetes.length; i++) {
            const juguete = listaJuguetes[i];
            listadoHTML += `
                <div class="jg-tabla-fila">
                    <div>${juguete.nombre}</div>
                    <div>${juguete.marca}</div>
                    <div>${juguete.precio}</div>
                    <div>
                        <button data-accion="ver" data-id="${juguete.jugueteId}">Ver</button>
                        <button data-accion="borrar" data-id="${juguete.jugueteId}">Borrar</button>
                    </div>
                </div>
            `;
        }
        return listadoHTML;
    }
    
} 