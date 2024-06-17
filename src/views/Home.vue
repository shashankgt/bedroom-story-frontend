<template>
  <v-container class="home">
    <v-row justify="center" class="mb-5">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="page-title">Welcome to the Story Platform</h1>
        <p class="page-subtitle">Create, manage, and explore stories with ease</p>
      </v-col>
    </v-row>
    <div v-if="isAdmin">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(card, index) in adminCards" :key="index">
          <v-card class="custom-card card-item" @click="navigateTo(card.route)">
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text class="white--text">{{ card.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(card, index) in nonAdminCards" :key="index">
          <v-card class="custom-card card-item" @click="navigateTo(card.route)">
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text class="white--text">{{ card.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isAdmin = ref(false);

const router = useRouter();

const user = ref(null);

const adminCards = [
  { title: 'Create Stories', description: 'Start creating new stories here', route: '/generate-stories' },
  { title: 'Story Collection', description: 'View and manage your stories', route: '/story-collection' },
  { title: 'User Story Collection', description: "View and manage user's stories", route: '/user-story-collection' },
  { title: 'Languages', description: 'Manage languages', route: '/languages' },
  { title: 'Themes', description: 'Manage themes', route: '/themes' },
  { title: 'Genres', description: 'Manage genres',route: '/genres' },
  { title: 'Roles', description: 'Manage roles',route: '/roles' },
  { title: 'Settings', description: 'Manage settings',route: '/settings' }
];

const nonAdminCards = [
  { title: 'Create Stories', description: 'Start creating new stories here', route: '/generate-stories' },
  { title: 'Story Collection', description: 'View and manage your stories', route: '/story-collection' }
];

onMounted(()=> {
  const userFromLocal = JSON.parse(localStorage.getItem('user'));
  if(!userFromLocal) {
    router.push({ name: "Login"});
  } else {
    user.value = userFromLocal;
    if (userFromLocal && userFromLocal.hasAdminAccess) {
      isAdmin.value = true;
    }
  }

})

const navigateTo = (route) => {
  router.push(route);
};
</script>

<style scoped>
.page-title {
  font-family: 'Arial', sans-serif;
  color: #4A148C;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.page-subtitle {
  font-family: 'Arial', sans-serif;
  color: #7149a1b9;
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.custom-card {
  background-color: white !important;
  color: #4A148C;
  width: 100%;
  padding: 24px;
  border: 2px solid #4c1590;
  border-radius: 8px; 
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.custom-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.custom-card .v-card-title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
}

.custom-card .v-card-text {
  font-size: 0.875rem;
  text-align: center;
}

</style>
