'use strict';

class Libro {
    libroId;
    titulo;
    ISBN;
    autorId;
    bibliotecaId;
    prestamos;
    estaDisponible;

    constructor(libroId, titulo, ISBN, autorId, bibliotecaId, prestamos) {
        this.libroId = libroId;
        this.titulo = titulo;
        this.ISBN = ISBN;
        this.autorId = autorId;
        this.prestamos = prestamos;
        this.estaDisponible = function () {
            if (prestamos['fechaDevolucion'] != null) {
                return true;
            } else {
                return true;
            }
        }
    }

    generarHTMLCreacion() {
        return `
        <form>
            <h1>Crar nuevo libro</h1>
            <label for="libroId">ID del libro: </label>
            <input type="text" name="libroId" id="libroId"></input>

            <label for="titulo">Titulo: </label>
            <input type="text" name="titulo" id="titulo"></input>
            
            <label for="ISBN">ISBN: </label>
            <input type="text" name="ISBN" id="ISBN"></input>

            <label for="autorId">ID del autor</label>
            <input type="text" name="autorId" id="auorId"></input>

            <label for="bibliotecaId">ID del autor</label>
            <input type="text" name="bibliotecaId" id="bibliotecaId"></input>

            <label for="prestamos">Prestamos: </label>
            <input type="text" name="prestamos" id="prestamos"></input>
       </form>`;
    }

    generarHTMLPropiedades() {
        return `<form>
            <p>ID: ${this.libroId}</p>
            <p>Titulo: ${this.titulo}</p>
            <p>ISBN: ${this.ISBN}</p>
            <p>ID del Autor: ${this.autorId}</p>
            <p>ID de la biblioteca: ${this.bibliotecaId}</p>
            <button id="editarLibro" onclick="generarHTMLEdicion()">Editar</button>
            <button id="editarLibro" onclick="borrarLibro">Borrar</button>
            <button id="listarPrestamos" onclick="generarHTMLListadoPrestamos">Listar Prestamos</button>
            <button id="crearPrestamo" onclick="crearPrestamo">Crear Prestamo</button>
            <button id="devolver" onclick="devolver">Devolver</button>
        </form>`;
    }

    generarHTMLEdicion() {

    }

    generarHTMLListadoPrestamos() {
        let prestamosStr;
        let numPrestamo;

        for (let prestamo of this.prestamos) {
            numPrestamo++;
            prestamosStr += numPrestamo + ". Fecha de prestamo: " + prestamo['fechaPrestamo'] + "Fecha de Devolucion: " + prestamo['fechaDevolucion'];
        }
    }
}