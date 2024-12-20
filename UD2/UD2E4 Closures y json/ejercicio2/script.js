// Implementación autoinvocada contenida en la constante $yedra
const $yedra = (() => {
    // Datos iniciales de prueba
    let alumnos = [
        { nombre: "Ana", nota: 4.5, modulo: "DWES", convocatorias: 2 },
        { nombre: "Luis", nota: 6.3, modulo: "DWEC", convocatorias: 1 },
        { nombre: "María", nota: 3.0, modulo: "DWES", convocatorias: 3 },
        { nombre: "Carlos", nota: 8.2, modulo: "DWEC", convocatorias: 2 },
        { nombre: "Lucía", nota: 2.8, modulo: "DWES", convocatorias: 4 },
        { nombre: "Pedro", nota: 9.0, modulo: "DWES", convocatorias: 1 }
    ];

    // 1. Lista de alumnos suspensos
    const listarSuspensos = () => {
        return alumnos
            .filter(alumno => alumno.nota < 5)
            .map(({ nombre, nota, modulo }) => ({ nombre, nota, modulo }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
    };

    // 2. Estadísticas por módulo
    const estadisticasPorModulo = () => {
        const modulos = {};

        // Agrupación de datos por módulo
        alumnos.forEach(({ modulo, nota, convocatorias }) => {
            if (!modulos[modulo]) {
                modulos[modulo] = { totalNotas: 0, totalConvocatorias: 0, cantidad: 0 };
            }
            modulos[modulo].totalNotas += nota;
            modulos[modulo].totalConvocatorias += convocatorias;
            modulos[modulo].cantidad++;
        });

        // Calculo de estadísticas
        return Object.keys(modulos)
            .map(modulo => ({
                modulo,
                notaMedia: (modulos[modulo].totalNotas / modulos[modulo].cantidad).toFixed(2),
                convocatoriasMedia: (modulos[modulo].totalConvocatorias / modulos[modulo].cantidad).toFixed(2)
            }))
            .sort((a, b) => b.convocatoriasMedia - a.convocatoriasMedia);
    };

    // 3. Ver datos en formato JSON
    const verJSON = () => {
        return JSON.stringify(alumnos, null, 2);
    };

    // 4. Cargar nueva cadena JSON
    const cargarJSON = (cadenaJSON) => {
        try {
            const nuevaData = JSON.parse(cadenaJSON);
            if (!Array.isArray(nuevaData)) {
                throw new Error("El JSON debe ser un array.");
            }
            alumnos = nuevaData;
            return "Datos cargados correctamente.";
        } catch (error) {
            return `Error al cargar JSON: ${error.message}`;
        }
    };

    // Métodos expuestos
    return {
        listarSuspensos,
        estadisticasPorModulo,
        verJSON,
        cargarJSON
    };
})();

// Manejo de eventos en el DOM
document.getElementById('listar-suspensos').addEventListener('click', () => {
    const resultado = $yedra.listarSuspensos();
    document.getElementById('output').textContent = JSON.stringify(resultado, null, 2);
});

document.getElementById('estadisticas').addEventListener('click', () => {
    const resultado = $yedra.estadisticasPorModulo();
    document.getElementById('output').textContent = JSON.stringify(resultado, null, 2);
});

document.getElementById('ver-json').addEventListener('click', () => {
    const resultado = $yedra.verJSON();
    document.getElementById('output').textContent = resultado;
});

document.getElementById('cargar-json').addEventListener('click', () => {
    const nuevaCadenaJSON = prompt("Introduce la nueva cadena JSON:");
    const resultado = $yedra.cargarJSON(nuevaCadenaJSON);
    document.getElementById('output').textContent = resultado;
});
