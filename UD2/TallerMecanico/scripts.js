// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar la aplicación
    const contenedor = document.getElementById("resultados");
    const gestionMecanica = new GestionMecanica(contenedor);

    // Iniciar la aplicación en el contenedor con id 'resultados'
    gestionMecanica.iniciarApp("#resultados");

    // Agregar más interacciones si es necesario
    document.getElementById("listado").addEventListener("click", () => {
        gestionMecanica.mostrarVehiculos();
    });

    document.getElementById("inicio").addEventListener("click", () => {
        gestionMecanica.mostrarInicio();
    });

    document.getElementById("noTerminadas").addEventListener("click", () => {
        gestionMecanica.mostrarReparacionesNoTerminadas();
    });

    document.getElementById("noPagadas").addEventListener("click", () => {
        gestionMecanica.mostrarReparacionesNoPagadas();
    });

    document.getElementById("presupuestos").addEventListener("click", () => {
        gestionMecanica.mostrarPresupuestos();
    });
});
