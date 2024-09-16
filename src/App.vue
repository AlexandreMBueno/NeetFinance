<!-- HTML -->
<template>
  <div id="app">
    <h1> NeetFinance </h1>
    <MyButton :label="'Clique aqui!'" @click="handleClick" />
  </div>
</template>

<!-- JS -->
<script>
import MyButton from './components/Button.vue'

export default {
  components: {
    MyButton,
  },
  methods: {
    handleClick() {
      alert('Você clicou no botão!')
    }
  }
}
</script>

<!-- CSS -->
<style>
  h1 {
    text-align: center;
    margin-top: 0;
    padding-top: 20px; /* distancia do topo  */
  }

  /* Centraliza o conteúdo verticalmente e horizontalmente */
  #app {
    display: flex;
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: center; 
    min-height: 100vh; 
  }
</style>
