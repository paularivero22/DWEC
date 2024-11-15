'use strict';

export class Libro {
    libroId;
    titulo;
    ISBN;
    autorId;
    bibliotecaId;
    prestamos;
    estaDisponible;

    constructor(libroId, titulo, ISBN, autorId, bibliotecaId) {
        this.libroId = libroId;
        this.titulo = titulo;
        this.ISBN = ISBN;
        this.autorId = autorId;
        this.bibliotecaId = bibliotecaId;
        this.prestamos = []; //fechaPrestamo, fechaDevolucion
    }

    get estaDisponible() {
        let ultimo = this.prestamos.toSorted((a, b) => { return a.fechaPrestamo === b.fechaPrestamo })[this.prestamos.length];

        if (ultimo['fechaDevolucion'] != null) {
            return true;
        } else {
            return true;
        }
    }

    generarHTMLCreacion() {
        return `
        <form id="crear-libro-form">
            <h1>Crear nuevo libro</h1>
            <label for="libroId">ID del libro: </label>
            <input type="text" name="libroId" id="libroId"></input>

            <label for="titulo">Titulo: </label>
            <input type="text" name="titulo" id="titulo"></input>
            
            <label for="ISBN">ISBN: </label>
            <input type="text" name="ISBN" id="ISBN"></input>

            <label for="autorId">ID del autor</label>
            <input type="text" name="autorId" id="auorId"></input>

            <label for="bibliotecaId">ID de la biblioteca</label>
            <input type="text" name="bibliotecaId" id="bibliotecaId"></input>

            <label for="prestamos">Prestamos: </label>
            <input type="text" name="prestamos" id="prestamos"></input>
       </form>`;
    }

    generarHTMLPropiedades() {
        return `<div id="detalles-libro-${this.libroId}">
            <p>ID: ${this.libroId}</p>
            <p>Titulo: ${this.titulo}</p>
            <p>ISBN: ${this.ISBN}</p>
            <p>ID del Autor: ${this.autorId}</p>
            <p>ID de la biblioteca: ${this.bibliotecaId}</p>
            <button id="editarLibro">Editar</button>
            <button id="editarLibro">Borrar</button>
            <button id="listarPrestamos">Listar Prestamos</button>
            <button id="crearPrestamo">Crear Prestamo</button>
            <button id="devolver">Devolver</button>
        <div/>`;
    }

    generarHTMLEdicion() {
        return `<form id="editar-libro-form">
            <h2>Editar Libro</h2>
            <p>ID: ${this.libroId}</p>

            <label for="titulo">Titulo: </label>
            <input type="text" name="titulo" id="titulo" value="${this.titulo}" required></input>
            
            <label for="ISBN">ISBN: </label>
            <input type="text" name="ISBN" id="ISBN" value="${this.ISBN}" required></input>

            <button type="submit">Guardar Cambios</button>
        </form>`;
    }

    generarHTMLListadoPrestamos() {
        if (this.prestamos.length === 0) {
            return "<p>No hay préstamos registrados.</p>";
        }

        let prestamosHTML = `<h4>Préstamos de ${this.titulo}</h4><ul>`;
        let posicion = 1;

        for (let prestamo of this.prestamos) {
            prestamosHTML += `<li>Préstamo ${posicion}: Fecha de Préstamo - ${prestamo.fechaPrestamo}, Fecha de Devolución - ${prestamo.fechaDevolucion || "No devuelto"}</li>`;
            posicion++;
        }

        prestamosHTML += "</ul>";

        return prestamosHTML;
    }

    crearPrestamo() {
        if (this.estaDisponible) {
            const prestamo = {
                fechaPrestamo: new Date(),
                fechaDevolucion: undefined
            };
            this.prestamos.push(prestamo);
            this.estaDisponible = false;
        }
    }

    devolverPrestamo() {
        if (!this.estaDisponible) {
            for (let prestamo of prestamos) {
                if (prestamo['fechaDevolucion'] != undefined) {
                    prestamo['fechaDevolucion'] = new Date();
                }
            }
        }
    }
}