import { Tarea } from './Tarea.js';
import tareas from './datos.js';

/*
1. localizar los elementos de la pagina y guardarlos en  constantes
    - el cuerpo de la tabla, el formulario, el input de filtro, el boton de nuevo y el de guardar
2. al iniciar la app carga la lista de tareas y que mire el valor del filtro
3. cuando cargo la tabla en cada fila tiene que tener la clase fila, la clase pasada y el boton de borrar
4. y cuando se haga click sobre la fila se tiene que cargar en el formulario
5. cuando se pulse el boton guardar hay que validar todos los campos (for)
6. cuando se pulse guardar si estamos editando la tarea la buscamos en la lista de tareas y se actualiza
7. si la tarea es nuevo se asigna  el id y se añade a la lista de tareas
8. llamar a recargar lista
*/

const barra = document.getElementById('barraBusqueda');
const botonNuevo = document.getElementById('nueva');
const cuerpoTabla = document.querySelector('.tabla-cuerpo');
const formCreacion = document.forms['frmTarea'];
const botonGuardar = document.getElementById('guardar');

let listaTareas = [];

function cargarDatos() {
    for (let tarea of tareas) {
        let tareaNueva = new Tarea(tarea.tareaId, tarea.titulo, tarea.prioridad, tarea.fechaRegistro, tarea.fechaLimite, tarea.descripcion, tarea.responsable, tarea.completada);
        listaTareas.push(tareaNueva);
    }
}

function generarHTMLListadoTareas(filtro = '') {
    const contenedor = document.createElement("div");

    for (let tarea of listaTareas) {
        if (filtro.length === 0) {
            const fila = document.createElement("div");
            fila.classList.add("fila");

            //titulo
            const titulo = document.createElement("div");
            titulo.textContent = tarea.titulo;
            fila.appendChild(titulo);

            //prioridad
            const prioridad = document.createElement("div");
            prioridad.textContent = tarea.prioridad;
            fila.appendChild(prioridad);

            //fecha limite
            const fechaLimite = document.createElement("div");
            fechaLimite.textContent = tarea.fechaLimite;
            fila.appendChild(fechaLimite);

            // boton borrar
            const acciones = document.createElement("div");
            const botonBorrar = document.createElement("button");
            botonBorrar.type = "button";
            botonBorrar.classList.add("borrar-tarea");
            botonBorrar.dataset.id = tarea.tareaId; /*agrega el id de la tarea correspondiente*/
            botonBorrar.textContent = "Borrar";
            acciones.appendChild(botonBorrar);
            fila.appendChild(acciones);

            contenedor.appendChild(fila);

            /*tareasHTML += `
            <div class="fila">
                <div>${tarea.titulo}</div>
                <div>${tarea.prioridad}</div>
                <div>${tarea.fechaLimite}</div>
                <div>
                    <button type="button" class="borrar-tarea" data-id="${tarea.tareaId}">Borrar</button>
                </div>
            </div>`;*/
        } else {
            if(tarea.titulo.inludes(filtro)) {
                tareasHTML += `
                <div class="fila">
                    <div>${tarea.titulo}</div>
                    <div>${tarea.prioridad}</div>
                    <div>${tarea.fechaLimite}</div>
                    <div>
                        <button type="button" class="borrar-tarea" data-id="${tarea.tareaId}">Borrar</button>
                    </div>
                </div>`;
            }
        }
    }
}

function mostrarTabla(filtro = '') {
    cargarDatos();
    const tareasHTML = generarHTMLListadoTareas(filtro);
    cuerpoTabla.appendChild(tareasHTML);
}

function buscarTarea(titulo) {
    for (let tarea of listaTareas) {
        if (tarea.titulo === titulo) {
            return tarea;
        }
    }
}

function crearTarea(nueva) {
    const titulo = document.getElementById('titulo');
    const prioridad = document.getElementById('prioridad');
    const fechaRegistro = document.getElementById('fechaRegistro');
    const fechaLimite = document.getElementById('fechaLimite');
    const descripcion = document.getElementById('descripcion');
    const responsable = document.getElementById('responsable');
    const completada = document.getElementById('completada');
    const botonGuardar = document.getElementById('guardar');

    let tareaNueva = new Tarea(listaTareas.length, titulo, prioridad, fechaRegistro, fechaLimite, descripcion, responsable, completada);
    listaTareas.push(tareaNueva);
}

function editarTarea() {
    const id = document.getElementById('id');
    const nuevoTitulo = document.getElementById('titulo');
    const nuevaPrioridad = document.getElementById('prioridad');
    const nuevaFechaRegistro = document.getElementById('fechaRegistro');
    const nuevaFechaLimite = document.getElementById('fechaLimite');
    const nuevaDescripcion = document.getElementById('descripcion');
    const nuevoResponsable = document.getElementById('responsable');
    const completada = document.getElementById('completada');
    const botonGuardar = document.getElementById('guardar');


}
/* guardar lleva click() 
botonGuardar.addEventListener('click', function(
    let tareaAModificar = buscarTarea(id);
    tareaAModificar.titulo = nuevoTitulo;
    tareaAModificar.prioridad = nuevaPrioridad;
    tareaAModificar.fechaRegistro = nuevaFechaRegistro;
    tareaAModificar.fechaLimite = nuevaFechaLimite;
    tareaAModificar.descripcion = nuevaDescripcion;
    tareaAModificar.responsable = nuevoResponsable;
    tareaAModificar.completada = completada;

    mostrarTabla();
));
*/
mostrarTabla("");
crearTarea();
editarTarea();