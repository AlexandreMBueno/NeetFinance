<template>
  <div>
    <h2>Exercícios</h2>
    <div v-for="(exercise, index) in exercises" :key="index">
      <p>{{ exercise.question }}</p>
      <label v-for="(option, i) in exercise.options" :key="i">
        <input type="radio" :value="option" v-model="selectedAnswers[exercise.id]" />
        {{ option }}
      </label>
    </div>
    <button @click="submitAnswers">Enviar</button>
    <p>{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NfExercicios',
  data() {
    return {
      exercises: [],
      selectedAnswers: {}, // Armazena as respostas selecionadas por exercício
      responseMessage: '',
    };
  },
  mounted() {
    this.fetchExercises();
  },
  methods: {
    fetchExercises() {
      axios.get('http://127.0.0.1:8000/exercicios')
        .then(response => {
          this.exercises = response.data;
        })
        .catch(() => {
          this.responseMessage = "Erro ao buscar exercícios.";
        });
    },
    submitAnswers() {
      // Enviar as respostas selecionadas
      axios.post('http://127.0.0.1:8000/responder-exercicio', { answers: this.selectedAnswers })
        .then(response => {
          this.responseMessage = response.data.message;
        })
        .catch(() => {
          this.responseMessage = "Erro ao enviar as respostas.";
        });
    },
  },
};
</script>

<style>
label {
  display: block;
  margin-bottom: 10px;
  text-align: left;
}

input[type="radio"] {
  margin-right: 10px;
}

button {
  padding: 5px;
}
</style>
