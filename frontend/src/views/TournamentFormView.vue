<script setup lang="ts">
import FocusLayout from '@/layouts/FocusLayout.vue';
import TournamentForm from '@/components/auth/TournamentForm.vue';
</script>

<template>
    <focus-layout>
        <tournament-form/>
        <template #header> 
            <h1>Tvorba turnaje</h1>
        </template>
    </focus-layout>
</template>