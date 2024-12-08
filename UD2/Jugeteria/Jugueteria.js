import datos from './datos.js';
import Juguete from './juguete.js';

class Jugueteria {
    constructor() {
        this._contenedor = null;
        this._juguetes = [];
        this._contador = 10;
        this._inicializarJuguetes();
    }

    _inicializarJuguetes() {
        datos.forEach(dato => {
            this._juguetes.push(new Juguete(dato.jugueteId, dato.nombre, dato.marca, dato.precio));
        });
    }

    iniciarApp(selector) {
        this._contenedor = document.querySelector(selector);
        if (!this._contenedor) {
            alert('Contenedor no encontrado');
            return;
        }
        this.navegarInicio();
    }

    navegarInicio() {
        this._contenedor.innerHTML = `
            ${this.generarHTMLNavegacion()}
            ${this.generarHTMLBuscador()}
            ${this.generarHTMLListado(this._juguetes)}
        `;
        this.asignarEventos();
    }

    generarHTMLNavegacion() {
        return `
            <nav class="jg-navegacion">
                <ul>
                    <li><a href="#" data-destino="inicio">Inicio</a></li>
                    <li><a href="#" data-destino="listadojuguetes">Listado</a></li>
                </ul>
            </nav>
        `;
    }

    generarHTMLBuscador() {
        return `
            <form data-componente="buscador" name="jg-buscador">
                <input type="text" id="jg-buscador-filtro" placeholder="Buscar por nombre..."/>
                <button type="submit">Buscar</button>
            </form>
        `;
    }

    generarHTMLListado(listaJuguetes) {
        return `
            <div class="jg-tabla">
                <div class="jg-tabla-fila jg-cabecera">
                    <div>Nombre</div><div>Marca</div><div>Precio</div><div>Acciones</div>
                </div>
                ${listaJuguetes.map(juguete => `
                    <div class="jg-tabla-fila">
                        <div>${juguete.nombre}</div>
                        <div>${juguete.marca}</div>
                        <div>${juguete.precio}</div>
                        <div>
                            <button data-id="${juguete.jugueteId}" class="ver">Ver</button>
                            <button data-id="${juguete.jugueteId}" class="borrar">Borrar</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button id="nuevo-juguete">Nuevo Juguete</button>
        `;
    }

    asignarEventos() {
        const formularioBusqueda = document.querySelector('[data-componente="buscador"]');
        if (formularioBusqueda) {
            formularioBusqueda.addEventListener('submit', (event) => {
                event.preventDefault();
                const filtro = document.getElementById('jg-buscador-filtro').value;
                this.navegarListadoJuguetes(filtro);
            });
        }

        const botonesVer = document.querySelectorAll('.ver');
        botonesVer.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const jugueteId = parseInt(event.target.getAttribute('data-id'));
                const juguete = this.obtenerJuguete(jugueteId);
                this.navegarPropiedades(juguete);
            });
        });

        const botonesBorrar = document.querySelectorAll('.borrar');
        botonesBorrar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const jugueteId = parseInt(event.target.getAttribute('data-id'));
                this.borrarJuguete(jugueteId);
                this.navegarListadoJuguetes();
            });
        });

        const botonNuevo = document.getElementById('nuevo-juguete');
        if (botonNuevo) {
            botonNuevo.addEventListener('click', () => {
                this.navegarNuevoJuguete();
            });
        }

        const formularioNuevo = document.querySelector('[data-componente="formulario-nuevo"]');
        if (formularioNuevo) {
            formularioNuevo.addEventListener('submit', (event) => {
                event.preventDefault();
                const nombre = document.getElementById('nombre').value;
                const marca = document.getElementById('marca').value;
                const precio = parseFloat(document.getElementById('precio').value);

                const nuevoJuguete = new Juguete(this._contador + 1, nombre, marca, precio);
                this.crearJuguete(nuevoJuguete);
                this.navegarListadoJuguetes();
            });
        }
    }

    navegarListadoJuguetes(filtro = '') {
        const listaFiltrada = this.obtenerJuguetes(filtro);
        this._contenedor.innerHTML = `
            ${this.generarHTMLNavegacion()}
            ${this.generarHTMLListado(listaFiltrada)}
        `;
        this.asignarEventos();
    }

    navegarPropiedades(juguete) {
        this._contenedor.innerHTML = `
            ${this.generarHTMLNavegacion()}
            ${juguete.generarHTMLPropiedades()}
        `;
        this.asignarEventos();
    }

    navegarNuevoJuguete() {
        this._contenedor.innerHTML = `
            ${this.generarHTMLNavegacion()}
            ${this.generarHTMLFormularioNuevo()}
        `;
        this.asignarEventos();
    }

    generarHTMLFormularioNuevo() {
        return `
            <form data-componente="formulario-nuevo">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" required>
                </div>
                <div>
                    <label for="marca">Marca:</label>
                    <input type="text" id="marca" required>
                </div>
                <div>
                    <label for="precio">Precio:</label>
                    <input type="number" id="precio" step="0.01" required>
                </div>
                <div>
                    <button type="submit">Guardar</button>
                </div>
            </form>
        `;
    }

    obtenerJuguetes(filtro) {
        if (filtro) {
            return this._juguetes.filter(juguete => juguete.nombre.toLowerCase().includes(filtro.toLowerCase()));
        }
        return this._juguetes;
    }

    obtenerJuguete(jugueteId) {
        return this._juguetes.find(juguete => juguete.jugueteId === jugueteId);
    }

    crearJuguete(nuevoJuguete) {
        this._contador++;
        nuevoJuguete.jugueteId = this._contador;
        this._juguetes.push(nuevoJuguete);
    }

    borrarJuguete(jugueteId) {
        const index = this._juguetes.findIndex(juguete => juguete.jugueteId === jugueteId);
        if (index !== -1) {
            this._juguetes.splice(index, 1);
        }
    }
}

export default Jugueteria;
