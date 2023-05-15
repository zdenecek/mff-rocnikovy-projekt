
<script setup lang="ts">
import FocusLayout from '@/layouts/FocusLayout.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
    <focus-layout>
        <login-form />
        <template #header> 
            <h1>Přihlášení</h1>
        </template>
    </focus-layout>
</template>

