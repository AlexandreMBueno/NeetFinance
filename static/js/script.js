document.addEventListener('DOMContentLoaded', function() {
    const areaDeConteudoExercicio = document.getElementById('area-exercicio');
    const barraDeProgressoEasy = document.getElementById('progress-easy'); 
    const barraDeProgressoMedium = document.getElementById('progress-medium'); 
    const barraDeProgressoHard = document.getElementById('progress-hard'); 
    const textoDeProgressoEasy = document.getElementById('progress-text-easy'); 
    const textoDeProgressoMedium = document.getElementById('progress-text-medium'); 
    const textoDeProgressoHard = document.getElementById('progress-text-hard'); 

    let exerciciosCompletosEasy = 0; 
    let exerciciosCompletosMedium = 0; 
    let exerciciosCompletosHard = 0; 

    const exercicios = {
        1: { titulo: '1. O que é um orçamento pessoal? (facil).', conteudo: 'Selecione a definição correta para um orçamento pessoal.', opcoes: ['Um plano para gastar dinheiro de forma planejada.', 'Uma maneira de guardar todo o dinheiro que ganha.', 'Uma ferramenta para calcular impostos.'], respostaCorreta: "Um plano para gastar dinheiro de forma planejada.", completo: false, dificuldade: 'facil' },
        2: { titulo: '2. O que é uma poupança? (facil).', conteudo: 'Escolha a opção que melhor descreve o que é uma poupança.', opcoes: ['Uma conta para guardar dinheiro para emergências.', 'Uma forma de gastar dinheiro com entretenimento.', 'Um empréstimo feito ao banco.'], respostaCorreta: "Uma conta para guardar dinheiro para emergências.", completo: false, dificuldade: 'facil' },
        3: { titulo: '3. Qual a função dos juros compostos? (facil).', conteudo: 'Selecione a definição correta sobre juros compostos.', opcoes: ['Aumentar o montante de um investimento ao longo do tempo.', 'Reduzir o valor da dívida.', 'Manter o saldo bancário constante.'], respostaCorreta: "Aumentar o montante de um investimento ao longo do tempo.", completo: false, dificuldade: 'facil' },
        4: { titulo: '4. O que é diversificação de investimentos? (medio).', conteudo: 'Escolha a opção que melhor descreve a diversificação de investimentos.', opcoes: ['Distribuir o capital entre diferentes tipos de investimentos para reduzir riscos.', 'Colocar todo o dinheiro em uma única ação.', 'Focar apenas em investimentos de renda fixa.'], respostaCorreta: "Distribuir o capital entre diferentes tipos de investimentos para reduzir riscos.", completo: false, dificuldade: 'medio' },
        5: { titulo: '5. Qual é a principal característica de uma ação? (medio).', conteudo: 'Selecione a melhor descrição de uma ação no mercado financeiro.', opcoes: ['Uma fração do capital de uma empresa.', 'Uma taxa cobrada pelo banco.', 'Um tipo de dívida adquirida pelo governo.'], respostaCorreta: "Uma fração do capital de uma empresa.", completo: false, dificuldade: 'medio' },
        6: { titulo: '6. O que é um fundo de investimento? (medio).', conteudo: 'Escolha a melhor descrição de um fundo de investimento.', opcoes: ['Um grupo de investidores que junta dinheiro para investir em diferentes ativos.', 'Uma conta bancária que acumula juros.', 'Um empréstimo coletivo feito ao governo.'], respostaCorreta: "Um grupo de investidores que junta dinheiro para investir em diferentes ativos.", completo: false, dificuldade: 'medio' },
        7: { titulo: '7. Qual é a diferença entre inflação e deflação? (dificil).', conteudo: 'Selecione a opção que melhor descreve a diferença entre inflação e deflação.', opcoes: ['Inflação é o aumento geral dos preços, enquanto deflação é a diminuição dos preços.', 'Inflação é a queda dos preços, enquanto deflação é o aumento dos preços.', 'Inflação e deflação são termos que significam a mesma coisa.'], respostaCorreta: "Inflação é o aumento geral dos preços, enquanto deflação é a diminuição dos preços.", completo: false, dificuldade: 'dificil' },
        8: { titulo: '8. O que é um índice de ações? (dificil).', conteudo: 'Escolha a melhor definição para um índice de ações.', opcoes: ['Um indicador que mede o desempenho de um grupo de ações.', 'Uma taxa fixa cobrada por todas as ações.', 'Uma classificação das ações mais baratas.'], respostaCorreta: "Um indicador que mede o desempenho de um grupo de ações.", completo: false, dificuldade: 'dificil' },
        9: { titulo: '9. O que significa a diversificação geográfica em investimentos? (dificil).', conteudo: 'Selecione a definição correta para diversificação geográfica em investimentos.', opcoes: ['Investir em diferentes regiões ou países para reduzir riscos.', 'Investir em várias empresas de um único setor.', 'Concentrar investimentos em uma única cidade.'], respostaCorreta: "Investir em diferentes regiões ou países para reduzir riscos.", completo: false, dificuldade: 'dificil' }
    };

    let conteudo = '';
    for (const id in exercicios) {
        const exercicio = exercicios[id];
        conteudo += `
            <div data-id="${id}" class="enunciado-exercicio">${exercicio.titulo}</div>
        `;
    }
    areaDeConteudoExercicio.innerHTML = conteudo;

    // colocamos event listener para os titulos para abrir o exercicio com as opcoes multipla escolha
    const enunciados = document.querySelectorAll('.enunciado-exercicio');
    enunciados.forEach(enunciado => {
        enunciado.addEventListener('click', function(evento) {
            const id = evento.target.dataset.id;
            if (id && exercicios[id]) {
                const exercicio = exercicios[id];
                let opcoesHTML = '';
                exercicio.opcoes.forEach((opcao, index) => {
                    opcoesHTML += `
                        <div>
                            <input type="radio" id="opcao-${index}" name="opcoes" value="${opcao}">
                            <label for="opcao-${index}">${opcao}</label>
                        </div>
                    `;
                });

                areaDeConteudoExercicio.innerHTML = `
                    <h3>${exercicio.titulo}</h3>
                    <p>${exercicio.conteudo}</p>
                    ${opcoesHTML}
                    <button id="enviar-exercicio" class="button-submit-exercise">Enviar</button>
                `; // esse ${} e so p colocar variavel

                const botaoEnviar = document.getElementById('enviar-exercicio');
                botaoEnviar.addEventListener('click', function() {
                    const respostaUsuario = document.querySelector('input[name="opcoes"]:checked').value;

                    if (respostaUsuario === exercicio.respostaCorreta) { // verifica se a resposta ta certa
                        if (!exercicio.completo) {
                            exercicio.completo = true;
                            if (exercicio.dificuldade === 'facil') {
                                exerciciosCompletosEasy++;
                                atualizarProgresso(barraDeProgressoEasy, textoDeProgressoEasy, exerciciosCompletosEasy, 3);
                            } else if (exercicio.dificuldade === 'medio') {
                                exerciciosCompletosMedium++;
                                atualizarProgresso(barraDeProgressoMedium, textoDeProgressoMedium, exerciciosCompletosMedium, 3);
                            } else if (exercicio.dificuldade === 'dificil') {
                                exerciciosCompletosHard++;
                                atualizarProgresso(barraDeProgressoHard, textoDeProgressoHard, exerciciosCompletosHard, 3);
                            }
                            alert("Resposta Correta.");
                            
                            // Aqui fazemos o envio dos dados para salvar no banco
                            fetch('/api/completar_exercicio', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ exercicio_id: id })
                            })
                            .then(response => response.json())  // Converte a resposta para JSON
                            .then(data => {
                                if (data.status === 'success') {
                                    console.log("Exercicio completado e salvo no banco."); // so p ver se salvou  
                                } else if (data.status === 'error' && response.status === 401) {
                                    alert("Você precisa estar logado para completar o exercício.");
                                } else {
                                    console.error("Erro ao salvar o exercicio no banco:", data.message);
                                }
                            })
                            .catch(error => {
                                console.error("Erro na requisição:", error);
                            });
                        }
                    } else {
                        alert("Resposta incorreta. Tente novamente.");
                    }
                });
            }
        });
    });

    // login e registrro
    const formLogin = document.getElementById('login-form');
    const formError = document.getElementById('error-message');

    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, senha: senha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Login realizado com sucesso!');
                } else {
                    formError.style.display = 'block';
                    formError.textContent = data.message;
                }
            })
            .catch(error => console.error('Erro:', error));
            
        });

        document.getElementById('register-button').addEventListener('click', function() {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            fetch('url do lambda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, senha: senha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Conta criada com sucesso!');
                } else {
                    formError.style.display = 'block';
                    formError.textContent = data.message;
                }
            })
            .catch(error => console.error('Erro:', error));
        });
    }
});

function atualizarProgresso(barra, texto, completos, total) {
    const porcentagem = (completos / total) * 100;
    barra.style.width = `${porcentagem}%`; // preenchemos a barra cm a % relativa a qnts exercicios foram feitos
    texto.textContent = `${completos} / ${total}`; // atualizamos o numero de ex completos daquela dificuldade
}