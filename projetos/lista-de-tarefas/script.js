// Pegando os elementos da página
var campoTarefa = document.getElementById("campoTarefa");
var botaoAdicionar = document.getElementById("botaoAdicionar");
var lista = document.getElementById("lista");
var contador = document.getElementById("contador");
var botaoTema = document.getElementById("botaoTema");

// Lista de tarefas. Cada tarefa é um objeto: { texto: "...", concluida: false }
var tarefas = [];

// ===== localStorage =====

function salvarTarefas() {
    // localStorage só guarda texto, por isso usamos JSON.stringify
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    var salvas = localStorage.getItem("tarefas");

    if (salvas != null) {
        tarefas = JSON.parse(salvas);
    }
}

// ===== Mostrar as tarefas na tela =====

function mostrarTarefas() {
    // Limpa a lista antes de desenhar de novo
    lista.innerHTML = "";

    for (var i = 0; i < tarefas.length; i++) {
        var item = document.createElement("li");

        if (tarefas[i].concluida) {
            item.classList.add("concluida");
        }

        // Caixinha para marcar como concluída
        var caixa = document.createElement("input");
        caixa.type = "checkbox";
        caixa.checked = tarefas[i].concluida;
        caixa.setAttribute("data-indice", i);
        caixa.addEventListener("change", concluirTarefa);

        // Texto da tarefa
        var texto = document.createElement("span");
        texto.textContent = tarefas[i].texto;

        // Botão de remover
        var botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "remover";
        botaoRemover.setAttribute("data-indice", i);
        botaoRemover.addEventListener("click", removerTarefa);

        item.appendChild(caixa);
        item.appendChild(texto);
        item.appendChild(botaoRemover);
        lista.appendChild(item);
    }

    atualizarContador();
}

function atualizarContador() {
    var feitas = 0;

    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].concluida) {
            feitas++;
        }
    }

    if (tarefas.length == 0) {
        contador.textContent = "Nenhuma tarefa ainda.";
    } else {
        contador.textContent = feitas + " de " + tarefas.length + " tarefas concluídas";
    }
}

// ===== Ações =====

function adicionarTarefa() {
    var texto = campoTarefa.value.trim();

    if (texto == "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({ texto: texto, concluida: false });

    campoTarefa.value = "";
    salvarTarefas();
    mostrarTarefas();
}

function concluirTarefa(evento) {
    var indice = evento.target.getAttribute("data-indice");
    tarefas[indice].concluida = evento.target.checked;

    salvarTarefas();
    mostrarTarefas();
}

function removerTarefa(evento) {
    var indice = evento.target.getAttribute("data-indice");

    // splice remove 1 item na posição "indice"
    tarefas.splice(indice, 1);

    salvarTarefas();
    mostrarTarefas();
}

// ===== Tema claro / escuro =====

function trocarTema() {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botaoTema.textContent = "☀️ Claro";
        localStorage.setItem("tema", "escuro");
    } else {
        botaoTema.textContent = "🌙 Escuro";
        localStorage.setItem("tema", "claro");
    }
}

function carregarTema() {
    var tema = localStorage.getItem("tema");

    if (tema == "escuro") {
        document.body.classList.add("escuro");
        botaoTema.textContent = "☀️ Claro";
    }
}

// ===== Eventos =====

botaoAdicionar.addEventListener("click", adicionarTarefa);

// Permite adicionar apertando Enter
campoTarefa.addEventListener("keydown", function (evento) {
    if (evento.key == "Enter") {
        adicionarTarefa();
    }
});

botaoTema.addEventListener("click", trocarTema);

// ===== Quando a página abre =====
carregarTema();
carregarTarefas();
mostrarTarefas();
