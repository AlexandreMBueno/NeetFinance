<template>
  <div class="container">
    <!-- Sidebar com os enunciados dos exercícios com curso_id = null -->
    <div class="sidebar">
      <h3>Curso - Introdução a financas pessoais</h3>

      <!-- Barra de progresso -->
      <div v-if="progress">
        <p>Progresso: {{ progress.completed }} / {{ progress.total }}</p>
        <progress :value="progress.completed" :max="progress.total"></progress>
      </div>

      <ul>
        <li v-for="(exercise, index) in exercises" :key="index" @click="selectExercise(exercise)">
          {{ exercise.question }}
        </li>
      </ul>
    </div>

    <!-- Exibe o exercício selecionado -->
    <div class="exercise-content" v-if="selectedExercise">
      <h2>{{ selectedExercise.question }}</h2>
      <div v-for="(option, i) in selectedExercise.options" :key="i">
        <label>
          <input type="radio" :value="option.trim().charAt(0)" v-model="selectedAnswer" />
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
      exercises: [],
      selectedExercise: null,
      selectedAnswer: '',
      responseMessage: '',
      progress: null,
    };
  },
  mounted() {
    this.fetchExercises();
    this.fetchProgress();
  },
  methods: {
    fetchExercises() {
      axios.get('http://127.0.0.1:8000/exercicios')
        .then(response => {
          // Filtra os exercícios com curso_id = null
          this.exercises = response.data.filter(exercise => exercise.curso_id === 2);
        })
        .catch(() => {
          this.responseMessage = "Erro ao buscar exercícios.";
        });
    },
    fetchProgress() {
      let userId = localStorage.getItem('userId');

      if (!userId) {
        this.responseMessage = "Usuário não autenticado.";
        return;
      }

      axios.get(`http://127.0.0.1:8000/progresso/${userId}/2`)
        .then(response => {
          this.progress = response.data;
        })
        .catch(() => {
          this.responseMessage = "Erro ao buscar progresso.";
        });
    },
    selectExercise(exercise) {
      this.selectedExercise = exercise;
      this.selectedAnswer = '';
      this.responseMessage = ''; 
    },
    submitAnswer() {
      if (!this.selectedAnswer) {
        this.responseMessage = "Por favor, selecione uma resposta.";
        return;
      }

      let userId = localStorage.getItem('userId');

      if (!userId) {
        this.responseMessage = "Usuário não autenticado.";
        return;
      }

      userId = parseInt(userId);

      axios.post('http://127.0.0.1:8000/responder-exercicio', {
        answer: this.selectedAnswer,
        exercicio_id: this.selectedExercise.id,
        user_id: userId
      })
      .then(response => {
        this.responseMessage = response.data.message;
        this.fetchProgress();
      })
      .catch(() => {
        this.responseMessage = "Erro ao enviar a resposta.";
      });
    }
  },
};
</script>

<style>
/* Mantenha o mesmo estilo que você já tem */
.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #ccc;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.sidebar h3 {
  margin-top: 0;
  color: rgb(0, 191, 255)
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
  margin-left: 270px;
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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

progress {
  width: 100%;
  height: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}

progress::-webkit-progress-value {
  background-color: rgb(0, 191, 255);
}

progress::-moz-progress-bar {
  background-color: rgb(0, 191, 255);
}
</style>
