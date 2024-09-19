<template>
  <div class="container">
    <!-- Sidebar com os enunciados dos exercícios -->
    <div class="sidebar">
      <h3>Exercícios</h3>
      <ul>
        <li v-for="(exercise, index) in exercises" :key="index" @click="selectExercise(exercise)">
          {{ exercise.question }}
        </li>
      </ul>
    </div>

    <!-- Exibição do exercício selecionado -->
    <div class="exercise-content" v-if="selectedExercise">
      <h2>{{ selectedExercise.question }}</h2>
      <div v-for="(option, i) in selectedExercise.options" :key="i">
        <label>
          <input type="radio" :value="option" v-model="selectedAnswer" />
          {{ option }}
        </label>
      </div>
      <button @click="submitAnswer">Enviar</button>
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NfExercicios',
  data() {
    return {
      exercises: [],          // Lista de exercícios
      selectedExercise: null, // Exercício selecionado
      selectedAnswer: '',     // Resposta escolhida
      responseMessage: '',    // Mensagem de resposta
    };
  },
  mounted() {
    this.fetchExercises();
  },
  methods: {
    // Buscar exercícios do banco de dados
    fetchExercises() {
      axios.get('http://127.0.0.1:8000/exercicios')
        .then(response => {
          this.exercises = response.data;
        })
        .catch(() => {
          this.responseMessage = "Erro ao buscar exercícios.";
        });
    },
    // Exibir o exercício selecionado
    selectExercise(exercise) {
      this.selectedExercise = exercise;
      this.selectedAnswer = ''; // Resetar resposta ao selecionar novo exercício
      this.responseMessage = ''; // Resetar mensagem ao selecionar novo exercício
    },
    // Enviar a resposta do exercício selecionado
    submitAnswer() {
      if (!this.selectedAnswer) {
        this.responseMessage = "Por favor, selecione uma resposta.";
        return;
      }

      axios.post('http://127.0.0.1:8000/responder-exercicio', {
        answer: this.selectedAnswer,
        exercicio_id: this.selectedExercise.id
      })
        .then(response => {
          this.responseMessage = response.data.message;
        })
        .catch(() => {
          this.responseMessage = "Erro ao enviar a resposta.";
        });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  height: 100vh; /* A sidebar e o conteúdo ocupam toda a altura da página */
}

.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #ccc;
  padding: 20px;
  position: fixed; /* Fixar a sidebar à esquerda */
  left: 0;
  top: 0px; /* Ajustar a sidebar para começar abaixo da navbar (assumindo que a navbar tem 60px de altura) */
  bottom: 0;
  overflow-y: auto; /* Permitir rolagem se a lista for muito longa */
}

.sidebar h3 {
  margin-top: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
  cursor: pointer;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 4px;
}

.sidebar li:hover {
  background-color: #ced4da;
}

.exercise-content {
  margin-left: 270px; /* Espaço para o conteúdo da sidebar */
  padding: 20px;
  flex-grow: 1; /* O conteúdo do exercício ocupa o restante da página */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o exercício horizontalmente */
  margin-top: 50px; /* Ajusta a posição verticalmente abaixo da navbar */
}

label {
  display: block;
  margin-bottom: 10px;
  text-align: left;
}

input[type="radio"] {
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 20px;
  font-size: 18px;
}

</style>
