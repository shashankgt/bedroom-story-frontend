<template>
  <v-container class="story-collection">
    <div class="header">
      <v-row align="start" no-gutters>
        <v-col cols="4" align="start">
          <h1 class="page-title">Story Collection</h1>
        </v-col>
        <v-col cols="8">
          <v-row align="center" no-gutters>
            <v-col cols="10">
              <v-text-field
                v-model="searchText"
                label="Search "
                variant="underlined"
                class="search-field"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="filterStories">
                <v-icon class="search-icon">mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(story, index) in filteredStories" :key="index">
        <v-card class="custom-card card-item" @click="navigateToStory(story.storyId)">
          <v-card-text>{{ story.story.substring(0,200) }} ...</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="searchError" class="error-message">{{ searchError }}</div>
    <div class="back-container">
      <router-link to="/home">
        <v-btn class="back-btn">Back</v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import storyServices from '../services/storyServices';
import genreServices from '../services/genreServices';
import { useRouter } from 'vue-router';

const router = useRouter();
const stories = ref([]);
const genres = ref([]);
const filteredStories = ref([]);
const searchText = ref('');
const searchError = ref('');
const user = ref(null);

// Fetch user's stories from the backend
const fetchUserStories = async () => {
  if (user.value && user.value.id) {
    try {
      const response = await storyServices.getStoriesByMemberId(user.value.id);
      stories.value = response.data;
      filterStories(); // Initialize filteredStories
    } catch (error) {
      console.error('Error fetching user stories:', error);
    }
  }
};

// Fetch genres from the backend
// const fetchGenres = async () => {
//   try {
//     const response = await genreServices.getGenres();
//     genres.value = response.data.map(genre => genre.genreName.toLowerCase());
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//   }
// };

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'));
  fetchUserStories();
  // fetchGenres();
});

// Define method to navigate to a specific story
const navigateToStory = (storyId) => {
  router.push({ name: 'read-story', params: { id: storyId } });
};

// Filter stories based on the selected genre
const filterStories = () => {
  searchError.value = '';
  const query = searchText.value.trim().toLowerCase();
  
  if (query) {
    filteredStories.value = stories.value.filter(story => {
      const genreMatch = story.genre.genreName.toLowerCase().includes(query);
      const themeMatch = story.theme.themeName.toLowerCase().includes(query);
      const languageMatch = story.language.languageName.toLowerCase().includes(query);
      const roleMatch = story.role.roleName.toLowerCase().includes(query);
      const settingMatch = story.settings.name.toLowerCase().includes(query);
      const storyContentMatch = story.story.toLowerCase().includes(query);
      
      return genreMatch || themeMatch || storyContentMatch || languageMatch || roleMatch || settingMatch;
    });

    if (filteredStories.value.length === 0) {
      searchError.value = 'No stories found matching your search criteria.';
    }
  } else {
    filteredStories.value = stories.value;
  }
};


</script>

<style scoped>
.story-collection .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.page-title {
  margin-bottom: 0;
  margin-right: 20px;
}

.search-field {
  width: 100%;
}

.custom-card {
  background-color: rgb(250, 246, 253) !important;
  color: #4A148C !important;
  border: 2px solid #4c1590;
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
  color: #4A148C !important;
}

.custom-card .v-card-text {
  font-size: 0.875rem;
  text-align: center;
  padding: 10px;
  color: #4A148C !important;
}

.custom-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.custom-card .v-card-text {
  z-index: 1;
  color: white;
}

.error-message {
  border: 1px solid orangered;
  color: #4a4848;
  border-radius: 3px;
  width: 90%;
  height: 50px;
  align-content: center;
  border-left-width: thick;
  margin-top: 15px;
}

.back-btn {
  margin: 10px 0;
  margin-right: 10px;
  border: 1px solid #4e01ab;
  background-color: white;
  color: #4a148c;
  text-transform: none;
  font-family: "Arial", sans-serif;
}

.back-container {
  text-align: start;
  margin-top: 15px;
}

.search-icon {
  color: #6707db;
}

.v-text-field {
  color: #2c0275 !important;
}
</style>
