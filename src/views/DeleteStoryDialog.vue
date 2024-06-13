<template>
  <v-dialog v-model="isVisible" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete this story?
      </v-card-text>
      <v-card-actions class="action-btn">
        <v-spacer></v-spacer>
        <v-btn text class="cancel-btn" @click="cancel">Cancel</v-btn>
        <v-btn text class="confirm-btn" @click="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'deleteConfirmed']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue;
});

const cancel = () => {
  isVisible.value = false;
  emit('update:modelValue', false);
};

const confirm = () => {
  isVisible.value = false;
  emit('update:modelValue', false);
  emit('deleteConfirmed');
};
</script>

<style scoped>

.cancel-btn {
  background-color: #9370d89f;
  color: black;
}

.confirm-btn {
  background-color: #792fd3;
  color: white;
}

.action-btn {
  margin-bottom: 10px;
  margin-right: 10px;
}

.headline {
  margin-top: 10px;
  margin-left: 5px;
}

</style>