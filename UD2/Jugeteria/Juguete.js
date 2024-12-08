class Juguete {
    constructor(jugueteId, nombre = '', marca = '', precio = 0) {
        this._jugueteId = jugueteId;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
    }

    get jugueteId() {
        return this._jugueteId;
    }

    generarHTMLPropiedades() {
        return `
            <form data-componente="propiedades">
                <input type="hidden" id="jugueteid" value="${this.jugueteId}">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" value="${this.nombre}" required>
                </div>
                <div>
                    <label for="marca">Marca:</label>
                    <input type="text" id="marca" value="${this.marca}" required>
                </div>
                <div>
                    <label for="precio">Precio:</label>
                    <input type="number" id="precio" value="${this.precio}" step="0.01" required>
                </div>
                <div>
                    <button type="submit">Guardar</button>
                </div>
            </form>
        `;
    }
}
