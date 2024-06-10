<template>
  <v-container>
    <h1 class="page-title">Manage Genres</h1>
    
    <v-card class="genre-section">
      <v-card-title>Existing Genres</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(genre, index) in genres" :key="index">
            <v-list-item-content class="genre-item">
              <v-list-item-title>{{ genre.genreName }}</v-list-item-title>
              <div class="icon-buttons">
                <v-btn icon @click="editGenre(genre)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteGenre(genre.genreId)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="add-genre-section">
      <v-card-title>{{ isEditing ? 'Update Genre' : 'Add New Genre' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="newGenre" label="Genre Name" required></v-text-field>
          <v-btn type="submit" color="primary">{{ isEditing ? 'Update' : 'Add' }}</v-btn>
          <v-btn v-if="isEditing" type="button" @click="cancelEdit">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbarVisible" :timeout="3000" top>
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbarVisible = false">Close</v-btn>
    </v-snackbar>
    <div class="back-container">
      <router-link to="/home">
        <v-btn class="back-btn">Back</v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import genreServices from '../services/genreServices';

const genres = ref([]);
const newGenre = ref('');
const isEditing = ref(false);
const editGenreId = ref(null);

const snackbarVisible = ref(false);
const snackbarMessage = ref('');

const fetchGenres = async () => {
  try {
    const { data } = await genreServices.getGenres();
    genres.value = data;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};

const submitForm = async () => {
  if (isEditing.value) {
    try {
      await genreServices.updateGenre({ genreId: editGenreId.value, genreName: newGenre.value });
      snackbarMessage.value = 'Genre updated successfully!';
      snackbarVisible.value = true;
      isEditing.value = false;
      newGenre.value = '';
      editGenreId.value = null;
      await fetchGenres();
    } catch (error) {
      console.error('Error updating genres:', error);
    }
  } else {
    try {
      await genreServices.addGenre({ genreName: newGenre.value });
      snackbarMessage.value = 'Genre added successfully!';
      snackbarVisible.value = true;
      newGenre.value = '';
      await fetchGenres();
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  }
};

const editGenre = (genre) => {
  newGenre.value = genre.genreName;
  isEditing.value = true;
  editGenreId.value = genre.genreId;
};

const deleteGenre = async (genreId) => {
  try {
    await genreServices.deleteGenre(genreId);
    snackbarMessage.value = 'Genre deleted successfully!';
    snackbarVisible.value = true;
    await fetchGenres();
  } catch (error) {
    console.error('Error deleting genre:', error);
  }
};

const cancelEdit = () => {
  newGenre.value = '';
  isEditing.value = false;
  editGenreId.value = null;
};

onMounted(() => {
  fetchGenres();
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

.genre-section,
.add-genre-section {
  margin-bottom: 20px;
}

.genre-item {
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
