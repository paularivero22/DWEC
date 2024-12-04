'use strict';

class Juguete {
    #jugueteId;
    #nombre;
    #marca;
    #precio;

    constructor(jugueteId, nombre, marca, precio) {
        this.#jugueteId = jugueteId;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
    }

    generarHTMLPropiedades() {
        return `<div id="detalles-juguete-${this.#jugueteId}">
            <h3>${this.nombre}</h3>
            <p>Marca: ${this.marca}</p>
            <p>Precio: ${this.precio}</p>
      </div>`;
    }

    getJugueteId() {
        return this.#jugueteId;
    }

    getNombre() {
        return this.nombre;
    }

    getMarca() {
        return this.marca;
    }

    getPrecio() {
        return this.precio;
    }
}