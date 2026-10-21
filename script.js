
const botaoTema = document.querySelector("#botaoTema");

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botaoTema.textContent = "MODO CLARO";
    } else {
        botaoTema.textContent = "MODO ESCURO";
    }
});



const textoDigitado = document.querySelector("#textoDigitado");
const frase = "Desenvolvedor em formação";
let posicao = 0;
let apagando = false;

function digitar() {
    if (apagando == false) {
        // escrevendo
        posicao++;
        textoDigitado.textContent = frase.substring(0, posicao);

        if (posicao == frase.length) {
            apagando = true;
            setTimeout(digitar, 2000); // espera 2 segundos com a frase completa
            return;
        }
    } else {
        // apagando
        posicao--;
        textoDigitado.textContent = frase.substring(0, posicao);

        if (posicao == 0) {
            apagando = false;
        }
    }

    if (apagando) {
        setTimeout(digitar, 50);
    } else {
        setTimeout(digitar, 100);
    }
}

digitar();



const secoes = document.querySelectorAll(".aparecer");

function mostrarSecoes() {
    const alturaTela = window.innerHeight;

    secoes.forEach(function (secao) {
        const topoDaSecao = secao.getBoundingClientRect().top;

        if (topoDaSecao < alturaTela - 100) {
            secao.classList.add("visivel");
        }
    });
}

window.addEventListener("scroll", mostrarSecoes);
mostrarSecoes(); // roda uma vez quando a página abre


const itensContato = document.querySelectorAll(".item-contato");
const aviso = document.querySelector("#aviso");

itensContato.forEach(function (item) {
    item.addEventListener("click", function () {
        const texto = item.getAttribute("data-copiar");
        navigator.clipboard.writeText(texto);

        aviso.classList.add("mostrar");

        setTimeout(function () {
            aviso.classList.remove("mostrar");
        }, 2000);
    });
});



const botaoTopo = document.querySelector("#botaoTopo");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        botaoTopo.classList.add("mostrar");
    } else {
        botaoTopo.classList.remove("mostrar");
    }
});
