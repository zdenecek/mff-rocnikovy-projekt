<template>
    <v-text-field :v-bind="$attrs" type="date" v-bind:model-value="dateString" @update:model-value="update"></v-text-field>
</template>

<script setup lang="ts">
import { computed , PropType } from 'vue'

const props = defineProps({
  modelValue: Date as PropType<Date | null>
})
const emit = defineEmits(['update:modelValue'])
const dateString = computed(() => props.modelValue?.toISOString().split("T")[0])
function update(value: string) {
  emit('update:modelValue', new Date(value))
}
</script>