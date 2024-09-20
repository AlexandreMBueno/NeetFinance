<template>
  <div>
    <!-- Navbar será importada e exibida aqui -->
    <Navbar />

    <div class="register-container">
      <h2>Bem Vindo</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Digite seu email" required />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input v-model="senha" type="password" id="senha" placeholder="Digite sua senha" required />
        </div>
        <div class="button-group">
          <button type="submit">Registrar-se</button>
          <button type="button" @click="handleLogin">Login</button> <!-- Botão de login -->
        </div>
        <p>{{ responseMessage }}</p> <!-- Exibir mensagem do back-end-->
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';  // Import o componente Navbar

export default {
  name: 'NfRegister',  // mudei nome p Nfregister
  components: {
    Navbar,  
  },
  data() {
    return {
      email: '',
      senha: '',
      responseMessage: '',  // Para armazenar a resposta do back-end
    };
  },
  methods: {
    async handleRegister() {  // Método de registro
      try {
        const response = await axios.post('http://127.0.0.1:8000/register', {
          email: this.email,
          senha: this.senha,
        });

        this.responseMessage = response.data.message;
        this.email = '';
        this.senha = '';
      } catch (error) {
        this.responseMessage = "Erro ao conectar com o servidor.";
      }
    },
    async handleLogin() {  // Método de login
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', {
          email: this.email,
          senha: this.senha,
        });

        if (response.data.id) {
          localStorage.setItem('userId', response.data.id);  // Armazenar o ID do user
          this.responseMessage = "Login bem-sucedido!";
        } else {
          this.responseMessage = "Falha no login, verifique suas credenciais.";
        }

        this.email = '';
        this.senha = '';
      } catch (error) {
        this.responseMessage = "Erro ao conectar com o servidor.";
      }
    }
  },
};
</script>

<style scoped>
.register-container {
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

.button-group {
  display: flex;
  justify-content: space-between;
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
