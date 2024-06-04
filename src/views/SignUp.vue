<template>
  <v-container class="signup" fluid>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Sign Up</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-text-field
                v-model="fullName"
                label="Full Name"
                required
                class="custom-text-field"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                class="custom-text-field"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                class="custom-text-field"
              ></v-text-field>
              <v-checkbox
                v-model="hasAdminAccess"
                label="Has Admin Access"
              ></v-checkbox>
              <v-btn type="submit" class="signup-btn" block>Sign Up</v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <p class="text-center">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from '../services/UserServices';

const fullName = ref("");
const email = ref("");
const password = ref("");
const hasAdminAccess = ref(false);
const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const signUp = async () => {
  await UserServices.addUser({
    email: email.value,
    password: password.value,
    hasAdminAccess: hasAdminAccess.value,
    fullName: fullName.value,
  })
    .then((res) => {
      localStorage.setItem("isAdmin", JSON.stringify(hasAdminAccess.value));
      router.push("/login");
    })
    .catch((err) => {
      console.error("Error:", err);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = err?.response?.data?.message || "signup is failed!";
    });
};
function closeSnackBar() {
  snackbar.value.value = false;
}
</script>

<style scoped>
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(
    100vh - 120px
  );
  background-color: #f5f5f5;
}
.signup-btn {
  background-color: #792fd3b0 !important;
  color: white !important;
}
.custom-text-field:focus {
  background-color: #d0b7ee59 !important;
}
</style>
