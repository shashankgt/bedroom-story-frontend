<template>
  <v-container>
    <h1 class="page-title">Manage Roles</h1>
    
    <v-card class="role-section">
      <v-card-title>Existing Roles</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(role, index) in roles" :key="index">
            <v-list-item-content class="role-item">
              <v-list-item-title>{{ role.roleName }}</v-list-item-title>
              <div class="icon-buttons">
                <v-btn icon @click="editRole(role)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteRole(role.roleId)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="add-role-section">
      <v-card-title>{{ isEditing ? 'Update Role' : 'Add New Role' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="newRole" label="Role Name" required></v-text-field>
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
import roleServices from '../services/roleServices';

const roles = ref([]);
const newRole = ref('');
const isEditing = ref(false);
const editRoleId = ref(null);

const snackbarVisible = ref(false);
const snackbarMessage = ref('');

const fetchRoles = async () => {
  try {
    const { data } = await roleServices.getRoles();
    roles.value = data;
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

const submitForm = async () => {
  if (isEditing.value) {
    try {
      await roleServices.updateRole({ roleId: editRoleId.value, roleName: newRole.value });
      snackbarMessage.value = 'Role updated successfully!';
      snackbarVisible.value = true;
      isEditing.value = false;
      newRole.value = '';
      editRoleId.value = null;
      await fetchRoles();
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  } else {
    try {
      await roleServices.addRole({ roleName: newRole.value });
      snackbarMessage.value = 'Role added successfully!';
      snackbarVisible.value = true;
      newRole.value = '';
      await fetchRoles();
    } catch (error) {
      console.error('Error adding role:', error);
    }
  }
};

const editRole = (role) => {
  newRole.value = role.roleName;
  isEditing.value = true;
  editRoleId.value = role.roleId;
};

const deleteRole = async (roleId) => {
  try {
    await roleServices.deleteRole(roleId);
    snackbarMessage.value = 'Role deleted successfully!';
    snackbarVisible.value = true;
    await fetchRoles();
  } catch (error) {
    console.error('Error deleting role:', error);
  }
};

const cancelEdit = () => {
  newRole.value = '';
  isEditing.value = false;
  editRoleId.value = null;
};

onMounted(() => {
  fetchRoles();
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

.role-section,
.add-role-section {
  margin-bottom: 20px;
}

.role-item {
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
