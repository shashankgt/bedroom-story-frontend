<template>
  <v-container>
    <h1 class="page-title">Manage Settings</h1>
    
    <v-card class="setting-section">
      <v-card-title>Existing Settings</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(setting, index) in settings" :key="index">
            <v-list-item-content class="setting-item">
              <v-list-item-title>{{ setting.name }}</v-list-item-title>
              <div class="icon-buttons">
                <v-btn icon @click="editSetting(setting)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteSetting(setting.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="add-setting-section">
      <v-card-title>{{ isEditing ? 'Update Settings' : 'Add New Settings' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="newSetting" label="Settings Name" required></v-text-field>
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
import settingsServices from '../services/settingsServices';

const settings = ref([]);
const newSetting = ref('');
const isEditing = ref(false);
const editSettingId = ref(null);

const snackbarVisible = ref(false);
const snackbarMessage = ref('');

const fetchSettings = async () => {
  try {
    const { data } = await settingsServices.getSettings();
    settings.value = data;
  } catch (error) {
    console.error('Error fetching settings:', error);
  }
};

const submitForm = async () => {
  if (isEditing.value) {
    try {
      await settingsServices.updateSettings({ id: editSettingId.value, name: newSetting.value });
      snackbarMessage.value = 'Settings updated successfully!';
      snackbarVisible.value = true;
      isEditing.value = false;
      newSetting.value = '';
      editSettingId.value = null;
      await fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  } else {
    try {
      await settingsServices.addSettings({ name: newSetting.value });
      snackbarMessage.value = 'Settings added successfully!';
      snackbarVisible.value = true;
      newSetting.value = '';
      await fetchSettings();
    } catch (error) {
      console.error('Error adding settings:', error);
    }
  }
};

const editSetting = (setting) => {
  newSetting.value = setting.name;
  isEditing.value = true;
  editSettingId.value = setting.id;
};

const deleteSetting = async (id) => {
  try {
    await settingsServices.deleteSettings(id);
    snackbarMessage.value = 'Settings deleted successfully!';
    snackbarVisible.value = true;
    await fetchSettings();
  } catch (error) {
    console.error('Error deleting settings:', error);
  }
};

const cancelEdit = () => {
  newSetting.value = '';
  isEditing.value = false;
  editSettingId.value = null;
};

onMounted(() => {
  fetchSettings();
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

.setting-section,
.add-setting-section {
  margin-bottom: 20px;
}

.setting-item {
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
