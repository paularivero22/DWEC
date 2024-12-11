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
    crearTarea();
});

/*function crearTarea() {
    //recoger los valores de los campos
    const titulo = document.getElementById('titulo').value;
    const prioridad = document.getElementById('prioridad').value;
    const fechaRegistro = document.getElementById('fechaRegistro').value;
    const fechaLimite = document.getElementById('fechaLimite').value;
    const descripcion = document.getElementById('descripcion').value;
    const responsable = document.getElementById('responsable').value;
    const completada = document.getElementById('completada').value;
    //const botonGuardar = document.getElementById('guardar').checked;

    //si hay tareas en la lista asignamos el tarea id de la ultima tarea
    //si no hay tareas asignamos 1 como id
    let tareaId;
    if (listaTareas.length > 0) {
        tareaId = listaTareas[listaTareas.length - 1].tareaId + 1;
    } else {
        tareaId = 1;
    }

    const tareaNueva = new Tarea(listaTareas.length, titulo, prioridad, fechaRegistro, fechaLimite, descripcion, responsable, completada);
    listaTareas.push(tareaNueva);

    //recargar tabla
    mostrarTabla(barra.value);
}*/

/*function editarTarea() {
    const tituloExistente = document.querySelector('#contenedorFormulario h3');
    if (tituloExistente) {
        tituloExistente.remove(); 
    }
    contenedorFormulario.insertBefore(tituloH3, formCreacion);
    const tareaId = parseInt(formCreacion.elements['tareaId'].value);
    const tareaEditada = buscarTarea(tareaId);

    tareaEditada.titulo = formCreacion.elements['titulo'].value;
    tareaEditada.prioridad = formCreacion.elements['prioridad'].value;
    tareaEditada.fechaRegistro = formCreacion.elements['fechaRegistro'].value;
    tareaEditada.fechaLimite = formCreacion.elements['fechaLimite'].value;
    tareaEditada.descripcion = formCreacion.elements['descripcion'].value;
    tareaEditada.responsable = formCreacion.elements['responsable'].value;
    tareaEditada.completada = formCreacion.elements['completada'].checked;

    mostrarTabla(barra.value);
}*/

botonGuardar.addEventListener('click', function() {
    let nuevaTarea;
    nuevaTarea.titulo = document.getElementById('titulo').value;
    nuevaTarea.prioridad = document.getElementById('prioridad').value;
    nuevaTarea.fechaRegistro = document.getElementById('fechaRegistro').value;
    nuevaTarea.fechaLimite = document.getElementById('fechaLimite').value;
    nuevaTarea.descripcion = document.getElementById('descripcion').value;
    nuevaTarea.responsable = document.getElementById('responsable').value;
    nuevaTarea.completada = document.getElementById('completada').value;

    //comprobar si existe para crear o editar la tarea
    let existe;
    let tareaAEditar;

    for(let tarea of tareas) {
        if(tarea.titulo === nuevaTarea.titulo) {
            existe = true;
            tareaAEditar = tarea;
            break;
        } else {
            existe = false;
        }
    }

    //si la tarea ya existe se remplaza y si no se añade a la lista
    if(existe) {
        tareaAEditar = tareaNueva;
    } else {
        listaTareas.push(tareaNueva);
    }

    //resetear tabla
    mostrarTabla();
});

iniciarApp();