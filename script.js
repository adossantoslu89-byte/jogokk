
const perguntas = [
    {
        pergunta: "Qual linguagem cria a estrutura de uma página web?",
        alternativas: ["CSS", "HTML", "JavaScript", "Python"],
        correta: 1
    },
    {
        pergunta: "Qual linguagem é usada para estilizar páginas?",
        alternativas: ["CSS", "SQL", "HTML", "Java"],
        correta: 0
    },
    {
        pergunta: "Qual linguagem adiciona interatividade ao site?",
        alternativas: ["Python", "CSS", "JavaScript", "HTML"],
        correta: 2
    },
    {
        pergunta: "Qual tag HTML cria um botão?",
        alternativas: ["<p>", "<img>", "<button>", "<title>"],
        correta: 2
    },
    {
        pergunta: "Qual símbolo costuma terminar uma instrução em JavaScript?",
        alternativas: ["#", ";", "@", "&"],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

function iniciarJogo() {
    perguntaAtual = 0;
    pontos = 0;
    respondeu = false;

    document.getElementById("inicio").hidden = true;
    document.getElementById("resultado").hidden = true;
    document.getElementById("jogo").hidden = false;

    mostrarPergunta();
}

function mostrarPergunta() {
    respondeu = false;

    const item = perguntas[perguntaAtual];

    document.getElementById("progresso").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    document.getElementById("pergunta").textContent = item.pergunta;
    document.getElementById("feedback").textContent = "";

    document.getElementById("proximo").hidden = true;

    const area = document.getElementById("alternativas");
    area.innerHTML = "";

    item.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.className = "alternativa";

        botao.onclick = function () {
            verificarResposta(indice, botao);
        };

        area.appendChild(botao);
    });
}

function verificarResposta(indice, botaoEscolhido) {
    if (respondeu) {
        return;
    }

    respondeu = true;

    const correta = perguntas[perguntaAtual].correta;
    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach((botao, indiceBotao) => {
        botao.disabled = true;

        if (indiceBotao === correta) {
            botao.classList.add("correta");
        }
    });

    if (indice === correta) {
        pontos++;

        document.getElementById("feedback").textContent =
            "Parabéns! Resposta correta!";
    } else {
        botaoEscolhido.classList.add("errada");

        document.getElementById("feedback").textContent =
            "Resposta incorreta! Veja a alternativa verde.";
    }

    const proximo = document.getElementById("proximo");

    proximo.hidden = false;

    if (perguntaAtual === perguntas.length - 1) {
        proximo.textContent = "Ver resultado";
    } else {
        proximo.textContent = "Próxima pergunta";
    }
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    document.getElementById("jogo").hidden = true;
    document.getElementById("resultado").hidden = false;

    document.getElementById("pontuacaoFinal").textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

    let mensagem;

    if (pontos === perguntas.length) {
        mensagem = "Excelente! Você acertou todas as perguntas!";
    } else if (pontos >= 3) {
        mensagem = "Muito bem! Continue aprendendo!";
    } else {
        mensagem = "Continue praticando e tente novamente!";
    }

    document.getElementById("mensagemFinal").textContent = mensagem;
}
