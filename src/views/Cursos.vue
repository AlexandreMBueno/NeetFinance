<template>
  <div class="cursos-container">
    <h1>Cursos</h1>
    <div class="cards-container">
      <router-link to="/excursos" class="card-link">
        <div class="card">
          <img :src="require('@/assets/imagemcard1.png')" />
          <p>Introdução às Finanças Pessoais</p>
          <p class="descricao">Aprenda os princípios básicos para organizar suas finanças e tomar decisões financeiras mais conscientes.</p>
        </div>
      </router-link>
      <router-link to="/excursos" class="card-link">
        <div class="card">
          <img :src="require('@/assets/imagemcard2.png')" />
          <p>Fundamentos de Investimentos</p>
          <p class="descricao">Entenda os conceitos essenciais de investimentos para iniciar sua jornada no mercado financeiro com confiança.</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NfCursos'
}
</script>

<style>
.cursos-container {
  text-align: center;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.card-link {
  text-decoration: none;
}

.card {
  height: 350px; /* Aumentando altura para incluir a descrição */
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: 155px;
  border-radius: 8px;
}

.card p {
  margin-top: 10px;
  font-weight: bold;
  color: #000;
}

.descricao {
  margin-top: 5px;
  font-size: 13px;
  color: #555;
}
</style>
