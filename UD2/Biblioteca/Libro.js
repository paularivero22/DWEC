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
        if (this.prestamos.length === 0) {
            return true;
        }

        const ultimoPrestamo = this.prestamos[this.prestamos.length - 1];
        return ultimoPrestamo.fechaDevolucion !== undefined;
    }

    generarHTMLCreacion() {
        return `
        <form id="crear-libro-form">
            <h1>Crear nuevo libro</h1>
            <label for="libroId">ID del libro: </label>
            <input type="text" name="libroId" id="libroId"></input>

            <label for="titulo">Título: </label>
            <input type="text" name="titulo" id="titulo"></input>
            
            <label for="ISBN">ISBN: </label>
            <input type="text" name="ISBN" id="ISBN"></input>

            <label for="autorId">ID del autor: </label>
            <input type="text" name="autorId" id="autorId"></input>

            <label for="bibliotecaId">ID de la biblioteca: </label>
            <input type="text" name="bibliotecaId" id="bibliotecaId"></input>

            <button type="submit">Crear Libro</button>
       </form>`;
    }

    generarHTMLPropiedades() {
        return `<div id="detalles-libro-${this.libroId}">
            <p>ID: ${this.libroId}</p>
            <p>Título: ${this.titulo}</p>
            <p>ISBN: ${this.ISBN}</p>
            <p>ID del Autor: ${this.autorId}</p>
            <p>ID de la biblioteca: ${this.bibliotecaId}</p>
            <button id="editarLibro-${this.libroId}">Editar</button>
            <button id="borrarLibro-${this.libroId}">Borrar</button>
            <button id="listarPrestamos-${this.libroId}">Listar Préstamos</button>
            <button id="crearPrestamo-${this.libroId}">Crear Préstamo</button>
            <button id="devolver-${this.libroId}">Devolver</button>
        </div>`;
    }

    generarHTMLEdicion() {
        return `<form id="editar-libro-form">
            <h2>Editar Libro</h2>
            <p>ID: ${this.libroId}</p>

            <label for="titulo">Título: </label>
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
        } else {
            console.log("El libro no está disponible para préstamo.");
        }
    }

    devolverPrestamo() {
        if (!this.estaDisponible) {
            for (let prestamo of this.prestamos) {
                if (prestamo.fechaDevolucion === undefined) {
                    prestamo.fechaDevolucion = new Date();
                    this.estaDisponible = true;
                    break; 
                }
            }
        } else {
            console.log("El libro ya está disponible.");
        }
    }

    borrarLibro() {
        console.log(`El libro con ID ${this.libroId} ha sido borrado.`);
    }

    editarLibro(nuevoTitulo, nuevoISBN) {
        this.titulo = nuevoTitulo;
        this.ISBN = nuevoISBN;
        console.log(`Libro actualizado: ${this.titulo} (ISBN: ${this.ISBN})`);
    }

}