
<script setup lang="ts">
import FocusLayout from '@/layouts/FocusLayout.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
    <focus-layout>
        <register-form />
        <template #header> 
            <h1>Registrace</h1>
        </template>
    </focus-layout>
</template>

