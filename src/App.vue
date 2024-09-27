<template>
  <div id="app">
     <!-- Usa o componente Navbar importado  -->
    <Navbar />

    <!-- Exibe o conteúdo do App.vue apenas se estiver na rota '/' -->
    <div v-if="$route.path === '/'">
      <h1>NeetFinance</h1>
      <h1> A melhor maneira de aprender finanças, <br> do zero.</h1>
      <MyButton :label="'Get Pro'" @click="handleClick" />
    </div>

    <!-- renderizado conteudo da rota -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';  // Importa o componente Navbar
import MyButton from './components/Button.vue';  // "                " MyButton

export default {
  components: {
    Navbar,   // Declaramos o componente Navbar
    MyButton, // "                     " MyButton
  },
  methods: {
    handleClick() {
      alert('Você adquiriu a versao Pro!')
    }
  }
}
</script>

<!-- CSS -->
<style>
  h1 {
    text-align: center;
    margin-top: 0;
    padding-top: 20px;
  }

  #app {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    padding-top: 30px; 
  }

  a {
    text-decoration: none;
  }
</style>
