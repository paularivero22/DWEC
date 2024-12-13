import { Tarea } from './Tarea.js';
import tareas from './datos.js';

/*
5. cuando se pulse el boton guardar hay que validar todos los campos (for)
6. cuando se pulse guardar si estamos editando la tarea la buscamos en la lista de tareas y se actualiza
7. si la tarea es nuevo se asigna  el id y se añade a la lista de tareas
8. llamar a recargar lista
*/

//1. Localizar los elementos de la pagina y guardarlas en las constantes

//barra de busqueda para el filtro
const barra = document.getElementById('barraBusqueda');

//boton para crear una tarea
const botonNuevo = document.getElementById('nueva');

//cuerpo de la tabla donde insertar las tareas
const cuerpoTabla = document.querySelector('.tabla-cuerpo');

//formulario de creacion
const formCreacion = document.forms['frmTarea'];

//boton guardar del formulario
const botonGuardar = document.getElementById('guardar');
const accion = document.getElementById('accionForm');

let listaTareas = [];

//funcion para cargar los datos del archivo datos
function cargarDatos() {
    for (let tarea of tareas) {
        let tareaNueva = new Tarea(tarea.tareaId, tarea.titulo, tarea.prioridad, tarea.fechaRegistro, tarea.fechaLimite, tarea.descripcion, tarea.responsable, tarea.completada);
        listaTareas.push(tareaNueva);  // Usar la variable global listaTareas
    }
}

//2. Al iniciar la app carga la lista de tareas y que mire el valor del filtro
function iniciarApp() {
    cargarDatos();
    mostrarTabla(barra.value);
}

barra.addEventListener('input', (e) => {
    mostrarTabla(e.target.value);  
});

//3. Cuando cargo la tabla en cada fila tiene que tener la clase fila, la clase pasada y el boton de borrar
function generarHTMLListadoTareas(filtro = '') {
    cuerpoTabla.innerHTML = '';

    for (let tarea of listaTareas) {
        //si no hay ningun filtro o si el titulo de la tarea contiene el filtro
        if (filtro.length === 0 || tarea.titulo.includes(filtro)) {
            const fila = document.createElement('div');
            fila.classList.add('fila');

            // comprobar tarea pasada de fecha y asignar el class 'pasada' para el css
            if (new Date(tarea.fechaLimite) < new Date() && !tarea.completada) {
                fila.classList.add('pasada');
            }

            const celdaTitulo = document.createElement('div');
            celdaTitulo.textContent = tarea.titulo;
            fila.appendChild(celdaTitulo);

            const celdaPrioridad = document.createElement('div');
            celdaPrioridad.textContent = tarea.prioridad;
            fila.appendChild(celdaPrioridad);

            const celdaFechaLimite = document.createElement('div');
            celdaFechaLimite.textContent = tarea.fechaLimite;
            fila.appendChild(celdaFechaLimite);

            const celdaAcciones = document.createElement('div');
            const botonBorrar = document.createElement('button');
            botonBorrar.type = 'button';
            botonBorrar.classList.add('borrar-tarea');
            botonBorrar.textContent = 'Borrar';
            botonBorrar.dataset.id = tarea.tareaId; //asignar el ID de la tarea
            celdaAcciones.appendChild(botonBorrar);
            fila.appendChild(celdaAcciones);

            //4. Cuando se haga click sobre la fila se tiene que cargar en el formulario
            fila.addEventListener('click', function() {
                //poner el titulo Editar Tarea para saber que accion esta realizando
                accion.innerHTML = '';
                accion.innerHTML = 'Editar Tarea';
                formCreacion.reset();
                cargarFormulario(tarea);
            });

            cuerpoTabla.appendChild(fila);

            botonBorrar.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento haga clic en la fila
                eliminarTarea(tarea.tareaId);
            });
        }
    }
}

function mostrarTabla(filtro = '') {
    generarHTMLListadoTareas(filtro);
}

//metodo para cargar una tarea pulsada en el formulario
function cargarFormulario(tarea) {
    formCreacion.elements['tareaId'].value = tarea.tareaId;
    formCreacion.elements['titulo'].value = tarea.titulo;
    formCreacion.elements['prioridad'].value = tarea.prioridad;
    formCreacion.elements['fechaRegistro'].value = tarea.fechaRegistro;
    formCreacion.elements['fechaLimite'].value = tarea.fechaLimite;
    formCreacion.elements['descripcion'].value = tarea.descripcion;
    formCreacion.elements['responsable'].value = tarea.responsable;
    formCreacion.elements['completada'].checked = tarea.completada;
}

function buscarTareaPorTitulo(titulo) {
    for (let tarea of listaTareas) {
        if (tarea.titulo === titulo) {
            return tarea;
        }
    }
}

function buscarTarea(id) {
    return listaTareas.find(tarea => tarea.tareaId === id);
}

//evento para crear una nueva tarea
botonNuevo.addEventListener('click', function() {
    //poner el titulo Nueva Tarea para saber que accion esta realizando
    accion.innerHTML = '';
    accion.innerHTML = 'Nueva Tarea';

    // Limpia el formulario de creación
    formCreacion.reset();

});

function crearTarea() {

}

botonGuardar.addEventListener('click', function() {
    let tareaSeleccionada = {
        tareaId: formCreacion.elements['tareaId'].value.trim(),
        titulo: formCreacion.elements['titulo'].value.trim(),
        prioridad: formCreacion.elements['prioridad'].value.trim(),
        fechaRegistro: formCreacion.elements['fechaRegistro'].value.trim(),
        fechaLimite: formCreacion.elements['fechaLimite'].value.trim(),
        descripcion: formCreacion.elements['descripcion'].value.trim(),
        responsable: formCreacion.elements['responsable'].value.trim(),
        completada: formCreacion.elements['completada'].value
    };

    let existe = false;
    let tareaEncontrada = {};

    for(let tarea of listaTareas) {
        if((tareaSeleccionada.tareaId == tarea.tareaId)) {
            existe = true;
            tareaEncontrada = tarea;
        }
    }
    
    if (existe) {
        console.log('La tarea ya existe, se editará');
        // si existe, actualizar la tarea existente

        tareaEncontrada.tareaId = tareaSeleccionada.tareaId;
        tareaEncontrada.titulo = tareaSeleccionada.titulo;
        tareaEncontrada.prioridad = tareaSeleccionada.prioridad;
        tareaEncontrada.fechaRegistro = tareaSeleccionada.fechaRegistro;
        tareaEncontrada.fechaLimite = tareaSeleccionada.fechaLimite;
        tareaEncontrada.descripcion = tareaSeleccionada.descripcion;
        tareaEncontrada.responsable = tareaSeleccionada.responsable;
        tareaEncontrada.completada = tareaSeleccionada.completada;
    } else {
        console.log('La tarea no existe, se cerará una nueva');
        // si no existe, asignar un nuevo ID y agregarla a la lista

        tareaSeleccionada.tareaId = listaTareas.length;
        listaTareas.push(tareaSeleccionada);
    }

    mostrarTabla();
});

//evento para iniciar el programa cuando se cargue la pagina
window.addEventListener('load', function() {
    iniciarApp();
}) ;