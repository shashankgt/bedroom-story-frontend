<template>
  <v-container>
    <div class="read-story">
      <h1 class="page-title">Read Story</h1>
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else class="story-box">
        <div class="icons">
          <v-icon @click="openEditDialog" class="editIcon">mdi-pencil</v-icon>
          <v-icon @click="openDeleteDialog" class="deleteIcon">mdi-delete</v-icon>
        </div>
        <div class="story-content-container">
          <p class="story-content">{{ story?.story || '' }}</p>
        </div>
      </div>
    </div>
    <div class="back-container">
      <router-link to="/home">
        <v-btn class="back-btn">Back</v-btn>
      </router-link>
    </div>
    <EditStoryDialog 
      v-model="showEditDialog"
      :story="story || {}"
      @storyUpdated="handleStoryUpdated"
    />
    <DeleteStoryDialog 
      v-model="showDeleteDialog"
      @deleteConfirmed="handleDeleteConfirmed"
    />
    <v-dialog v-model="showSuccessDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Success</v-card-title>
        <v-card-text>
          Story deleted successfully!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ok-btn" text @click="redirectToCreateStories">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import storyServices from "../services/storyServices";
import EditStoryDialog from './EditStoryDialog.vue';
import DeleteStoryDialog from './DeleteStoryDialog.vue';

const isLoading = ref(true);
const story = ref(null);
const route = useRoute();
const router = useRouter();
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const showSuccessDialog = ref(false);

// Fetch story data from the API based on the route params
onMounted(async () => {
  await fetchStory();
});

const fetchStory = async() => {
  const id = parseInt(route.params.id);
  try {
    const response = await storyServices.getStoryById(id);
    story.value = response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
  } finally {
    isLoading.value = false;
  }
}

const openEditDialog = () => {
  showEditDialog.value = true;
};

const handleStoryUpdated = async(updatedStory) => {
  // Update the story data with the updated values
  story.value = updatedStory;
  showEditDialog.value = false; // Close the dialog after updating
  await fetchStory();
};

const openDeleteDialog = () => {
  showDeleteDialog.value = true;
};

const handleDeleteConfirmed = async () => {
  try {
    await storyServices.deleteStory(story.value.storyId);
    showSuccessDialog.value = true;
  } catch (error) {
    console.error('Error deleting story:', error);
  }
};

const redirectToCreateStories = () => {
  showSuccessDialog.value = false;
  router.push({ name: 'story-collection' });
};
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
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1300px;
}

.icons {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 15px;
}

.editIcon {
  cursor: pointer;
  font-size: 24px;
  color: #4c1590;
  margin-top: 15px;
}

.deleteIcon {
  cursor: pointer;
  font-size: 24px;
  color: #4c1590;
  margin-right: 30px;
  margin-top: 15px;
}

.story-content-container {
  padding-top: 50px; /* Adjust as needed */
}

.story-content {
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 0 20px;
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
  text-align: justify;
  margin-top: 15px;
}

.headline {
  margin-top: 10px;
  margin-left: 5px;
}

.ok-btn {
  background-color: #792fd3;
  color: white;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
