<template>
  <v-container class="story-collection">
    <h1 class="page-title">Story Collection</h1>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(story, index) in stories" :key="index">
        <v-card class="custom-card card-item" @click="navigateToStory(story.storyId)">
          <v-card-text>{{ story.story.substring(0,200) }} ...</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import storyServices from '../services/storyServices';
import { useRouter } from 'vue-router';

const router = useRouter();
const stories = ref([]);

const fetchUserStories = async () => {
  try {
    const response = await storyServices.getStories();
    stories.value = response.data;
  } catch (error) {
    console.error('Error fetching user stories:', error);
  }
};

onMounted(() => {
  fetchUserStories();
});

const navigateToStory = (storyId) => {
  router.push({ name: 'read-story', params: { id: storyId } });
};
</script>

<style scoped>
.custom-card {
  background-color: #4c159082 !important;
  color: white;
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}

.custom-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.custom-card .v-card-title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.custom-card .v-card-text {
  font-size: 0.875rem;
  text-align: center;
  padding: 10px;
}

.custom-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.071);
  border-radius: 8px;
}

.custom-card .v-card-text {
  z-index: 1;
  color: white;
}
</style>

