<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/register">Login</router-link></li>
        <li><router-link to="/">NeetFinance</router-link></li>
        <li><router-link to="/exercicios">Exercícios</router-link></li>
        <li><router-link to="/cursos">Cursos</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NfNavbar',
  };
  </script>
  
  <style scoped>

  .navbar {
    width: 100%;
    background-color: #333;
    padding: 10px 0;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  
  .navbar ul li {
    margin: 0 15px;
  }
  
  .navbar ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  .navbar ul li a:hover {
    text-decoration: underline;
  }
  </style>
  