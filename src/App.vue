<script setup>
import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <v-app :style="{ background: '#F4F4F4' }">
    <MenuBar :key="$route.fullPath" />
    <div class="content">
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<style scoped>
.content {
  margin-top: 30px;
  text-align: center;
}

</style>
