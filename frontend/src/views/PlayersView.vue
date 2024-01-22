<template>
    <v-row>
        <v-col>
            <h2>Hráči</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="players" item-key="id" :loading="loading">
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore';
import { computed } from 'vue';

const headers = [
    { title: 'Jméno', value: 'fullName', sortable: true, width: '20%' },
    { title: 'Číslo hráče', value: 'federationId', sortable: true, width: '15%' },
    { title: 'Kategorie', value: 'category', sortable: true }
]

const playerStore = usePlayerStore();

const players = computed(() => playerStore.players);
const loading = computed(() => playerStore.loading);

</script>
