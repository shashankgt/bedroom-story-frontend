import { createRouter, createWebHistory } from "vue-router";
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Home from './views/Home.vue';
import CreateStory from "./views/Create-Stories.vue";
import ReadStory from './views/Read-Story.vue';
import StoryCollection from './views/Story-Collection.vue';

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
    {
      path: '/generate-stories',
      name: 'generate-stories',
      component: CreateStory
    },
    {
      path: '/read-story/:id',
      name: 'read-story',
      component: ReadStory
    },
    {
      path: '/story-collection',
      name: 'story-collection',
      component: StoryCollection
    },
  ],
});

export default router;
