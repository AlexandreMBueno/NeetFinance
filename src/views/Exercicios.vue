<template>
  <div>
    <h2>Exercício 1</h2>
    <input v-model="userAnswer" placeholder="Digite sua resposta" />
    <button @click="checkAnswer">Enviar</button>
    <p>{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NfExercicios',  //Mantido p evitar erros(ver isso dps pq se tira da erro de 'must be multiword)
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
button {
  padding: 5px;
}
</style>
