<template>
    <admin-tournament-list v-if="auth.admin"></admin-tournament-list>
    <tournament-list v-else></tournament-list>
</template>

<script setup lang="ts">

import AdminTournamentList from '@/components/admin/tournament/AdminTournamentList.vue';
import TournamentList from '@/components/tournament/TournamentList.vue';
import { useAuthStore } from '@/stores/authStore';
const auth = useAuthStore();
</script>