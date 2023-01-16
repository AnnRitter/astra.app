import { createRouter, createWebHashHistory } from 'vue-router'
import EnterScreen from '../views/EnterScreen.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EnterScreen
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import('../views/SignUp.vue')
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: function () {
      return import('../views/SignIn.vue')
    }
  },
  {
    path: '/main',
    name: 'main',
    component: function () {
      return import('../views/MainPage.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
