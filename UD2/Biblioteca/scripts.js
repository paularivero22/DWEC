'use strict';
import { $biblio } from './gestorBiblioteca.js';

const $contenido = document.getElementById('contenido');
const $formularioBusqueda = document.getElementById('formularioBusqueda');
const $tituloBusqueda = document.getElementById('tituloBusqueda');
const $buscarBtn = document.getElementById('buscarBtn');

$biblio.sacarDatos();

const mostrarListadoAutores = () => {
    //insertar codigo html junto con la funcion
    $contenido.innerHTML = `
        <h2>Listado de Autores</h2>
        <ul>
            ${$biblio.generarHTMLListadoAutores()}  // Genera el HTML con el listado de autores
        </ul>
    `;

    //event listener para cada botón "Ver" de autor con un for
    const botones = document.querySelectorAll('.biblio-autor-ver'); // obtiene todos los botones

    //for para cada boton 
    for (const boton of botones) {
        boton.addEventListener('click', (event) => {
            const autorId = event.target.dataset.id; 
            const autor = $biblio.buscarAutor(autorId);
            $contenido.innerHTML = $biblio.generarHTMLResultadoBuscador(autor);
        });
    }
};

const mostrarListadoBibliotecas = () => {
    $contenido.innerHTML = `
        <h2>Listado de Bibliotecas</h2>
        <ul>
            ${$biblio.generarHTMLListadoBibliotecas()}  // Genera el HTML con el listado de bibliotecas
        </ul>
    `;
};

const mostrarListadoLibros = () => {
    $contenido.innerHTML = `
        <h2>Listado de Libros</h2>
        <ul>
            ${$biblio.generarHTMLListadoLibros()}  
        </ul>
    `;
};

const buscarLibro = () => {
    const titulo = $tituloBusqueda.value.trim(); //trim elimina los espacios por delante y por detras para evitar errores 

    if (titulo) {  // comprobar si el título no está vacío
        const libro = $biblio.buscarLibrosPorTitulo(titulo);
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

const mostrarFormularioBusqueda = () => {
    $formularioBusqueda.style.display = 'block';  //se muestra en formato block
    $contenido.innerHTML = '';
};

//event listener para cada botón de navegación del nav (menu)
document.getElementById('listarAutores').addEventListener('click', (event) => {
    event.preventDefault();  //previene la recarga de la pagina
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

//event listener del botón de búsqueda
$buscarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    buscarLibro();
});

// al cargar la pagina se muestra por defecto el listado de libros
mostrarListadoLibros();