<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="title-container">
        <span>Edit Story Details</span>
        <v-spacer></v-spacer>
        <v-icon @click="closeDialog" class="close-icon">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <!-- Combobox for Genre -->
          <v-combobox v-model="selectedGenre" class="outlined-purple" :items="genres" label="Genre" variant="outlined" allow-overflow></v-combobox>
          
          <!-- Combobox for Language -->
          <v-combobox v-model="selectedLanguage" class="outlined-purple" :items="languages" label="Language" variant="outlined"></v-combobox>
          
          <!-- Combobox for Theme -->
          <v-combobox v-model="selectedTheme" class="outlined-purple" :items="themes" label="Theme" variant="outlined" allow-overflow></v-combobox>

          <!-- Combobox for Role -->
          <v-combobox v-model="selectedRole" class="outlined-purple" :items="roles" label="Role" variant="outlined" allow-overflow></v-combobox>

          <!-- Combobox for Settings -->
          <v-combobox v-model="selectedSettings" class="outlined-purple" :items="settings" label="Settings" variant="outlined" allow-overflow></v-combobox>

          <!-- Combobox for Size -->
          <v-select v-model="selectedSize" class="outlined-purple" :items="sizes" label="Size" variant="outlined"></v-select>

          <!-- Submit button with loader -->
          <v-btn type="submit" color="primary" class="submit-btn" :disabled="isLoading">
            <template v-if="isLoading">
              <v-progress-circular indeterminate color="white"></v-progress-circular>
            </template>
            <template v-else>
              Save
            </template>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import genreServices from '../services/genreServices.js';
import languageServices from '../services/languageServices.js';
import themeServices from '../services/themeServices.js';
import roleServices from "../services/roleServices";
import sizeServices from "../services/sizeServices";
import settingsServices from "../services/settingsServices";
import storyServices from "../services/storyServices";

const props = defineProps({
  modelValue: Boolean,
  story: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      genre: '',
      language: '',
      theme: '',
      role: '',
      settings: '',
      size: ''
    })
  }
});
const emit = defineEmits(['update:modelValue', 'storyUpdated']);

const dialog = ref(props.modelValue);
const isLoading = ref(false);

const selectedGenre = ref(props.story?.genre?.genreName || '');
const selectedLanguage = ref(props.story?.language?.languageName || '');
const selectedTheme = ref(props.story?.theme?.themeName || '');
const selectedRole = ref(props.story?.role?.roleName || '');
const selectedSettings = ref(props.story?.settings?.name || '');
const selectedSize = ref(props.story?.size?.sizeName || '');

const genres = ref([]);
const languages = ref([]);
const themes = ref([]);
const roles = ref([]);
const sizes = ref([]);
const settings = ref([]);

// Fetch dropdown options from API
const fetchDropdownOptions = async () => {
  try {
    const { data: genreData } = await genreServices.getGenres();
    genres.value = genreData.map(item => item.genreName);

    const { data: languagesData } = await languageServices.getLanguages();
    languages.value = languagesData.map(item => item.languageName);

    const { data: themeData } = await themeServices.getThemes();
    themes.value = themeData.map(item => item.themeName);

    const { data: roleData } = await roleServices.getRoles();
    roles.value = roleData.map(item => item.roleName);

    const { data: settingsData } = await settingsServices.getSettings();
    settings.value = settingsData.map(item => item.name);

    const { data: sizeData } = await sizeServices.getSizes();
    sizes.value = sizeData.map(item => item.sizeName);
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
  }
};

const submitForm = async () => {
  isLoading.value = true;
  const updatedStory = {
    id: props.story.storyId,
    genre: selectedGenre.value,
    language: selectedLanguage.value,
    theme: selectedTheme.value,
    role: selectedRole.value,
    setting: selectedSettings.value,
    size: selectedSize.value
  };

  try {
    const response = await storyServices.updateStory(updatedStory);
    emit('storyUpdated', response.data);  // Emit the updated story data
    closeDialog();
  } catch (error) {
    console.error('Error updating story:', error);
  } finally {
    isLoading.value = false;
  }
};

const closeDialog = () => {
  emit('update:modelValue', false);
};

watch(
  () => props.modelValue,
  (newVal) => {
    dialog.value = newVal;
  }
);

watch(
  () => props.story,
  (newStory) => {
    selectedGenre.value = newStory?.genre?.genreName || '';
    selectedLanguage.value = newStory?.language?.languageName || '';
    selectedTheme.value = newStory?.theme?.themeName || '';
    selectedRole.value = newStory?.role?.roleName || '';
    selectedSettings.value = newStory?.settings?.name || '';
    selectedSize.value = newStory?.size?.sizeName || '';
  },
  { immediate: true }
);

onMounted(() => {
  fetchDropdownOptions();
console.log("story", props.story)
});

</script>

<style scoped>
.page-title {
  font-family: 'Arial', sans-serif; /* Custom font style */
  color: #0e0e0ed1; /* Custom purple color */
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
  color: #0e0e0ed1 !important; /* Custom purple label color */
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-left: 8px;
  margin-right: 8px;
}

.close-icon {
  cursor: pointer;
  font-size: 24px;
}
</style>
