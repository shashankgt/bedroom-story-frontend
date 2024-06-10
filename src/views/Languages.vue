<template>
  <v-container>
    <h1 class="page-title">Manage Languages</h1>
    
    <!-- Section for existing languages -->
    <v-card class="language-section">
      <v-card-title>Existing Languages</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(language, index) in languages" :key="index">
            <v-list-item-content class="language-item">
              <v-list-item-title>{{ language.languageName }}</v-list-item-title>
              <div class="icon-buttons">
                <v-btn icon @click="editLanguage(language)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteLanguage(language.languageId)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Section for adding or updating a language -->
    <v-card class="add-language-section">
      <v-card-title>{{ isEditing ? 'Update Language' : 'Add New Language' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="newLanguage" label="Language Name" required></v-text-field>
          <v-btn type="submit" color="primary">{{ isEditing ? 'Update' : 'Add' }}</v-btn>
          <v-btn v-if="isEditing" type="button" @click="cancelEdit">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <div class="back-container">
      <router-link to="/home">
        <v-btn class="back-btn">Back</v-btn>
      </router-link>
    </div>
    <!-- Snackbar for success messages -->
    <v-snackbar v-model="snackbarVisible" :timeout="3000" top>
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbarVisible = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import languageServices from '../services/languageServices';

const languages = ref([]);
const newLanguage = ref('');
const isEditing = ref(false);
const editLanguageId = ref(null);

// Snackbar state
const snackbarVisible = ref(false);
const snackbarMessage = ref('');

// Fetch languages from the backend
const fetchLanguages = async () => {
  try {
    const { data } = await languageServices.getLanguages();
    languages.value = data;
  } catch (error) {
    console.error('Error fetching languages:', error);
  }
};

// Submit form for adding or updating a language
const submitForm = async () => {
  if (isEditing.value) {
    // Update existing language
    try {
      await languageServices.updateLanguage({ languageId: editLanguageId.value, languageName: newLanguage.value });
      snackbarMessage.value = 'Language updated successfully!';
      snackbarVisible.value = true;
      isEditing.value = false;
      newLanguage.value = '';
      editLanguageId.value = null;
      await fetchLanguages();
    } catch (error) {
      console.error('Error updating language:', error);
    }
  } else {
    // Add new language
    try {
      await languageServices.addLanguage({ languageName: newLanguage.value });
      snackbarMessage.value = 'Language added successfully!';
      snackbarVisible.value = true;
      newLanguage.value = '';
      await fetchLanguages();
    } catch (error) {
      console.error('Error adding language:', error);
    }
  }
};

// Edit a language
const editLanguage = (language) => {
  newLanguage.value = language.languageName;
  isEditing.value = true;
  editLanguageId.value = language.languageId;
};

// Delete a language
const deleteLanguage = async (languageId) => {
  try {
    await languageServices.deleteLanguage(languageId);
    snackbarMessage.value = 'Language deleted successfully!';
    snackbarVisible.value = true;
    await fetchLanguages();
  } catch (error) {
    console.error('Error deleting language:', error);
  }
};

// Cancel editing
const cancelEdit = () => {
  newLanguage.value = '';
  isEditing.value = false;
  editLanguageId.value = null;
};

// Fetch languages when the component is mounted
onMounted(() => {
  fetchLanguages();
});
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

.language-section,
.add-language-section {
  margin-bottom: 20px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-buttons {
  display: flex;
}

.icon-buttons v-btn:first-child {
  margin-right: 10px; /* Add margin-right to the first button */
}

.v-btn {
  margin: 10px 0;
  margin-right: 10px;
  background-color: #9370d89f;
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
</style>
