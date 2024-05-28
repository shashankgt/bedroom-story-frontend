import { createRouter, createWebHistory } from "vue-router";
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import Home from './components/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
  ],
});

export default router;
