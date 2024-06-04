<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref(null);
const title = ref("Bedtime Stories");

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});


function closeSnackBar() {
  snackbar.value.value = false;
}

function logout() {
  UserServices.logoutUser()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  localStorage.removeItem("user");
  user.value = null;
  router.push({ name: "Login" });
}
</script>

<template>
  <div>
    <v-app-bar color='primary' app dark>
      <v-toolbar-title class="title" :style="{color:'white',cursor:'pointer'}" >
        <a href="/">{{ title }}</a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="user === null" class="mx-2" :to="{ name: 'Login' }">
        Login
      </v-btn>
      <v-menu v-if="user !== null" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar class="mx-auto text-center" color="accent" size="large">
              <span class="white--text font-weight-bold">{{
                `${user.fullName.charAt(0)}${user.fullName.charAt(1)}`
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="accent">
                <span class="white--text text-h5">{{
                  `${user.fullName.charAt(0)}${user.fullName.charAt(1)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.fullName}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout()"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>

<style scoped>
 a {
  color: white;
  text-decoration: none;
 }
 a:hover {
  color: white;
 }
</style>
