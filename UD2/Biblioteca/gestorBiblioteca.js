'use strict';
import { Libro } from './Libro.js';
import { Autor } from './Autor.js';
import { Biblioteca } from './Biblioteca.js';
import { Prestamo } from './Prestamo.js';
import { datos } from './datos.js';

export const $biblio = (function () {
    let autores = [];
    let libros = [];
    let bibliotecas = [];

    function sacarDatos() {
        let objJSON = datos;

        for (let autor of objJSON.autores) {
            let autorN = new Autor(autor.autorId, autor.nombre, autor.nacionalidad, autor.biografia);

            for (let libro of autor.libros) {
                autorN.libros.push(libro);
            }

            autores.push(autorN);
        }

        for (let libro of objJSON.libros) {
            let libroN = new Libro(libro.libroId, libro.titulo, libro.ISBN, libro.autorId, libro.bibliotecaId);

            for (let prestamo of libro.prestamos) {
                let prestamoObj = new Prestamo(prestamo.fechaPrestamo, prestamo.fechaDevolucion);
                libroN.prestamos.push(prestamoObj);
            }

            libros.push(libroN);
        }

        for (let biblioteca of objJSON.bibliotecas) {
            let bibliotecaN = new Biblioteca(biblioteca.bibliotecaId, biblioteca.nombre, biblioteca.ubicacion);
            bibliotecas.push(bibliotecaN);
        }
    }

    function mostrarLibrosAutor(autor) {
        let libros = '';
        for (let libro of autor.libros) {
            libros += `${libro.titulo}, `;  // Asumimos que libro tiene propiedad 'titulo'
        }
        return libros;
    }

    return {
        sacarDatos,

        generarHTMLListadoAutores() {
            return autores.map(
                autor => `
                    <li>${autor.autorId} - ${autor.nombre} (${autor.nacionalidad})
                        <button class="biblio-autor-ver" data-id="${autor.autorId}">Ver</button>
                        <button class="biblio-autor-editar" data-id="${autor.autorId}">Editar</button>
                        <button class="biblio-autor-borrar" data-id="${autor.autorId}">Borrar</button>
                        <button class="biblio-autor-mostrarLibros" data-id="${autor.autorId}">Mostrar Libros</button>
                    </li>`
            ).join('');
        },

        generarHTMLListadoBibliotecas() {
            return bibliotecas.map(
                biblioteca => `
                    <li>${biblioteca.bibliotecaId} - ${biblioteca.nombre} - ${biblioteca.ubicacion}
                        <button class="biblio-biblioteca-ver" data-id="${biblioteca.bibliotecaId}">Ver</button>
                        <button class="biblio-biblioteca-editar" data-id="${biblioteca.bibliotecaId}">Editar</button>
                        <button class="biblio-biblioteca-borrar" data-id="${biblioteca.bibliotecaId}">Borrar</button>
                    </li>`
            ).join('');
        },

        generarHTMLListadoLibros() {
            return libros.map(
                libro => `
                    <li>${libro.libroId} - ${libro.titulo}, (ISBN: ${libro.ISBN})
                        <button class="biblio-libro-ver" data-id="${libro.libroId}">Ver</button>
                        <button class="biblio-libro-editar" data-id="${libro.libroId}">Editar</button>
                        <button class="biblio-libro-borrar" data-id="${libro.libroId}">Borrar</button>
                    </li>`
            ).join('');
        },

        buscarLibrosPorTitulo(titulo) {
            return libros.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());
        },

        buscarLibrosPorAutor(autorId) {
            return libros.filter(libro => libro.autorId === autorId);
        },

        generarHTMLResultadoBuscador(resultados) {
            if (resultados instanceof Libro) {
                return `<table>
                    <tr>
                        <td>ID</td>
                        <td>Titulo</td>
                        <td>ISBN</td>
                        <td>ID Autor</td>
                        <td>ID Biblioteca</td>
                    </tr>
                    <tr>
                        <td>${resultados.libroId}</td>
                        <td>${resultados.titulo}</td>
                        <td>${resultados.ISBN}</td>
                        <td>${resultados.autorId}</td>
                        <td>${resultados.bibliotecaId}</td>
                    </tr>
                </table>`;
            }

            if (resultados instanceof Autor) {
                let libros = mostrarLibrosAutor(resultados);
                return `<table>
                    <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Nacionalidad</td>
                        <td>Biografía</td>
                        <td>Libros</td>
                    </tr>
                    <tr>
                        <td>${resultados.autorId}</td>
                        <td>${resultados.nombre}</td>
                        <td>${resultados.nacionalidad}</td>
                        <td>${resultados.biografia}</td>
                        <td>${libros}</td>
                    </tr>
                </table>`;
            }

            if (resultados instanceof Biblioteca) {
                return `<table>
                    <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Ubicación</td>
                    </tr>
                    <tr>
                        <td>${resultados.bibliotecaId}</td>
                        <td>${resultados.nombre}</td>
                        <td>${resultados.ubicacion}</td>
                    </tr>
                </table>`;
            }
        },

        buscarLibro(libroId) {
            for(let libro of libros) {
                if(libro.libroId === libroId) {
                    return libro;
                }
            }
            //return libros.find(libro => libro.libroId === libroId);
        },

        buscarAutor(autorId) {
            return autores.find(autor => autor.autorId === autorId);
        },

        buscarBiblioteca(bibliotecaId) {
            return bibliotecas.find(biblioteca => biblioteca.bibliotecaId === bibliotecaId);
        },

        crearLibro(libro) {
            libros.push(libro);
        },

        crearAutor(autor) {
            autores.push(autor);
        },

        crearBiblioteca(biblioteca) {
            bibliotecas.push(biblioteca);
        },

        borrarLibro(libroId) {
            libros = libros.filter(libro => libro.libroId !== libroId);
        },

        borrarAutor(autorId) {
            autores = autores.filter(autor => autor.autorId !== autorId);
        },

        borrarBiblioteca(bibliotecaId) {
            bibliotecas = bibliotecas.filter(biblioteca => biblioteca.bibliotecaId !== bibliotecaId);
        },

        crearPrestamo(libro, fechaPrestamo, fechaDevolucion) {
            let prestamo = new Prestamo(fechaPrestamo, fechaDevolucion);
            libro.prestamos.push(prestamo);
        },

        devolverPrestamo(libro, fechaDevolucion) {
            let prestamo = libro.prestamos.find(p => p.fechaDevolucion === fechaDevolucion);
            if (prestamo) {
                prestamo.fechaDevolucion = fechaDevolucion;
            }
        }
    };
})();
