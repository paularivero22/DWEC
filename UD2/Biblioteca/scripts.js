'use strict';
import { $biblio } from './gestorBiblioteca.js';

const $contenido = document.getElementById('contenido');
const $formularioBusqueda = document.getElementById('formularioBusqueda');
const $tituloBusqueda = document.getElementById('tituloBusqueda');
const $buscarBtn = document.getElementById('buscarBtn');

// Asegurarse de que los datos estén cargados
$biblio.sacarDatos();

// Función para mostrar el listado de autores
const mostrarListadoAutores = () => {
    $contenido.innerHTML = `
        <h2>Listado de Autores</h2>
        <ul>
            ${$biblio.generarHTMLListadoAutores()}
        </ul>
    `;
    // Asignación de eventos a los botones "Ver" de los autores
    document.querySelectorAll('.biblio-autor-ver').forEach(button => {
        button.addEventListener('click', (event) => {
            const autorId = event.target.dataset.id;
            const autor = $biblio.buscarAutor(autorId);
            // Mostrar los detalles del autor en el contenido
            $contenido.innerHTML = $biblio.generarHTMLResultadoBuscador(autor);
        });
    });
};

// Función para mostrar el listado de bibliotecas
const mostrarListadoBibliotecas = () => {
    $contenido.innerHTML = `
        <h2>Listado de Bibliotecas</h2>
        <ul>
            ${$biblio.generarHTMLListadoBibliotecas()}
        </ul>
    `;
};

// Función para mostrar el listado de libros
const mostrarListadoLibros = () => {
    $contenido.innerHTML = `
        <h2>Listado de Libros</h2>
        <ul>
            ${$biblio.generarHTMLListadoLibros()}
        </ul>
    `;
};

// Función para buscar un libro por título
const buscarLibro = () => {
    const titulo = $tituloBusqueda.value.trim(); // Obtener el valor del input
    if (titulo) {
        const libro = $biblio.buscarLibrosPorTitulo(titulo); // Buscar libro por título
        if (libro) {
            $contenido.innerHTML = `
                <h2>Resultado de búsqueda</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>ISBN</th>
                        <th>ID Autor</th>
                        <th>ID Biblioteca</th>
                    </tr>
                    <tr>
                        <td>${libro.libroId}</td>
                        <td>${libro.titulo}</td>
                        <td>${libro.ISBN}</td>
                        <td>${libro.autorId}</td>
                        <td>${libro.bibliotecaId}</td>
                    </tr>
                </table>
            `;
        } else {
            $contenido.innerHTML = `<p>No se encontró el libro con el título "${titulo}"</p>`;
        }
    } else {
        alert("Por favor, ingrese un título.");
    }
};

// Mostrar el formulario de búsqueda
const mostrarFormularioBusqueda = () => {
    $formularioBusqueda.style.display = 'block';  // Hacer visible el formulario de búsqueda
    $contenido.innerHTML = '';  // Limpiar el contenido principal
};

// Asignación de eventos a los botones
document.getElementById('listarAutores').addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir recarga de página
    mostrarListadoAutores();
});

document.getElementById('listarBibliotecas').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarListadoBibliotecas();
});

document.getElementById('listarLibros').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarListadoLibros();
});

document.getElementById('buscarLibro').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarFormularioBusqueda();
});

// Event listener para el botón de búsqueda
$buscarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    buscarLibro();
});

// Mostrar el listado de libros por defecto al cargar la página
mostrarListadoLibros();
