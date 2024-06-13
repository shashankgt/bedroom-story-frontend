<template>
  <div class="create-stories">
    <v-container>
      <!-- Page title -->
      <h1 class="page-title">Generate Stories</h1>

      <!-- Form for creating stories -->
      <v-form @submit.prevent="submitForm">
        <!-- Combobox for Genre -->
        <v-combobox
          v-model="selectedGenre"
          class="outlined-purple"
          :items="genres"
          label="Genre"
          variant="outlined"
          allow-overflow
        ></v-combobox>

        <!-- Combobox for Language -->
        <v-combobox
          variant="outlined"
          class="outlined-purple"
          v-model="selectedLanguage"
          :items="languages"
          label="Language"
        ></v-combobox>

        <!-- Combobox for Theme -->
        <v-combobox
          variant="outlined"
          class="outlined-purple"
          v-model="selectedTheme"
          :items="themes"
          label="Theme"
          allow-overflow
        ></v-combobox>

        <!-- Combobox for Role -->
        <v-combobox
          variant="outlined"
          class="outlined-purple"
          v-model="selectedRole"
          :items="roles"
          label="Role"
          allow-overflow
        ></v-combobox>

        <v-combobox
          variant="outlined"
          class="outlined-purple"
          v-model="selectedSettings"
          :items="settings"
          label="Settings"
          allow-overflow
        ></v-combobox>

        <!-- Combobox for Size -->
        <v-select
          v-model="selectedSize"
          class="outlined-purple"
          :items="sizes"
          label="Size"
          variant="outlined"
        ></v-select>
        <div>
          <!-- Buttons container with flex display -->
          <div class="button-container">
            <!-- Back button -->
            <router-link to="/home">
              <v-btn class="back-btn">Back</v-btn>
            </router-link>

            <!-- Submit button -->
            <v-btn
              type="submit"
              color="primary"
              class="submit-btn"
              :disabled="isLoading"
            >
              <template v-if="isLoading">
                <v-progress-circular
                  indeterminate
                  color="white"
                ></v-progress-circular>
              </template>
              <template v-else> Submit </template>
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import genreServices from "../services/genreServices.js";
import languageServices from "../services/languageServices.js";
import themeServices from "../services/themeServices.js";
import roleServices from "../services/roleServices";
import sizeServices from "../services/sizeServices";
import settingsServices from "../services/settingsServices";
import storyServices from "../services/storyServices";

// Refs for selected options and custom inputs
const selectedGenre = ref("");
const selectedLanguage = ref("");
const selectedTheme = ref("");
const selectedRole = ref("");
const selectedSettings = ref("");
const selectedSize = ref("");
const isLoading = ref(false); //isLoading ref
// Add more refs for other fields

// Router instance
const router = useRouter();

// Arrays to store dropdown options
const genres = ref([]);
const languages = ref([]);
const themes = ref([]);
const roles = ref([]);
const sizes = ref([]);
const settings = ref([]);
const user = ref(null);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});

// Fetch dropdown options from API
const fetchDropdownOptions = async () => {
  try {
    // Fetch options for Genre
    const { data: genreData } = await genreServices.getGenres();
    genres.value = genreData.map((item) => item.genreName);

    // Fetch options for Language
    const { data: languagesData } = await languageServices.getLanguages();
    languages.value = languagesData.map((item) => item.languageName);

    // Fetch options for Theme
    const { data: themeData } = await themeServices.getThemes();
    themes.value = themeData.map((item) => item.themeName);

    // Fetch options for Role
    const { data: roleData } = await roleServices.getRoles();
    roles.value = roleData.map((item) => item.roleName);

    const { data: settingsData } = await settingsServices.getSettings();
    settings.value = settingsData.map((item) => item.name);

    // Fetch options for Size
    const { data: sizeData } = await sizeServices.getSizes();
    sizes.value = sizeData.map((item) => item.sizeName);
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
  }
};

// Submit form with user's selections and inputs
const submitForm = async () => {
  isLoading.value = true; // Set isLoading to true when submitting the form
  const story = {
    genre: selectedGenre.value,
    language: selectedLanguage.value,
    theme: selectedTheme.value,
    role: selectedRole.value,
    settings: selectedSettings.value,
    size: selectedSize.value,
    memberId: user.value.id,
  };

  try {
    // Call the API to create the story
    const response = await storyServices.addStory(story);

    // Redirect to the appropriate page after successful submission
    router.push({ name: "read-story", params: { id: response.data.storyId } });
  } catch (error) {
    console.error("Error generating story:", error);
    // Handle error (e.g., display an error message)
  } finally {
    isLoading.value = false; // Set isLoading to false when API call is complete
  }
};

// Fetch dropdown options when component is mounted
onMounted(async () => {
  await fetchDropdownOptions();
});
</script>

<style scoped>
/* Add your component styles here */
/* .outlined-purple .v-input__control {
  border: 1px solid #eeea72; /* Custom purple border color */
/* } */
.page-title {
  font-family: "Arial", sans-serif; /* Custom font style */
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
  text-transform: none;
  font-family: "Arial", sans-serif;
}

.submit-btn:hover {
  background-color: #792fd3;
  color: white;
}

.outlined-purple {
  color: #0e0e0ed1 !important; /* Custom purple label color */
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

.button-container {
  display: flex; /* Use flexbox layout */
  justify-content: space-between; /* Distribute space between buttons */
}
</style>
