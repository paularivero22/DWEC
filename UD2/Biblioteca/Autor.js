'use strict';

export class Autor {
    autorId;
    nombre;
    nacionalidad;
    biografia;
    libros;

    constructor(autorId, nombre, nacionalidad, biografia) {
        this.autorId = autorId;
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.biografia = biografia;
        this.libros = [];
    }

    generarHTMLCreacion() {
        return `
        <form id="crear-autor-form">
            <h1>Crear nuevo Autor</h1>
            <label for="autorId">ID del autor: </label>
            <input type="text" name="autorId" id="autorId" required></input>

            <label for="nombre">Nombre: </label>
            <input type="text" name="nombre" id="nombre" required></input>
            
            <label for="nacionalidad">Nacionalidad: </label>
            <input type="text" name="nacionalidad" id="nacionalidad" required></input>

            <label for="biografia">Biografía: </label>
            <textarea name="biografia" id="biografia" required></textarea>

            <button type="submit">Crear Autor</button>
       </form>`;
    }

    generarHTMLPropiedades() {
        let librosHTML = '';
        if (this.libros.length > 0) {
            for (let libro of this.libros) {
                librosHTML += `<li>${libro.titulo}</li>`;
            }
        } else {
            librosHTML = "<p>No hay libros registrados.</p>";
        }
        return `
        <div id="detalles-autor-${this.autorId}">
            <h3>${this.nombre}</h3>
            <p>Nacionalidad: ${this.nacionalidad}</p>
            <p>Biografía: ${this.biografia}</p>
            <h4>Libros Publicados:</h4>
            <ul>${librosHTML}</ul>
            <button id="editar-autor-${this.autorId}">Editar</button>
            <button id="borrar-autor-${this.autorId}">Borrar</button>
            <button id="añadir-libro-${this.autorId}">Añadir Libro</button>
      </div>`;
    }

    generarHTMLEdicion() {
        return `
        <form id="editar-autor-form">
            <h3>Editar Autor</h3>
            <label>Nombre:</label>
            <input type="text" id="nombre" value="${this.nombre}" required>
            <label>Nacionalidad:</label>
            <input type="text" id="nacionalidad" value="${this.nacionalidad}" required>
            <label>Biografía:</label>
            <textarea id="biografia" required>${this.biografia}</textarea>

            <button type="submit">Guardar Cambios</button>
      </form>`;
    }

    añadirLibro(libro) {
        this.libros.push(libro);
    }

    eliminarLibro(titulo) {
        this.libros = this.libros.filter(libro => libro.titulo !== titulo);
    }
}