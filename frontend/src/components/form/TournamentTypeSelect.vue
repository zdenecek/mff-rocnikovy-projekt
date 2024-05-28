<template>
      <v-select
           v-model="value"
          :items="TournamentTypes"
          label="Typ turnaje"
        ></v-select>
</template>

<script setup lang="ts">
import {  TournamentTypes } from '@/model/Tournament';
import { ref, watch } from 'vue';


const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  modelValue: string | null;
}>();

const value = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
  value.value = newValue;
});
watch(() => value.value, (newValue) => {
  emit('update:modelValue', newValue);
});




</script>