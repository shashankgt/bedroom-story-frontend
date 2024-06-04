<template>
  <div class="create-stories">
    <v-container>
      <h1 class="page-title">Generate Stories</h1>
      <v-form @submit.prevent="submitForm">

        <v-combobox v-model="selectedGenre" class="outlined-purple" :items="genres" label="Genre" variant="outlined" allow-overflow></v-combobox>
        
        <v-combobox  variant="outlined" class="outlined-purple" v-model="selectedLanguage" :items="languages"  label="Language" ></v-combobox>
        
        <v-combobox variant="outlined" class="outlined-purple" v-model="selectedTheme" :items="themes" label="Theme" allow-overflow></v-combobox>

        <v-combobox variant="outlined" class="outlined-purple" v-model="selectedRole" :items="roles" label="Role" allow-overflow></v-combobox>

        <v-combobox variant="outlined" class="outlined-purple" v-model="selectedSettings" :items="settings" label="Settings" allow-overflow></v-combobox>

        <v-select v-model="selectedSize" class="outlined-purple" :items="sizes" label="Size" variant="outlined"></v-select>
        
        <v-btn type="submit" color="primary" class="submit-btn" :disabled="isLoading">
          <template v-if="isLoading">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
          </template>
          <template v-else>
            Submit
          </template>
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import genreServices from '../services/genreServices.js';
import languageServices from '../services/languageServices.js';
import themeServices from '../services/themeServices.js';
import roleServices from "../services/roleServices";
import sizeServices from "../services/sizeServices";
import settingsServices from "../services/settingsServices";
import storyServices from "../services/storyServices";


const selectedGenre = ref('');
const selectedLanguage = ref('');
const selectedTheme = ref('');
const selectedRole = ref('');
const selectedSettings = ref('');
const selectedSize = ref('');
const isLoading = ref(false);

const router = useRouter();

const genres = ref([]);
const languages = ref([]);
const themes = ref([]);
const roles = ref([]);
const sizes = ref([]);
const settings = ref([]);
const user = ref(null);

onMounted(()=> {
  user.value = JSON.parse(localStorage.getItem('user'));
})

const fetchDropdownOptions = async () => {
  try {
    const { data: genreData }  = await genreServices.getGenres();
    genres.value = genreData.map(item => item.genreName);
    
    const { data: languagesData } = await languageServices.getLanguages();
    languages.value = languagesData.map(item => item.languageName);
    
    const { data: themeData} = await themeServices.getThemes();
    themes.value = themeData.map(item => item.themeName);
    
    const { data: roleData} = await roleServices.getRoles();
    roles.value = roleData.map(item => item.roleName);

    const { data: settingsData} = await settingsServices.getSettings();
    settings.value = settingsData.map(item => item.name);
    
    const { data: sizeData } = await sizeServices.getSizes();
    sizes.value = sizeData.map(item => item.sizeName);
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
  }
};

const submitForm = async () => {
  isLoading.value = true;
  const story = {
    genre: selectedGenre.value,
    language: selectedLanguage.value,
    theme: selectedTheme.value,
    role: selectedRole.value,
    settings: selectedSettings.value,
    size: selectedSize.value,
    memberId: user.value.id
  };
  
  try {
    const response = await storyServices.addStory(story);
    
    router.push({ name: 'read-story', params: { id: response.data.storyId}});
  } catch (error) {
    console.error('Error generating story:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
    await fetchDropdownOptions();
})

</script>

<style scoped>
.page-title {
  font-family: 'Arial', sans-serif; 
  color: #0e0e0ed1;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.submit-btn {
  background-color: #6707db;
  color: white;
  font-weight: bold;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #792fd3;
  color: white;
}

.outlined-purple {
  color: #0e0e0ed1 !important;
}
</style>
