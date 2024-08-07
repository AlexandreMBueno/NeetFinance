// Pega os elementos da lista de exercicios e conteudo do exercicio
const listaDeExercicios = document.getElementById('lista-exercicio');
const areaDeConteudoExercicio = document.getElementById('area-exercicio');
const barraDeProgresso = document.getElementById('progress'); // Corrigido para "progress"
const textoDeProgresso = document.getElementById('progress-text'); // Corrigido para "progress-text"

let exerciciosCompletos = 0; // let serve para definir variavel que pode ter seu valor alterado
                             // nesse caso o numero de exercicios completos q mudara com o tempo

// info dos exerciciios
// aq tamo definindo um objeto(const) exercicios que tem a chave de cada ex(1, 2, 3, respectivos titulos e conteudos
const exercicios = {
    1: {
        titulo: '1. Soma de dois valores.', // titulo
        conteudo: 'Nesse exercicio voce deve calcular o valor da soma de dois numeros.', // desc
        completo: false // status do ex
    },
    2: {
        titulo: '2. Subtracao de dois valores.',
        conteudo: 'Nesse exercicio voce deve calcular o valor da subtracao de dois numeros.',
        completo: false
    },
    3: {
        titulo: '3. Multiplicacao de dois valores',
        conteudo: 'Nesse exercicio voce deve calcular o valor da multiplicacao de dois numeros.',
        completo: false
    }
};

/* Quando clicar em um exercicio da sidebar ele aparece na main como selecionado */
// aq temos um eventlistener que e uma funcao para quando aacontece algo, realiza tal coisa
// a logica e simples, quando clicamos em um exercicio, verificamos seu id e se ele existe no objeto exercicios criado acima e...
//... atualizamos a area de ConteudoExercicios para o ex selecionado
listaDeExercicios.addEventListener('click', function(evento) {
    const id = evento.target.dataset.id;
    if (id && exercicios[id]) {
        const exercicio = exercicios[id];
        areaDeConteudoExercicio.innerHTML = `
            <h3>${exercicio.titulo}</h3>
            <p>${exercicio.conteudo}</p>
            <button id="enviar-exercicio">Enviar</button>
        `; // esse ${} e so p colocar variavel

    const botaoEnviar = document.getElementById('enviar-exercicio');
    botaoEnviar.addEventListener('click', function() {

        if (!exercicio.completo) {
            exercicio.completo = true;
            exerciciosCompletos++;
            atualizarProgresso();
        }
    });
}
});

function atualizarProgresso(){
    const porcentagem = (exerciciosCompletos / 3) * 100;
    barraDeProgresso.style.width = `${porcentagem}%`;
    textoDeProgresso.textContent = `${exerciciosCompletos} / 3 completos`;
}


// PASSAR BOTAO PARA HTML PARA CUSTOMIZAR COM CSS
// FEITO AQUI SOMENTE COMO TESTE