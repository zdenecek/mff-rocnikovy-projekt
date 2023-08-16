<script setup lang="ts">
import { computed } from "vue";


const props = defineProps({

    label: String,
    type: String,
    placeholder: String,
    modelValue: String,
    errors: Array,
    id: {
        optional: true,
        type: String
    }
});

defineEmits(["update:modelValue"]);

const id = computed(() => props.id ?? props.label?.replace(/\s/, "").toLowerCase() ?? "");
</script>

<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <ul v-if="errors?.length" class="errors">
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        <input
               v-bind="$attrs"
               :id="id"
               :type="type"
               :value="modelValue"
               :placeholder="placeholder"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)" />

    </div>
</template>

<style lang="scss">
input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    width: 100%;
}

.input-field {
    display: flex;
    flex-direction: column;
    gap: 2px;

    justify-content: stretch;
    justify-self: stretch;
}

.errors {
    color: #cc0000;
    font-size: smaller;
}
</style>

