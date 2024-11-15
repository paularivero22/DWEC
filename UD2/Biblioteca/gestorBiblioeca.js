'use strict';
import { Libro } from './Libro.js';
import { Autor } from './Autor.js';
import { Biblioteca } from './Biblioteca.js';
import { Prestamo } from './Prestamo.js';
import { datosIniciales } from './datos.js';

const $biblio = (function () {
    let autores = [];
    let libros = [];
    let bibliotecas = [];

    function sacarDatos() {

        let objJSON = JSON.parse(datosIniciales);

        for (let autor of objJSON.autores) {
            let autorN = new Autor(autor.autorId, autor.nombre, autor.nacionalidad, autor.biografia);

            for (let libro of autor.libros) {
                autorN.libros.push(libro);
            }

            autores.push(autorN);
        }

        for (let libro of objJSON.libros) {
            let libroN = new Libro(libro.libroId, libro.titulo, libro.ISBN, libro.autorId, libro.bibliotecaId);

            for (let prestamo of libroN.prestamos) {
                let prestamo = new Prestamo(fechaPrestamo, fechaDevolucion);
                libroN.prestamos.push(prestamo);
            }

            libros.push(libroN);
        }

        for (let biblioteca of objJSON.bibliotecas) {
            let bibliotecaN = new Biblioteca(biblioteca.bibliotecaId, biblioteca.nombre, biblioteca.ubicacion);
            bibliotecas.push(bibliotecaN);
        }
    }

    function mostrarLibro(libro) {
        return "ID: " + libro.libroId + "Titulo: " + libro.titulo + "ISBN: " + libro.ISBN + "ID de autor: " + libro.autorId + "ID de biblioteca: " + libro.bibliotecaId;
    }

    function mostrarAutor(autor) {
        return "ID: " + autor.autorId + "Nombre: " + autor.nombre + "Nacionalidad: " + autor.nacionalidad + "Biografia: " + autor.biografia;
    }

    function mostrarLibrosAutor(autor) {
        let libros = '';
        for (let libro of autor.libros) {
            libros += libro + ' ';
        }
        return libros;
    }

    return {
        generarHTMLListadoAutores() {
            return autores.map(
                autor =>
                    `<li>${autor.nombre} (${autor.nacionalidad})
                        <button class="biblio-autor-ver" data-id="${autor.autorId}">Ver</button>
                        <button class="biblio-autor-editar" data-id="${autor.autorId}">Editar</button>
                        <button class="biblio-autor-borrar" data-id="${autor.autorId}">Borrar</button>
                    </li>`
            ).join('');
        },

        generarHTMLListadoBibliotecas() {
            return bibliotecas.map(
                biblioteca =>
                    `<li>${biblioteca.nombre} - ${biblioteca.ubicacion}
                        <button class="biblio-biblioteca-ver" data-id="${biblioteca.bibliotecaId}">Ver</button>
                        <button class="biblio-biblioteca-editar" data-id="${biblioteca.bibliotecaId}">Editar</button>
                        <button class="biblio-biblioteca-borrar" data-id="${biblioteca.bibliotecaId}">Borrar</button>
                    </li>`
            ).join('');
        },

        generarHTMLListadoLibros() {
            return libros.map(
                libro =>
                    `<li>${libro.titulo} (ISBN: ${libro.ISBN})
                        <button class="biblio-libro-ver" data-id="${libro.libroId}">Ver</button>
                        <button class="biblio-libro-editar" data-id="${libro.libroId}">Editar</button>
                        <button class="biblio-libro-borrar" data-id="${libro.libroId}">Borrar</button>
                    </li>`
            ).join('');
        },

        buscarLibrosPorTitulo(titulo) {
            for (let libro of libros) {
                if (libro.titulo === titulo) {
                    return libro;
                }
            }
        },

        buscarLibrosPorAutor(autor) {
            for (let libro of libros) {
                if (libro.autorId === autor) {
                    return libro;
                }
            }
        },

        generarHTMLResultadoBuscador(resultados) {
            if (resultados instanceof Libro) {
                let libro = resultados;
                return `<table>
                    <tr>
                        <td>ID</td>
                        <td>Titulo</td>
                        <td>ISBN</td>
                        <td>ID Autor</td>
                        <td>ID Biblioteca</td>
                    </tr>
                    <tr>
                        <td>libro.libroId</td>
                        <td>libro.titulo</td>
                        <td>libro.autorId</td>
                        <td>libro.bibliotecaId</td>
                    </tr>
                </table>`;
            }

            if(resultados instanceof Autor) {
                let autor = resultados;
                let libros = mostrarLibrosAutor(autor);
                return `<table>
                    <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Nacionalidad</td>
                        <td>Biografia</td>
                        <td>Libros</td>
                    </tr>
                    <tr>
                        <td>autor.autorId</td>
                        <td>autor.nombre</td>
                        <td>autor.nacionalidad</td>
                        <td>autor.biografia</td>
                        <td>libros<td>
                    </tr>
                </table>`;
            }

            if(resultados instanceof Biblioteca) {
                let biblioteca = resultados;

                return `<table>
                    <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Ubicacion</td>
                    </tr>
                    <tr>
                        <td>autor.autorId</td>
                        <td>autor.nombre</td>
                        <td>autor.nacionalidad</td>
                        <td>autor.biografia</td>
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
        },

        buscarAutor(autorId) {
            for(let autor of autores) {
                if(autor.autorId === autorId) {
                    return autor;
                }
            }
        },

        buscarBiblioteca(bibliotecaId) {
            for(let biblioteca of bibliotecas) {
                if(biblioteca.bibliotecaId === bibliotecaId) {
                    return biblioteca;
                }
            }
        },

        crearLibro(libro) {
            libros.push(libro);
        },

        crearAutor(autor) {
            autores.push(autor);
        },

        crearBiblioteca(biblioteca) {
            biblioteca.push(biblioteca);
        },

        borrarLibro(libroId) {
            
        },

        borrarAutor(autorId) {

        },

        borrarBiblioteca(bibliotecaId) {

        },

        devolverPrestamo(libro) {

        },

        crearPrestamo(libro) {

        },
    }
})();