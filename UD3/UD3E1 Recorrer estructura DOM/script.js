const $domAnalyzer = (() => {
    // Función para obtener la estructura JSON del DOM
    const obtenerEstructuraJSON = (nodo = document.body) => {
        // Función recursiva que analiza un nodo
        const analizarNodo = (nodo) => {
            return {
                etiqueta: nodo.tagName.toLowerCase(),
                texto: nodo.textContent.trim(),
                tieneId: nodo.id ? true : false,
                lstClass: Array.from(nodo.classList),
                lstData: Array.from(nodo.attributes)
                    .filter(attr => attr.name.startsWith("data-"))
                    .reduce((acc, attr) => {
                        acc[attr.name] = attr.value;
                        return acc;
                    }, {}),
                lstHijos: Array.from(nodo.children).map(hijo => analizarNodo(hijo))
            };
        };

        return analizarNodo(nodo);
    };

    // Función para imprimir la estructura desde la raíz hasta un nodo específico
    const imprimirEstructura = (selector) => {
        const nodo = document.querySelector(selector);

        if (!nodo) {
            return `No se encontró ningún nodo con el selector: "${selector}"`;
        }

        let resultado = "";
        let actual = nodo;

        while (actual) {
            const etiqueta = actual.tagName.toLowerCase();
            const id = actual.id ? actual.id : "noid";
            const clases = actual.classList.length > 0 ? Array.from(actual.classList).join(",") : "noclass";
            const texto = actual.textContent.trim();

            resultado = `${etiqueta}-${id}-${clases}-${texto}` + resultado;
            actual = actual.parentElement; // Subimos un nivel en el DOM
        }

        return resultado.trim();
    };

    // Exponer las funciones públicamente
    return {
        obtenerEstructuraJSON,
        imprimirEstructura
    };
})();

// Eventos del DOM para interactuar con las funciones
document.getElementById('mostrar-json').addEventListener('click', () => {
    const estructuraJSON = $domAnalyzer.obtenerEstructuraJSON();
    document.getElementById('output').textContent = JSON.stringify(estructuraJSON, null, 2);
});

document.getElementById('mostrar-texto').addEventListener('click', () => {
    const selector = document.getElementById('selector').value.trim();
    const estructuraTexto = $domAnalyzer.imprimirEstructura(selector);
    document.getElementById('output').textContent = estructuraTexto;
});
