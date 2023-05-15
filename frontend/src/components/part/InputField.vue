<template>
    <div class="flex flex-col gap-1 place-items-start">
        <label :for="name">{{ label }}</label>
        <input
            :id="name"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <ul v-if="errors?.length">
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "InputField",
    props: {
        label: String,
        type: String,
        placeholder: String,
        modelValue: String,
        errors: Array,
    },
    emits: ["update:modelValue"],
    data: function () {
        return {
            name: "",
        };
    },
    created: function () {
        this.name = this.label?.replace(/\s/, "") ?? "";
    },
});
</script>
