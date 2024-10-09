'use strict';

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
    if(nombre in productos) {
        delete(productos[nombre]);
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
    if(nombre in productos) {
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
    if(nombre in productos) {
        productos[nombre].cantidad += cantidad;
        alert('Producto actualizado ');
        buscarProducto(nombre);
        
        if(productos[nombre].cantidad == 0) {
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

}

/*
Función “imprimirInventario()” devuelve una lista con el informe de inventario, 
el cual muestra el “nombre”, “categoría”, “cantidad”, “precio” y “total” 
(cantidad*precio).
*/


agregarProducto('manzana',5,0.30,'fruta');
agregarProducto('melon',5,0.30,'fruta');
/* 
eliminarProducto('melon');

buscarProducto('manzana'); */

actualizarInventario('manzana',10); 
