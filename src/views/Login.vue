<template>
    <div>
      <!-- Navbar será importada e exibida aqui -->
      <Navbar />
  
      <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Digite seu email" required />
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input v-model="password" type="password" id="password" placeholder="Digite sua senha" required />
          </div>
          <button type="submit">Entrar</button>
          <p>{{ responseMessage }}</p> <!-- pmostrar msg do backend-->
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Navbar from '../components/Navbar.vue';  // import o componente Navbar
  
  export default {
    name: 'NfLogin',
    components: {
      Navbar,  
    },
    data() {
      return {
        email: '',
        password: '',
        responseMessage: '',  // Pra armazenar a resposta do back-end
      };
    },
    methods: {
      async handleLogin() {
        try {
          // Envia a requisição POST com email e senha para o back-end
          const response = await axios.post('http://127.0.0.1:8000/login', {
            email: this.email,
            password: this.password,
          });
  
          // Exibe a mensagem de resposta do back-end
          this.responseMessage = response.data.message;
  
          // Limpa os campos de email e senha após o login
          this.email = '';
          this.password = '';
        } catch (error) {
          this.responseMessage = "Erro ao conectar com o servidor.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  
  p {
    color: red;
    margin-top: 10px;
  }
  </style>
  