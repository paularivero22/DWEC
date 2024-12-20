function jugarDados(numeroLados) {
    const tirarDado = () => Math.floor(Math.random() * numeroLados) + 1;
    return () => [tirarDado(), tirarDado()];
}

document.getElementById('iniciar').addEventListener('click', () => {
    const numeroLados = parseInt(document.getElementById('lados').value);
    const numeroTiradas = parseInt(document.getElementById('tiradas').value);
    const tirarDados = jugarDados(numeroLados);

    let victoriasJugador = 0;
    let victoriasMaquina = 0;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados previos

    for (let i = 0; i < numeroTiradas; i++) {
        const resultadoJugador = tirarDados();
        const resultadoMaquina = tirarDados();

        const sumaJugador = resultadoJugador[0] + resultadoJugador[1];
        const sumaMaquina = resultadoMaquina[0] + resultadoMaquina[1];

        const resultadoHTML = `
            <p>Tirada ${i + 1}: 
            <strong>Jugador:</strong> ${resultadoJugador.join(' + ')} = ${sumaJugador} | 
            <strong>Máquina:</strong> ${resultadoMaquina.join(' + ')} = ${sumaMaquina}</p>
        `;
        resultadosDiv.innerHTML += resultadoHTML;

        if (sumaJugador > sumaMaquina) {
            victoriasJugador++;
        } else if (sumaMaquina > sumaJugador) {
            victoriasMaquina++;
        }
    }

    resultadosDiv.innerHTML += `
        <h3>Resultado Final:</h3>
        <p><strong>Jugador:</strong> ${victoriasJugador} victorias</p>
        <p><strong>Máquina:</strong> ${victoriasMaquina} victorias</p>
    `;
});
