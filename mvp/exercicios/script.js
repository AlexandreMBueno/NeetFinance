// Pega os elementos da lista de exercicios e conteudo do exercicio
const listaDeExercicios = document.getElementById('lista-exercicio');
const areaDeConteudoExercicio = document.getElementById('area-exercicio');
const barraDeProgresso = document.getElementById('progress'); // Corrigido para "progress"
const textoDeProgresso = document.getElementById('progress-text'); // Corrigido para "progress-text"

let exerciciosCompletos = 0; // let serve para definir variavel que pode ter seu valor alterado
                             // nesse caso o numero de exercicios completos q mudara com o tempo

// info dos exerciciios
// aq tamo definindo um objeto(const) exercicios que tem a chave de cada ex(1, 2, 3, respectivos titulos, conteudos, resposta, status etc
const exercicios = {
    1: {
        titulo: '1. Soma de dois valores.', // titulo
        conteudo: 'Quanto é 10 + 10?', // desc
        respostaCorreta: "20",
        completo: false // status do ex
    },
    2: {
        titulo: '2. Subtracao de dois valores.',
        conteudo: 'Quanto é 10 - 5?',
        respostaCorreta: "5",
        completo: false
    },
    3: {
        titulo: '3. Multiplicacao de dois valores',
        conteudo: 'Quanto é 10 x 5?',
        respostaCorreta: "50",
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
            <textarea id="resposta-exercicio-${id}" class="input-answer" rows="4" cols="50"></textarea><br>
            <button id="enviar-exercicio" class="button-submit-exercise">Submit</button>
        `; // esse ${} e so p colocar variavel

    const botaoEnviar = document.getElementById('enviar-exercicio');
    botaoEnviar.addEventListener('click', function() {
        const respostaUsuario = document.getElementById(`resposta-exercicio-${id}`).value;

        if (respostaUsuario.trim() === exercicio.respostaCorreta) { // verfiica se a resposta ta certa
            if (!exercicio.completo) {
                exercicio.completo = true;
                exerciciosCompletos++;
                atualizarProgresso();
                alert("Resposta Correta.") // deixar isso mais user friendly
            }
        } else {
            alert("Resposta incorreta. Tente novamente.");
        }
    });
}
});

function atualizarProgresso(){
    const porcentagem = (exerciciosCompletos / 3) * 100;
    barraDeProgresso.style.width = `${porcentagem}%`;
    textoDeProgresso.textContent = `${exerciciosCompletos} / 3 completos`;
}
