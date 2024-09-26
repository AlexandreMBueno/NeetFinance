import { createRouter, createWebHistory } from 'vue-router'
import Exercicios from '../views/Exercicios.vue'
import Register from '../views/Register.vue'
import Cursos from '../views/Cursos.vue'
import Excursos from '../views/Excursos.vue'

const routes = [
  // {
  //   path: '/',               // Rota para a página inicial
  //   name: 'App',             // Pode dar o nome que quiser, por exemplo 'App'
  //   component: () => import('../App.vue')  // Importa diretamente o App.vue como rota
  //   // fazendo isso acima, duplica o conteudo pois entende que app.vue uma vez e a raiz do projeto e outra 
  //   // como rota, entao nao e necessario
  // }, 
  {
    path: '/exercicios',     // Rotas para ex, register e cursos
    name: 'Exercicios',
    component: Exercicios
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cursos',         
    name: 'Cursos',
    component: Cursos
  },
  {
    path: '/excursos',
    name: '/Excursos',
    component: Excursos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
