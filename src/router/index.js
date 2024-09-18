import { createRouter, createWebHistory } from 'vue-router'
import Exercicios from '../views/Exercicios.vue'
import Login from '../views/Login.vue'

const routes = [
  // {
  //   path: '/',               // Rota para a página inicial
  //   name: 'App',             // Pode dar o nome que quiser, por exemplo 'App'
  //   component: () => import('../App.vue')  // Importa diretamente o App.vue como rota
  //   // fazendo isso acima, duplica o conteudo pois entende que app.vue uma vez e a raiz do projeto e outra 
  //   // como rota, entao nao e necessario
  // }, 
  {
    path: '/exercicios',     // Rota para a pag de exercícios
    name: 'Exercicios',
    component: Exercicios
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
