// variáveis principais
const radios = document.querySelectorAll("input[name='radioAposta']");
const divTipoAposta = document.getElementById("tipoDeAposta");
const divResultadoAposta = document.getElementById("resultadoAposta");
const saldoTexto = document.getElementById("dinheiro");
let dinheiro = 100;
let tipoAposta = "";

// lista da roleta
const roleta = [
    { numero: 0, cor: "verde" },
    { numero: 1, cor: "vermelho" },
    { numero: 2, cor: "preto" },
    { numero: 3, cor: "vermelho" },
    { numero: 4, cor: "preto" },
    { numero: 5, cor: "vermelho" },
    { numero: 6, cor: "preto" },
    { numero: 7, cor: "vermelho" },
    { numero: 8, cor: "preto" },
    { numero: 9, cor: "vermelho" },
    { numero: 10, cor: "preto" },
    { numero: 11, cor: "preto" },
    { numero: 12, cor: "vermelho" },
    { numero: 13, cor: "preto" },
    { numero: 14, cor: "vermelho" },
    { numero: 15, cor: "preto" },
    { numero: 16, cor: "vermelho" },
    { numero: 17, cor: "preto" },
    { numero: 18, cor: "vermelho" },
    { numero: 19, cor: "vermelho" },
    { numero: 20, cor: "preto" },
    { numero: 21, cor: "vermelho" },
    { numero: 22, cor: "preto" },
    { numero: 23, cor: "vermelho" },
    { numero: 24, cor: "preto" },
    { numero: 25, cor: "vermelho" },
    { numero: 26, cor: "preto" },
    { numero: 27, cor: "vermelho" },
    { numero: 28, cor: "preto" },
    { numero: 29, cor: "preto" },
    { numero: 30, cor: "vermelho" },
    { numero: 31, cor: "preto" },
    { numero: 32, cor: "vermelho" },
    { numero: 33, cor: "preto" },
    { numero: 34, cor: "vermelho" },
    { numero: 35, cor: "preto" },
    { numero: 36, cor: "vermelho" }
];

const cores = {
    vermelho: "red",
    preto: "black",
    verde: "green"
};

// Atualiza o texto do saldo
function AtualizarSaldo() {
    saldoTexto.innerText = `Saldo R$${dinheiro.toFixed(2)}`;
}

AtualizarSaldo();

// Gera cor e número aleatório
function GirarRoleta() {
    const numAleatorio = Math.floor(Math.random() * roleta.length);
    const corSorteada = roleta[numAleatorio].cor;
    return { numAleatorio, corSorteada };
}

// Função principal do giro
function Girar(passos, totalPassos, numAleatorio, botao, corSorteada) {
    let index = 0;
    let velocidade = 50;

    function loop(p) {
        if (p > totalPassos) {
            const resultado = roleta[numAleatorio];
            divResultadoAposta.textContent = `${resultado.numero} - ${resultado.cor.toUpperCase()}`;
            divResultadoAposta.style.color = cores[resultado.cor];

            setTimeout(() => {
                const valorApostado = Number(document.getElementById("valorApostado").value);
                if (valorApostado > dinheiro || valorApostado <= 0) {
                    alert("Aposta inválida!");
                    botao.disabled = false;
                    return;
                }

                // Cálculo de peso
                var peso = dinheiro + (0.5 * (valorApostado * 2));

                // --- Verificação de aposta ---
                if (tipoAposta === "cor") {
                    const corEscolhida = document.getElementById("inputCor").value;

                    if (corSorteada === corEscolhida) {
                        divResultadoAposta.innerHTML = `<p>🎉 Ganhou! Saiu ${resultado.numero} - ${resultado.cor}</p>`;
                        dinheiro = dinheiro + (0.1 * peso);
                    } else {
                        divResultadoAposta.innerHTML = `<p>❌ Perdeu! Saiu ${resultado.numero} - ${resultado.cor}</p>`;
                        dinheiro = dinheiro - valorApostado;
                    }

                } else {
                    const numeroEscolhido = document.getElementById("inputNumero").value;

                    if (numeroEscolhido <= 0 || numeroEscolhido > 36) {
                        alert("Aposta inválida!");
                        return;
                    }

                    if (roleta[numAleatorio].numero == numeroEscolhido) {
                        divResultadoAposta.innerHTML = `<p>🎉 Ganhou! Saiu ${resultado.numero} - ${resultado.cor}</p>`;
                        dinheiro = dinheiro + (valorApostado * (2 * (0.1 * peso)));
                    } else {
                        divResultadoAposta.innerHTML = `<p>❌ Perdeu! Saiu ${resultado.numero} - ${resultado.cor}</p>`;
                        dinheiro = dinheiro - valorApostado;
                    }
                }

                // Atualiza saldo
                AtualizarSaldo();

                // Se o jogador ficou sem dinheiro
                if (dinheiro <= 0) {
                    alert("Você perdeu todo o dinheiro! O jogo será reiniciado.");
                    location.reload();
                    return;
                }

                botao.disabled = false;
            }, 1000);

            return;
        }

        // animação da roleta
        const atual = roleta[index % roleta.length];
        divResultadoAposta.textContent = `${atual.numero} - ${atual.cor.toUpperCase()}`;
        divResultadoAposta.style.color = cores[atual.cor];
        divResultadoAposta.style.textAlign = "center";


        if (p > totalPassos - 10) velocidade += 80;
        else if (p > totalPassos - 20) velocidade += 40;
        else if (p > totalPassos - 30) velocidade += 20;

        index++;
        setTimeout(() => loop(p + 1), velocidade);
    }

    loop(passos);
}

// Principal
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        tipoAposta = radio.value;

        if (tipoAposta === "cor") {
            divTipoAposta.innerHTML = `
                <select id="inputCor">
                    <option value="preto">Preto</option>
                    <option value="vermelho">Vermelho</option>
                </select>
                <input type="number" id="valorApostado" placeholder="Quanto quer jogar?">
                <br>
                <input type="button" id="botao" value="Jogar!">
            `;
            const corEscolhida = document.getElementById("inputCor")

            corEscolhida.style.fontFamily = "'Segoe UI Black', sans-serif"
            corEscolhida.style.borderRadius = "10px"
            corEscolhida.style.height = "42px"
            corEscolhida.style.width = "auto"
            corEscolhida.style.border = "none"

            const valorApostado = document.getElementById("valorApostado")

            valorApostado.style.fontFamily = "'Segoe UI Black', sans-serif"
            valorApostado.style.borderRadius = "10px"
            valorApostado.style.height = "40px"
            valorApostado.style.width = "auto"
            valorApostado.style.border = "none"

            const botao = document.getElementById("botao")
            botao.style.fontFamily = "'Segoe UI Black', sans-serif"
            botao.style.borderRadius = "10px"
            botao.style.cursor = "pointer"
            botao.style.border = "none"
            botao.style.backgroundColor = "white"
            botao.style.width = "200px";
            botao.style.height = "40px";
            botao.style.marginLeft = "40px"
            botao.style.marginTop = "10px"

        } else {
            divTipoAposta.innerHTML = `
                <input type="number" id="inputNumero" min="1" max="36" placeholder="1 a 36">
                <input type="number" id="valorApostado" placeholder="Quanto quer jogar?">
                <br>
                <input type="button" id="botao" value="Jogar!">
            `;

            const numeroEscolhido = document.getElementById("inputNumero")

            numeroEscolhido.style.fontFamily = "'Segoe UI Black', sans-serif"
            numeroEscolhido.style.borderRadius = "10px"
            numeroEscolhido.style.height = "42px"
            numeroEscolhido.style.width = "55px"
            numeroEscolhido.style.border = "none"

            const valorApostado = document.getElementById("valorApostado")

            valorApostado.style.fontFamily = "'Segoe UI Black', sans-serif"
            valorApostado.style.borderRadius = "10px"
            valorApostado.style.height = "40px"
            valorApostado.style.width = "auto"
            valorApostado.style.border = "none"

            const botao = document.getElementById("botao")
            botao.style.fontFamily = "'Segoe UI Black', sans-serif"
            botao.style.borderRadius = "10px"
            botao.style.cursor = "pointer"
            botao.style.border = "none"
            botao.style.backgroundColor = "white"
            botao.style.width = "200px";
            botao.style.height = "40px";
            botao.style.marginLeft = "27px"
            botao.style.marginTop = "10px"
        }

        const botao = document.getElementById("botao");
        botao.addEventListener("click", () => {
            botao.disabled = true;

            const { numAleatorio, corSorteada } = GirarRoleta();
            const totalPassos = roleta.length * 3 + numAleatorio;
            Girar(0, totalPassos, numAleatorio, botao, corSorteada);
        });
    });
});

