'use strict';

class LineaFactura {
    concepto;
    cantidad;
    precioUnitario;

    constructor(concepto, cantidad, precioUnitario) {
        this.concepto = concepto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }
}

class Factura {
    clienteNIF;
    fecha;
    hora;
    pagada;
    lineas;


    constructor(clienteNIF, fecha, hora, pagada, lineas) {
        this.clienteNIF = clienteNIF;
        this.fecha = fecha;
        this.pagada = pagada;
        this.lineas = [];
    }

    get importeTotal() {
        let total = 0;
        for (let i = 0; i < this.líneas.length; i++) {
            const linea = this.líneas[i];
            total += linea.cantidad * linea.precioUnitario;
        }
        return total.toFixed(2);
    }

    get numeroArticulos() {
        return this.lineas.length;
    }

    agregarLinea(concepto, cantidad, precioUnitario) {
        let linea = new LineaFactura(concepto, cantidad, precioUnitario);
        this.lineas.push(linea);
    }

    eliminarLinea() {
        this.lineas.pop();
    }

    imprimirFactura() {
        let numLinea = 0;
        let facturaString = "";

        facturaString += 'Datos de la factura:';
        facturaString += 'NIF del cliente: ' + this.clienteNIF;
        facturaString += 'Fecha: ' + this.fecha;
        facturaString += 'Pagada: ' + this.pagada ? 'si' : 'no';
        facturaString += 'Lineas: ';

        for (let linea of this.lineas) {
            numLinea++;
            facturaString += '-' + numLinea + '-';
            facturaString += 'Concepto: ' + linea.concepto;
            facturaString += 'Cantidad: ' + linea.cantidad;
            facturaString += 'Precio Unitario: ' + linea.precioUnitario;
        }
        return facturaString;
    }
}

class Utilidades {
    static serializarFactura(facturaOBJ) {
        return JSON.stringify(facturaOBJ, null, 2);
    }

    static deserializarFactura(facturaJSON) {
        let datos = JSON.parse(facturaJSON);

        let factura = new Factura(datos.clienteNIF, datos.fecha, datos.hora, datos.pagada);

        factura.lineas = datos.lineas.map(linea => new LineaFactura(linea.concepto, linea.cantidad, linea.precioUnitario));
        return factura;
    }
}

let factura = new Factura("", "", "", false);

function actualizarFactura() {
    factura.clienteNIF = document.getElementById("clienteNIF").value;
    factura.fecha = document.getElementById("fecha").value;
    factura.hora = document.getElementById("hora").value;
    factura.pagada = document.getElementById("pagada").checked;
    actualizarVista();
}

function agregarLinea() {
    const concepto = document.getElementById("concepto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);
    factura.agregarLinea(concepto, cantidad, precio);
    actualizarVista();
}

function eliminarLinea() {
    factura.eliminarLinea();
    actualizarVista();
}

function serializarFactura() {
    document.getElementById("salida").value = Utilidades.serializarFactura(factura);
}

function deserializarFactura() {
    const entrada = document.getElementById("entrada").value;
    factura = Utilidades.deserializarFactura(entrada);
    actualizarVista();
}

function actualizarVista() {
    document.getElementById("mostrarFactura").textContent = factura.imprimirFactura();
}