<template>
  <div>
    <h2>Exercício 1</h2>
    <p>O que é considerado um ativo financeiro?</p>
    <label>
      <input type="radio" v-model="userAnswer" value="A" />
      A) Um fundo de investimento
    </label>
    <label>
      <input type="radio" v-model="userAnswer" value="B" />
      B) Um título de capitalização
    </label>
    <label>
      <input type="radio" v-model="userAnswer" value="C" />
      C) Ações de uma empresa
    </label>
    <label>
      <input type="radio" v-model="userAnswer" value="D" />
      D) Um CDB (Cert de Depos Bancário)
    </label>
    <button @click="checkAnswer">Enviar</button>
    <p>{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NfExercicios',
  data() {
    return {
      userAnswer: '',
      responseMessage: '',
    };
  },
  methods: {
    checkAnswer() {
      axios.post('http://127.0.0.1:8000/responder-exercicio', { answer: this.userAnswer })
        .then(response => {
          this.responseMessage = response.data.message;
        })
        .catch(() => {
          this.responseMessage = "Erro na conexão com o servidor.";
        });
    },
  },
};
</script>

<style>
label {
  display: block;
  margin-bottom: 10px;
  text-align: left; /* Alinha o texto à esquerda */
}

input[type="radio"] {
  margin-right: 10px; /* Adiciona espaçamento entre o botão de rádio e o texto */
}

button {
  padding: 5px;
}

</style>
