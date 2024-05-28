<script setup>
import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <v-app :style="{ background: '#F4F4F4' }">
    <MenuBar :key="$route.fullPath" />
    <div class="content">
      <h2>BedTime Stories</h2>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<style scoped>
.content {
  padding: 0 20px;
  text-align: center;
}

h2 {
  color: #4A4A4A; /* Dark gray color for elegance */
  font-family: 'Playfair Display', serif; /* Serif font for a more refined look */
  font-size: 2.5rem; /* Larger font size */
  font-weight: 700; /* Bold font weight */
  margin: 20px 0 10px 0; /* Reduced space below the heading */
  text-transform: uppercase; /* Uppercase letters */
  letter-spacing: 1.5px; /* Spacing between letters */
  border-bottom: 2px solid #e0e0e0; /* Subtle border at the bottom */
  display: inline-block; /* Fit border to text width */
  padding-bottom: 10px; /* Space between text and border */
}
</style>
