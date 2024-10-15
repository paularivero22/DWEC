'use strict';

const $negocio = (function () {

    let productos = {};

    /*
    Función “agregarProducto(nombre, cantidad, precio, categoría)” que añada el 
    producto si no existe. Si el producto ya existe muestra un alert indicando que
    el producto ya existe.
    */
    function agregarProducto(nombre, cantidad, precio, categoria) {

        if (nombre in productos) {
            alert("El producto ya existe");
            return;
        }

        let producto = {
            cantidad: cantidad,
            precio: precio,
            categoria: categoria,
        };

        productos[nombre] = producto;
        alert('Producto ' + nombre + ' añadido');
    }

    /*
    Función “eliminarProducto(nombre)” que elimina el producto del inventario. 
    Si el producto no existe muestra un alert indicando que producto no existe.
    */
    function eliminarProducto(nombre) {
        if (nombre in productos) {
            delete (productos[nombre]);
            alert(nombre + ' eliminado');
        } else {
            alert('No existe el producto');
        }
    }
    /*
    Función “buscarProducto(nombre)” que devuelve 
    el objeto con la información del producto.
    */
    function buscarProducto(nombre) {
        if (nombre in productos) {
            alert(
                'Datos del producto ' + "\n" + "\n"
                + 'Nombre: ' + nombre + "\n"
                + 'Cantidad: ' + productos[nombre].cantidad + "\n"
                + 'Precio: ' + productos[nombre].precio + "\n"
                + 'Categoria: ' + productos[nombre].categoria + "\n"
            );
        } else {
            alert('No existe ese producto');
        }
    }

    /* 
    Función “actualizarInventario(nombre, cantidad)” incrementa o decrementa 
    el stock según la cantidad indicada. Si la reducción deja el stock a 0 se 
    mostrará un alert solicitando la reposición. 
    */
    function actualizarInventario(nombre, cantidad) {
        if (nombre in productos) {
            productos[nombre].cantidad += cantidad;
            alert('Producto actualizado ');
            buscarProducto(nombre);

            if (productos[nombre].cantidad == 0) {
                alert('No hay stock, se necesita reposicion');
            }
        } else {
            alert('No existe ese producto, no se realizara ningun cambio');
        }
    }

    /*
    Función “ordenarProductosPorPrecio()” devuelve una lista ordenada de forma
    ascendente. El resultado es un nuevo array, cuidado que no tienes el nombre.
    */
    function ordenarProductosPorPrecio() {
        let datosEnArray = Object.entries(productos);
        let datosFormateados = datosEnArray.map(([nombre, valor]) => ({ nombre, ...valor }));
        let datosOrdenados = datosFormateados.sort((a, b) => a.precio - b.precio);
        alert('Datos ordenados por precio');
        alert(imprimirInventarioOrdenado(datosOrdenados));
    }

    /*function ordenarProductosPorPrecio() {
        return Object.entries(productos)
            .map(([nombre, valor]) => ({ nombre, ...valor }))
            .sort((a, b) => a.precio - b.precio);
    }*/

    

    /*
    Función “imprimirInventario()” devuelve una lista con el informe de inventario, 
    el cual muestra el “nombre”, “categoría”, “cantidad”, “precio” y “total” 
    (cantidad*precio).
    */
    function imprimirInventario() {
        for (let nombre in productos) {
            let producto = productos[nombre];
            alert(
                "Datos de " + nombre + ": " + "\n" +
                "Nombre: " + nombre + "\n" +
                "Cantidad: " + producto.cantidad + "\n" +
                "Precio: " + producto.precio + "\n" +
                "Categoría: " + producto.categoria + "\n" +
                "Total: " + (producto.cantidad * producto.precio) + "\n"
            );
        }
    }

    //hago un imprimir inventario para el array ordenado
    function imprimirInventarioOrdenado(array2) {
        let reporte = '';
        Object.entries(array2).forEach(([nombre, element]) => {
            reporte += 'Producto: ' + element.nombre +
                '\nCategoría: ' + element.categoria +
                '\nCantidad: ' + element.cantidad +
                '\nPrecio: ' + element.precio +
                '\nTotal: ' + (element.precio * element.cantidad) +
                '\n\n';
        });
        alert(reporte); // Devuelve el informe
    };

    function filtrarProductosPorCategoria(categoria) {
        let productosCategoria = "Productos de la categoria: " + categoria + "\n" + "\n";

        for (let nombre in productos) {
            let producto = productos[nombre];
            if (producto.categoria === categoria) {
                productosCategoria += "Nombre: " + nombre + "\n" +
                    "Cantidad: " + producto.cantidad + "\n" +
                    "Precio: " + producto.precio + "\n" + "\n";
            }
        }
        alert(productosCategoria);
    }

    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        ordenarProductosPorPrecio,
        imprimirInventario,
        filtrarProductosPorCategoria
    };
})();

window.addEventListener("load", function() {

    document.getElementById("formAgregar").addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombreAgregar").value;
        const cantidad = parseInt(document.getElementById("cantidadAgregar").value);
        const precio = parseFloat(document.getElementById("precioAgregar").value);
        const categoria = document.getElementById("categoriaAgregar").value;

        $negocio.agregarProducto(nombre, cantidad, precio, categoria);
    });

    document.getElementById("formBuscar").addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombreBuscar").value;
        $negocio.buscarProducto(nombre);
    });

    document.getElementById("formEliminar").addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombreEliminar").value;
        $negocio.eliminarProducto(nombre);
    });

    document.getElementById("formActualizar").addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombreActualizar").value;
        const cantidad = parseInt(document.getElementById("cantidadActualizar").value);

        $negocio.actualizarInventario(nombre, cantidad);
    });

    document.getElementById("ordenarPorPrecio").addEventListener("click", function() {
        $negocio.ordenarProductosPorPrecio();
    });

    document.getElementById("imprimirInventario").addEventListener("click", function() {
        $negocio.imprimirInventario();
    });

    document.getElementById("filtrarCategoria").addEventListener("click", function() {
        preventDefault();
        const categoria = document.getElementById("categoriaFiltrar").value;
        $negocio.filtrarProductosPorCategoria(categoria);
    });
});