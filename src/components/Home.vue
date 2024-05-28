<template>
  <v-container class="home" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">Welcome to BedTime Stories</v-card-title>
          <v-card-text>
            <p>
              <!-- Home Page -->
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px); /* Adjusted height to consider the header and footer */
  background-color: #f5f5f5;
}
</style>
