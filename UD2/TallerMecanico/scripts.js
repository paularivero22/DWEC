import { GestionMecanica } from './GestionMecanica.js';

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("app"); 
    const gestionMecanica = new GestionMecanica(contenedor);

    gestionMecanica.iniciarApp("#app");

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
