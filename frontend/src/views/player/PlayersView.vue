<template>
<admin-player-list v-if="auth.admin"></admin-player-list>
<player-list v-else></player-list>
</template>

<script setup lang="ts">

import AdminPlayerList from '@/components/admin/player/AdminPlayerList.vue';
import PlayerList from '@/components/player/PlayerList.vue';
import { useAuthStore } from '@/stores/authStore';
const auth = useAuthStore();
</script>