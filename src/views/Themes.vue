<template>
  <v-container>
    <h1 class="page-title">Manage Themes</h1>
    
    <v-card class="theme-section">
      <v-card-title>Existing Themes</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(theme, index) in themes" :key="index">
            <v-list-item-content class="theme-item">
              <v-list-item-title>{{ theme.themeName }}</v-list-item-title>
              <div class="icon-buttons">
                <v-btn icon @click="editTheme(theme)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteTheme(theme.themeId)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="add-theme-section">
      <v-card-title>{{ isEditing ? 'Update Theme' : 'Add New Theme' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="newTheme" label="Theme Name" required></v-text-field>
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
    <v-snackbar v-model="snackbarVisible" :timeout="3000" top>
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbarVisible = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import themeServices from '../services/themeServices';

const themes = ref([]);
const newTheme = ref('');
const isEditing = ref(false);
const editThemeId = ref(null);

const snackbarVisible = ref(false);
const snackbarMessage = ref('');

const fetchThemes = async () => {
  try {
    const { data } = await themeServices.getThemes();
    themes.value = data;
  } catch (error) {
    console.error('Error fetching themes:', error);
  }
};

const submitForm = async () => {
  if (isEditing.value) {
    try {
      await themeServices.updateTheme({ themeId: editThemeId.value, themeName: newTheme.value });
      snackbarMessage.value = 'Theme updated successfully!';
      snackbarVisible.value = true;
      isEditing.value = false;
      newTheme.value = '';
      editThemeId.value = null;
      await fetchThemes();
    } catch (error) {
      console.error('Error updating themes:', error);
    }
  } else {
    try {
      await themeServices.addTheme({ themeName: newTheme.value });
      snackbarMessage.value = 'Theme added successfully!';
      snackbarVisible.value = true;
      newTheme.value = '';
      await fetchThemes();
    } catch (error) {
      console.error('Error adding theme:', error);
    }
  }
};

const editTheme = (theme) => {
  newTheme.value = theme.themeName;
  isEditing.value = true;
  editThemeId.value = theme.themeId;
};

const deleteTheme = async (themeId) => {
  try {
    await themeServices.deleteTheme(themeId);
    snackbarMessage.value = 'Theme deleted successfully!';
    snackbarVisible.value = true;
    await fetchThemes();
  } catch (error) {
    console.error('Error deleting theme:', error);
  }
};

const cancelEdit = () => {
  newTheme.value = '';
  isEditing.value = false;
  editThemeId.value = null;
};

onMounted(() => {
  fetchThemes();
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

.theme-section,
.add-theme-section {
  margin-bottom: 20px;
}

.theme-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-buttons {
  display: flex;
}

.icon-buttons v-btn:first-child {
  margin-right: 10px;
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
