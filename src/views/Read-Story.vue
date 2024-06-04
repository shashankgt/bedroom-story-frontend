<template>
  <v-container>
    <div class="read-story">
      <h1 class="page-title">Read Story</h1>
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else class="story-box">
        <p class="story-content">{{ story.story }}</p>
        <!-- Render other story details as needed -->
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import storyServices from "../services/storyServices";

const isLoading = ref(true);
const story = ref(null);
const route = useRoute();

onMounted(async () => {
  const id = parseInt(route.params.id);
  try {
    const response = await storyServices.getStoryById(id);
    story.value = response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.page-title {
  font-family: 'Arial', sans-serif;
  color: #0e0e0ed1;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.story-box {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1000px;
}

.story-content {
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: left; 
  white-space: pre-wrap;
  word-wrap: break-word;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
