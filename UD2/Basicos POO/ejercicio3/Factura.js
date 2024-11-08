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
        for (let i = 0; i < this.lineas.length; i++) {
            const linea = this.lineas[i];
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
        console.log(linea);
    }

    eliminarLinea() {
        this.lineas.pop();
    }

    imprimirFactura() {
        let numLinea = 0;
        let facturaString = "";

        facturaString += 'Datos de la factura: <br/>';
        facturaString += 'NIF del cliente: ' + this.clienteNIF + "<br/>";
        facturaString += 'Fecha: ' + this.fecha + "<br/>";
        facturaString += 'Pagada: ' + (this.pagada ? 'sí' : 'no') + "<br/>";
        facturaString += 'Lineas: <br/>';

        for (let linea of this.lineas) {
            numLinea++;
            facturaString += '-' + numLinea + '- <br/>';
            facturaString += 'Concepto: ' + linea.concepto + "<br/>";
            facturaString += 'Cantidad: ' + linea.cantidad + "<br/>";
            facturaString += 'Precio Unitario: ' + linea.precioUnitario + "<br/>";
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
    event.preventDefault();
    factura.clienteNIF = document.getElementById("clienteNIF").value;
    factura.fecha = document.getElementById("fecha").value;
    factura.hora = document.getElementById("hora").value;
    factura.pagada = document.getElementById("pagada").checked;
    actualizarVista();
}

function agregarLinea() {
    event.preventDefault();
    const concepto = document.getElementById("concepto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);
    factura.agregarLinea(concepto, cantidad, precio);
    actualizarVista();
}

function eliminarLinea() {
    event.preventDefault();
    factura.eliminarLinea();
    actualizarVista();
}

function serializarFactura() {
    event.preventDefault();
    document.getElementById("salida").value = Utilidades.serializarFactura(factura);
}

function deserializarFactura() {
    event.preventDefault();
    const entrada = document.getElementById("entrada").value;
    factura = Utilidades.deserializarFactura(entrada);
    actualizarVista();
}

function actualizarVista() {
    event.preventDefault();
    document.getElementById("mostrarFactura").innerHTML = factura.imprimirFactura();
}