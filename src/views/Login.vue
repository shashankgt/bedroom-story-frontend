<template>
  <v-container class="login" fluid>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
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
              <v-btn type="submit" class="login-btn" block>Login</v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <p class="text-center">
              Don't have an account? <router-link to="/signup">Sign Up</router-link>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UserServices from '../services/UserServices';

const email = ref('');
const password = ref('');
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const router = useRouter();

const login = async () => {
    const user = {
        email: email.value,
        password: password.value
    }
    await UserServices.loginUser(user).then((res)=> {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("isAdmin", JSON.stringify(res.data.hasAdminAccess));
        snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Login successful!";
        router.push('/home');
    }).catch((err)=> {
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = err.response?.data?.message || "Authentication failed";
    })
};

function closeSnackBar() {
  snackbar.value.value = false;
}

onMounted(()=> {
  const userFromLocal = JSON.parse(localStorage.getItem('user'));
  if(userFromLocal) {
    router.push({ name: "Home"});
  } 
})

</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
  background-color: #f5f5f5;
}
.login-btn {
  background-color: #792fd3b0 !important;
  color: white !important;
}
.custom-text-field:focus {
  background-color: #d0b7ee59 !important;
}
</style>
