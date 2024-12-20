'use strict';

export class Biblioteca {
    bibliotecaId;
    nombre;
    ubicacion;
    libros;

    constructor(bibliotecaId, nombre, ubicacion) {
        this.bibliotecaId = bibliotecaId;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.libros = [];
    }

    generarHTMLCreacion() {
        return `
            <form id="crear-biblioteca-form">
                <h1>Crar nueva Bilbioteca</h1>
                <label for="bibliotecaId">ID de la biblioteca: </label>
                <input type="text" name="bibliotecaId" id="bibliotecaId"></input>
    
                <label for="nombre">Nombre: </label>
                <input type="text" name="nombre" id="nombre"></input>
                
                <label for="ubicacion">Ubicacion: </label>
                <input type="text" name="ubicacion" id="ubicacion"></input>

                <button type="submit">Crear Biblioteca</button>
           </form>`;
    }

    generarHTMLEdicion() {
        return `
        <form id="editar-biblioteca-form">
          <h3>Editar Biblioteca</h3>
          <label>Nombre:</label>
          <input type="text" id="nombre" value="${this.nombre}" required>
          <label>Ubicación:</label>
          <input type="text" id="ubicacion" value="${this.ubicacion}" required>
          <button type="submit">Guardar Cambios</button>
        </form>
      `;
    }

    asignarLibro(libro) {
        this.libros.push(libro);
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
            <div id="detalles-biblioteca-${this.bibliotecaId}">
                <h3>${this.nombre}</h3>
                <p>Ubicación: ${this.ubicacion}</p>
                <h4>Libros en la Biblioteca:</h4>
                <ul>${librosHTML}</ul>
                <button id="editar-biblioteca-${this.bibliotecaId}">Editar</button>
                <button id="borrar-biblioteca-${this.bibliotecaId}">Borrar</button>
      </div>`;
      }
}